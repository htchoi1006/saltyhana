import styled, { keyframes } from "styled-components";

export const StyledSpan = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: #5a5a5a;
`;

export const roadingImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20%;
`;

export const CenterFlexContainer = styled.div`
  width: 100%;
  height: 100vh;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const firstAnimation = keyframes`
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
`;

const secondAnimation = keyframes`
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
`;

const thirdAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
`;
