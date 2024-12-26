import { useLocation } from "react-router-dom";

import { HeaderOffset } from "../../components/Header/styles";
import {
  BackGround,
  StyledParagraph,
  YourType,
  TagContinaer,
  StyledLink,
  Container,
  ResultImgWrapper,
} from "./styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface Props {
  type: ConsumptionType;
}

type ConsumptionType = {
  title: string;
  description: string;
  type: string;
  mbti: string;
  emoji: string;
};

export default function TestResultPage() {
  const location = useLocation();
  const type = location.state?.type as ConsumptionType;

  if (!type) {
    return <LoadingSpinner />;
  }

  return (
    <BackGround>
      <HeaderOffset style={{ flex: "none" }}></HeaderOffset>
      <div style={{ flex: 1 }}>
        <TestResult type={type} />
      </div>
    </BackGround>
  );
}

function TestResult(props: Props) {
  const { type } = props;

  return (
    <Container>
      <YourType>
        <h3>당신의 소비 유형은</h3>
        <h1>{type.title}</h1>
      </YourType>
      <ResultImgWrapper>
        <img src={type.emoji} alt={`${type.title} 이미지`} />
      </ResultImgWrapper>
      <TagContinaer>
        <span>#{type.type}</span>
        <span>{type.mbti}</span>
      </TagContinaer>
      <StyledParagraph>{type.description}</StyledParagraph>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "40px",
        }}
      >
        <StyledLink to="/recommend">
          <span>내 맞춤 금융상품 보러가기</span>
        </StyledLink>
      </div>
    </Container>
  );
}
