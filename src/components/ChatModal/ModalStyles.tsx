import styled from "styled-components";

// 모달 배경 오버레이
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// 모달 내용 컨테이너
export const ModalContent = styled.div`
  background: #ffffff;
  width: 500px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

// 모달 헤더
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const ChatIcon = styled.img`
  width: 50px;
  height: 47px;
  margin-right: auto; /* 화면 오른쪽으로 붙임 */
`;

// 닫기 버튼
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

// 채팅 메시지 영역
export const ChatArea = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 메시지 스타일
export const Message = styled.p<{ isUser: boolean }>`
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  background-color: ${({ isUser }) => (isUser ? "#d0f4f3 " : "#f1f1f1")};
  color: #333;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

// 채팅 입력 영역
export const ChatInput = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #1194a7;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      background-color: #1194a7;
    }
  }
`;
