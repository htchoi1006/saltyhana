import styled from "styled-components";
interface AccountProps {
  accountNumber: string;
  accountName: string;
  balance: number;
}

// 개인 자산 페이지 헤더
export const Header = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 20px;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  color: #343434;
`;

// 개인 자산 페이지 설명
export const HeaderDescription = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 20px;
`;

// 페이지 본문
export const PageContainer = styled.div`
  padding: 42px 42px 40px;
  display: flex;
  flex-direction: column;
`;

// 계좌 정보 스타일
const AccountDiv = styled.div`
  background-color: #2a9d8f;
  padding: 30px;
  color: white;
  border-radius: 35px;
  margin-right: 20px;
  margin-bottom: 30px;
  justify-content: center;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.25);
  font-size: 15px;
  font-weight: 700;
  height: 150px;
  display: flex;
  flex-direction: column;
`;

// 계좌명
const AccountName = styled.h2`
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

// 계좌 번호
const AccountNumber = styled.p`
  font-size: 20px;
  margin: 0px;
`;

// 계좌 잔액
const AccountBalance = styled.p`
  font-size: 30px;
  margin-top: 30px;
`;

// 계좌 정보 컨테이너
export const Account = (props: AccountProps) => {
  const { accountNumber, accountName, balance } = props;

  return (
    <AccountDiv>
      <AccountName>{accountName}</AccountName>
      <AccountNumber>{accountNumber}</AccountNumber>
      <AccountBalance>{balance.toLocaleString()}원</AccountBalance>
    </AccountDiv>
  );
};

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border-radius: 35px;
  height: 380px;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.1);
`;
