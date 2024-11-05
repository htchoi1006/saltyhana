import styled from "styled-components";

// 계좌 리스트 스타일
export const AccountListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 35px;
  width: 89%;
  height: 170px;
  overflow-y: auto; // Enable vertical scrolling when list exceeds height
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.1);
  font-family:
    Noto Sans KR,
    sans-serif;
`;

// 각 계좌 스타일
export const AccountItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #f5f7fa91;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffffff;
  }

  &.active {
    background-color: #ffffff;
    font-weight: bold;
    color: #2a9d8f;
  }
`;
