import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  > div {
    flex: 1;
  }
`;

export const Paper = styled.div`
  min-width: 320px;
  max-width: 400px;
  width: 100%;
  margin: 0 25px;
  background: #f6f6f6;
  border-radius: 50px;
  padding: 50px 70px;
  font-size: 16px;
  > h2 {
    opacity: 0;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.3s;
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    color: #424242;
    line-height: 110%;
    text-shadow: 2px 4px 8px rgba(252, 226, 206, 0.2);
    margin: 0;
  }
  > h1 {
    opacity: 0;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.5s;
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
    color: #008485;
    line-height: 110%;
    text-shadow: 2px 4px 8px rgba(252, 226, 206, 0.2);
    margin: 0 0 40px 0;
  }
`;

export const ImgWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  img {
    opacity: 0;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 1.3s;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputsWrapper = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.7s;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledButton = styled.button`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.9s;
  display: block;
  text-align: center;
  background: #008485;
  border-radius: 128px;
  letter-spacing: 0.2px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  border: 0;
  width: 100%;
  height: 55px;
  color: #ffffff;
  cursor: pointer;
  padding: 12px 0;
  /* margin: 25px 0; */

  &:hover {
    background: #029595;
  }
`;

export const FooterParagraph = styled.p`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 1.3s;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.2px;
  color: rgba(85, 57, 34, 0.7);
  text-align: center;
  > a {
    text-decoration: none;
    color: #008485;
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AgreementCheckWrapper = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.9s;
  margin: 2px 0px;
  > label {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.2px;
    > span {
      text-decoration-line: underline;
      cursor: pointer;
    }
  }
`;
