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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  margin-top: 64px;
`;

export const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.p`
  font-weight: 700;
  font-size: 3vw;
  line-height: 0px;
  color: #000;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.3s;
`;

export const HeaderDescription = styled.p`
  font-weight: 500;
  font-size: 1.7vw;
  line-height: 0px;
  color: #000;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.6s;
`;

export const ElementWrapper = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

export const ElementDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
`;

export const Element = styled.div<{ delay: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay}s; // Use delay prop
`;

export const ElementImage = styled.img`
  width: 50%;
  height: auto;
`;

export const ElementDescription = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.4vw;
  line-height: 0px;
  color: #000;
  margin-top: 40px;
`;

export const ButtonWrapper = styled.button<{ delay?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  padding: 12px;
  margin-top: 30px;
  background: #008485;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  color: #fff;

  font-weight: 600;
  font-size: 1.7vw;
  cursor: pointer;
  transition: background-color 0.5s;

  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay}s; // 버튼의 delay 설정

  &:hover {
    background-color: #00adad;
    p {
      color: #008485;
    }
  }
`;
