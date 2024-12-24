import styled from "styled-components";

export const ChoiceContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: center;
`;

export const ChoiceCard = styled.div`
  width: 50%;
  background: #efefef;
  border-radius: 30px;
  box-shadow: 3px 4px 10px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 20px;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Icon = styled.img`
  width: 50%;
  height: auto;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #404040;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5%;
  right: 7%;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 28px;
`;
