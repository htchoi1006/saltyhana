import styled from "styled-components";

export const OverlayContainer = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;

  width: 180px;
  height: auto;
  z-index: 1000;
`;

export const OverlayTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #333;
  padding-bottom: 5px;
  width: 90%;
`;

export const TitleUnderline = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #ddd;
`;

export const OverlayBody = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: #555;
`;

export const BankNumber = styled.a`
  color: #5085bb;
  text-decoration: none;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: 15px;
`;

// 맵의 위치 마커 텍스트 레이아웃
export const MarkerText = styled.div`
  padding: 6px 6px;
  align-items: center;
  text-align: center;
  font-size: 12px;
  max-width: 100%;
  position: relative;
`;

export const MarkerLayout = styled.div`
  background-color: white;
  padding: 6px 6px;
  border-radius: 5px;
  align-items: center;
  text-align: center;
`;
