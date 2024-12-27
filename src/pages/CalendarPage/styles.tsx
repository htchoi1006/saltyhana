import styled from "styled-components";
import googleLogo from "../../images/google_logo.png";

export const Container = styled.div`
  display: flex;
  background-color: #f5f7fa;
  font-family: "Noto Sans KR";
  padding: 2rem;
  gap: 2rem;
`;

export const CalendarContainer = styled.div`
  flex: 2.2;
  background: white;
  border-radius: 35px;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.25);
  padding: 1rem; /* 패딩을 1rem으로 조정하여 캘린더가 작아질 수 있게 함 */
`;

export const AuthMessage = styled.div`
  position: fixed;
  top: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-color: rgba(0, 132, 133, 0.8);
  border-radius: 20px;
  color: white;
  text-align: center;
  padding: 10px 0;
  z-index: 1000;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ButtonConnect = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 9px;
  font-size: 14px;
  background-color: white;
  background-image: url(${googleLogo});
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: 9px center;
  padding-left: 36px;
  transition: background-color 0.2s;
  border: 0.5px solid #ddd;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  font-family:
    Noto Sans KR,
    sans-serif;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25); // hover 시 그림자 약간 강화
  }
`;
