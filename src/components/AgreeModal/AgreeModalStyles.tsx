import styled from "styled-components";

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  overflow-y: scroll;
  margin-top: 30px;

  /*스크롤바 css*/
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f5f5f5; /* 스크롤바 트랙 배경색 */
    border-radius: 4px; /* 둥근 모서리 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0; /* 스크롤바 색상 */
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0; /* hover 시 색상 */
  }
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  margin-left: 5px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const DetailContent = styled.div`
  border-radius: 20px;
  border: 1px solid #808080;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-right: 10px;
  padding-left: 20px;
  font-size: 14px;
  color: #555;
`;

export const ModalButton = styled.button`
  background-color: #008485;
  color: white;
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: #007a7a;
  }
`;

export const WarningMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
`;

export const RoundCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;

  input[type="checkbox"] {
    appearance: none; // 기본 체크박스 숨기기
    border: 1.5px solid gainsboro;
    border-radius: 0.35rem; // 둥근 모양 설정
    width: 24px;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;

    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: #008485;
    }
  }

  label {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 20px;
`;

export const DeleteButton = styled.button`
  background: #9e9e9e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background: #757575;
  }
`;
