import styled from "styled-components";

interface AccountProps {
  accountNumber: string;
  balance: number;
}

export const PageContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  margin: 42px 42px 40px;
  flex-direction: column;
`;

const AccountDiv = styled.div`
  background-color: #2a9d8f;
  padding: 30px;
  color: white;
  border-radius: 10px;
  margin-bottom: 30px;
  justify-content: space-around;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.25);
  font-family:
    Noto Sans KR,
    sans-serif;
  font-size: 15px;
  font-weight: 700;
  height: 150px;
`;

const AccountName = styled.h2`
  font-size: 20px;
  margin-top: 0px;
  margin-bottom: 10px;
`;

const AccountNumber = styled.p`
  margin: 0px;
`;

const AccountBalance = styled.p`
  font-size: 30px;
  margin-top: 30px;
`;

export const Account: React.FC<AccountProps> = ({ accountNumber, balance }) => {
  return (
    <AccountDiv>
      <AccountName>HANARO Account</AccountName>
      <AccountNumber>{accountNumber}</AccountNumber>
      <AccountBalance>{balance.toLocaleString()}원</AccountBalance>
    </AccountDiv>
  );
};

export const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1000px;
`;

const ChartBox = styled.div`
  width: 40%;
`;

export const LineChartContainer = styled(ChartBox)`
  padding: 20px;
  border-radius: 10px;
  height: 400px;
  width: 70%;
  margin-right: auto;
`;

export const Title = styled.h3`
  margin-top: 0px;
  margin-bottom: 30px;
`;

export const CumulativeSum = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #264653;
`;
