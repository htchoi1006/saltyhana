import { useEffect, useState } from "react";
import { format } from "date-fns";
import AccountList from "../../components/AccountList/AccountList";
import AssetsChart from "../../components/AssetsChart/AssetsChart";
import AssetsInfo from "../../components/AssetsInfo/AssetsInfo";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  Account,
  ChartsContainer,
  PageContainer,
  Header,
  HeaderDescription,
} from "./styles";

interface TransferList {
  date: string; // 날짜 (YYYY-MM-DD 형식)
  balance: number; // 잔액
  totalDeposit: number; // 총 입금액
  totalWithdrawal: number; // 총 출금액
}
interface AccountTransfer {
  accountNumber: string; // 계좌 번호
  accountAlias: string; // 계좌 별칭
  accountBalance: number; // 계좌 잔액
  transferList: TransferList[]; // 거래 내역 리스트
}
interface Account {
  accountNumber: string; // 계좌 번호
  accountAlias: string; // 계좌 별칭
  accountBalance: number; // 계좌 잔액
}

export default function AssetsPage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accountTransfer, setAccountTransfer] =
    useState<AccountTransfer | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [lineData, setLineData] = useState<any>(null);
  const [cumulativeSum, setCumulativeSum] = useState<number>(0);
  const [zoomedRange, setZoomedRange] = useState<string>("");

  const userName = localStorage.getItem("name");

  const fetchAssetDataApi = async () => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/accounts/transfers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message ||
          "고객님의 자산 데이터를 불러오는데 문제가 발생하였습니다.";
        throw new Error(errorMessage);
      }

      const assetData = await response.json();

      setSelectedAccount(assetData[0]);
      setAccountTransfer(assetData);
      setAccounts(assetData);

      return Array.isArray(assetData) ? assetData : [];
    } catch (error) {
      console.error("Error getting asset data: ", error);
      alert("고객님의 자산 데이터를 불러오는 데 실패했습니다.");
      return [];
    }
  };

  const generateLineData = (accountTransfer: AccountTransfer) => {
    if (!accountTransfer || !accountTransfer.transferList) return null;

    // 날짜와 데이터를 그래프 형식으로 변환
    const labels = accountTransfer.transferList.map(
      (transfer) => transfer.date,
    );
    const withdrawals = accountTransfer.transferList.map(
      (transfer) => transfer.totalWithdrawal || 0,
    );
    const data = accountTransfer.transferList.map((transfer) => ({
      deposit: transfer.totalDeposit || 0,
      withdrawal: transfer.totalWithdrawal || 0,
      balance: transfer.balance || 0,
    }));

    if (!labels.length || !data.length) {
      console.error("Labels or data array is empty.");
      return null;
    }

    const sum = withdrawals.reduce((a, b) => a + b, 0);
    setCumulativeSum(sum - (sum % 100));

    const minDate = format(new Date(labels[0]), "M월 dd일");
    const maxDate = format(new Date(labels[labels.length - 1]), "M월 dd일");
    setZoomedRange(`${minDate}부터 ${maxDate}까지`);

    return {
      labels,
      datasets: [
        {
          label: `계좌 거래 내역`,
          data: data,
          fill: true,
          borderColor: "#2A9D8F",
          backgroundColor: "rgba(42, 157, 143, 0.3)",
          tension: 0.5,
        },
      ],
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const transferList = await fetchAssetDataApi();

      if (transferList.length > 0) {
        const newData = generateLineData(transferList[0]);
        setLineData(newData);
      }
    };

    fetchData();
  }, []);

  // selectedAccount가 변경될 때 그래프 데이터 업데이트
  useEffect(() => {
    if (selectedAccount && accountTransfer && Array.isArray(accountTransfer)) {
      const transfer = accountTransfer.find(
        (account: AccountTransfer) =>
          account.accountNumber === selectedAccount.accountNumber,
      );
      if (transfer) {
        const newData = generateLineData(transfer);
        setLineData(newData);
      }
    }
  }, [selectedAccount, accountTransfer]);

  if (!accounts.length || !selectedAccount) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer>
      {/* 개인 자산 페이지 헤더 */}
      <Header>{userName}님의 자산 현황</Header>
      <HeaderDescription>
        {userName}님이 가지고 계신 계좌 잔액과 기간 별 지출 현황을 확인하실 수
        있어요.
      </HeaderDescription>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", flex: 1, width: "100%" }}>
          <div style={{ flex: 1.5, paddingRight: "10px" }}>
            {/* 계좌 박스 */}
            <Account
              accountNumber={selectedAccount.accountNumber}
              accountName={selectedAccount.accountAlias}
              balance={selectedAccount.accountBalance}
            />
          </div>
          <div style={{ flex: 0.5, paddingLeft: "10px" }}>
            {/* 계좌 리스트 박스 */}
            <AccountList
              accounts={accounts}
              selectedAccount={selectedAccount}
              onSelectAccount={setSelectedAccount}
            />
          </div>
        </div>

        {/* 선택된 계좌 지출 그래프 컨테이너 */}
        <ChartsContainer>
          <AssetsInfo zoomedRange={zoomedRange} cumulativeSum={cumulativeSum} />
          <AssetsChart
            lineData={lineData}
            onZoomChange={setZoomedRange}
            setCumulativeSum={setCumulativeSum}
          />
        </ChartsContainer>
      </div>
    </PageContainer>
  );
}
