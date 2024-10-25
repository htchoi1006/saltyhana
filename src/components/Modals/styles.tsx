import styled from "styled-components";

export const BgModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

//모달 레이아웃
export const ModalContainer = styled.div`
  width: 550px;
  height: 500px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
  padding: 30px;
`;

// 카카오맵 레이아웃
export const MapContainer = styled.div`
  width: 480px;
  height: 250px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;

  background: #efefef;
  box-shadow: 2px 2px 8px 3px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
`;

// 지점 버튼 컨테이너
export const LocationButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #008485;
  border-radius: 10px;
  padding: 11px;
  margin-top: 5px;
  flex: 1.5;

  input {
    border: none; /* 테두리 제거 */
    outline: none;
    flex: 1;
  }

  img {
    width: 25px;
    margin-left: 10px;
    cursor: pointer;
  }
`;

// 00 지점 띄울 때 버튼
export const LocationButton = styled.button`
  background: #fff;
  border: none;
  padding: 11px;
  margin-top: 5px;

  cursor: pointer;
  flex: 1;
`;

// 00 지점 text
export const LocationText = styled.div`
  padding: 10px;
  margin: 5px;
  font-size: 9pt;
`;

// 날짜 선택 옵션
export const DateSelector = styled.select`
  margin-left: 10px;
  padding: 7px;
  border-radius: 5px;
`;

export const TimeButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: none;
  padding: 5px;
  width: 90%;
`;

// 시간 버튼
export const TimeButton = styled.button<{ isSelected: boolean }>`
  background: ${({ isSelected }) =>
    isSelected ? "#a9a9a9" : "#f0f0f0"}; /* 선택 시 진한 회색 */
  border: none;
  border-radius: 16px;
  padding: 12px;
  margin: 6px;
  cursor: pointer;
`;

//예약, 닫기 버튼 레이아웃
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  padding-top: 10px;
`;

export const ReserveButton = styled.button`
  background: #008485;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background: #006363;
  }
`;

export const CloseButton = styled.button`
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

//왼쪽 오른쪽 스크롤 버튼 레이아웃
export const ScrollButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
