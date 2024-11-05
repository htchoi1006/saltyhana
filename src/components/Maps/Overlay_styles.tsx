import styled from "styled-components";
import SwitchButton from "../../images/modal_location_switch.png";
import Switchhover from "../../images/modal_location_hover.png";

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

//지도 검색 초기화
export const MapButton = styled.button`
  position: absolute;
  top: 220px;
  right: 60px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  background-image: url(${SwitchButton});
  background-size: cover;
  width: 40px;
  height: 40px;
  z-index: 100;

  &:hover {
    background-image: url(${Switchhover});
  }
`;
