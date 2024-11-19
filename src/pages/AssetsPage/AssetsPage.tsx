import { useEffect, useState } from "react";
import { subDays, format } from "date-fns";
import AccountList from "../../components/AccountList/AccountList";
import AssetsChart from "../../components/AssetsChart/AssetsChart";
import AssetsInfo from "../../components/AssetsInfo/AssetsInfo";
import {
  Account,
  ChartsContainer,
  PageContainer,
  Header,
  HeaderDescription,
} from "./styles";

export default function AssetsPage() {
  const accounts = [
    {
      accountNumber: "352-000-0000-01",
      accountName: "주거래 하나 통장*",
      balance: 2005333,
    },
    {
      accountNumber: "352-000-0000-02",
      accountName: "369 정기예금",
      balance: 1523000,
    },
    {
      accountNumber: "352-000-0000-03",
      accountName: "부자씨 적금",
      balance: 780000,
    },
  ];

  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [lineData, setLineData] = useState<any>(null);
  const [cumulativeSum, setCumulativeSum] = useState<number>(0);
  const [zoomedRange, setZoomedRange] = useState<string>("");

  const generateLineData = () => {
    let labels = [];
    let endDate = new Date();
    let startDate = subDays(endDate, 30);
    const diffDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    );
    labels = Array.from({ length: diffDays }, (_, i) =>
      subDays(endDate, diffDays - i - 1),
    );
    const data = labels.map(() => Math.floor(Math.random() * 100000));
    const sum = data.reduce((a, b) => a + b, 0);
    setCumulativeSum(sum - (sum % 100));

    const minDate = format(new Date(labels[0]), "M월 dd일");
    const maxDate = format(new Date(labels[labels.length - 1]), "M월 dd일");
    setZoomedRange(`${minDate}부터 ${maxDate}까지`);

    return {
      labels,
      datasets: [
        {
          label: `${minDate}부터 ${maxDate}까지의 지출 내역`,
          data: data,
          fill: true,
          borderColor: "#2A9D8F",
          backgroundColor: "rgba(42, 157, 143, 0.3)",
          tension: 0.5, // 곡선 정도
        },
      ],
    };
  };

  useEffect(() => {
    const newData = generateLineData();
    setLineData(newData);
  }, []);

  return (
    <PageContainer>
      {/* 개인 자산 페이지 헤더 */}
      <Header>최혁태 님의 자산 현황</Header>
      <HeaderDescription>
        최혁태 님이 가지고 계신 계좌 잔액과 기간 별 지출 현황을 확인하실 수
        있어요.
      </HeaderDescription>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", flex: 1, width: "100%" }}>
          <div style={{ flex: 1.5, paddingRight: "10px" }}>
            {/* 계좌 박스 */}
            <Account
              accountNumber={selectedAccount.accountNumber}
              accountName={selectedAccount.accountName}
              balance={selectedAccount.balance}
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
