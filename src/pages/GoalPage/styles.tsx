import styled, { keyframes } from "styled-components";
import setGoalPen from "../../images/set_goal_pen.png";
import setGoalMoney from "../../images/set_goal_money.png";
import setGoalCalendar from "../../images/set_goal_calendar.png";
import iconAmusementPark from "../../images/goal_icon_amusementpark.png";
import iconAnniversary from "../../images/goal_icon_anniversary.png";
import iconBeach from "../../images/goal_icon_beach.webp";
import iconBeer from "../../images/goal_icon_beer.png";
import iconCar from "../../images/goal_icon_car.png";
import iconCake from "../../images/goal_icon_cake.png";
import iconCoffee from "../../images/goal_icon_coffee.png";
import iconCruise from "../../images/goal_icon_cruise.png";
import iconChristmas from "../../images/goal_icon_christmas.png";
import iconLobster from "../../images/goal_icon_lobstar.png";
import iconMoney from "../../images/goal_icon_money.webp";
import iconParty from "../../images/goal_icon_party.png";
import iconPet from "../../images/goal_icon_pet.png";
import iconPhone from "../../images/goal_icon_phone.webp";
import iconShopping from "../../images/goal_icon_shopping.webp";
import iconTicket from "../../images/goal_icon_ticket.webp";
import iconTravel from "../../images/goal_icon_travel.png";

interface IconBackgroundProps {
  $isSelected?: boolean;
  disabled?: boolean;
}

// Fade-in 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);MNL
  }
`;

// Export grouped icons (optional for easier reuse)
export const commonIcons = {
  setGoalPen,
  setGoalMoney,
  setGoalCalendar,
};

export const goalIcons = {
  iconAmusementPark,
  iconAnniversary,
  iconBeach,
  iconBeer,
  iconCar,
  iconCake,
  iconCoffee,
  iconCruise,
  iconChristmas,
  iconLobster,
  iconMoney,
  iconParty,
  iconPet,
  iconPhone,
  iconShopping,
  iconTicket,
  iconTravel,
};

export const Container = styled.div`
  font-family: "Noto Sans KR";
  margin-top: 50px;
  margin-left: 70px;
  display: flex;
  flex-direction: column;
  align-items: start;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const ContainerHeader = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 20px;
  letter-spacing: -0.02em;

  color: #343434;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const InputWrapper = styled.div`
  display: flex;
  /* width: 80%; */
  gap: 20px;
  align-items: flex-start;
  margin-top: 30px;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const InputContainer = styled.div`
  flex: 0.8; // 기존 flex: 1에서 변경하여 너비 줄임
  background-color: #ffffff;
  border-radius: 20px;
  padding: 3px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 300px; // 기존 380px에서 변경
  height: 47px
  font-family: "Noto Sans KR";
  border: 1px solid lightgray;

  &:focus-within {
    outline: 2px solid #008485;
  }

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const CategoryContainer = styled.div`
  flex: 0.6;
  /* padding: 3px 12px; */
  height: 53px;
  font-family: "Noto Sans KR";

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const CategorySelect = styled.select`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 1px solid lightgray;
  padding: 3px 12px;
  font-size: 16px;
  font-family: "Noto Sans KR";
  background-color: #ffffff;
  cursor: pointer;
  outline: none;

  &.placeholder {
    color: #adb5bd;
  }
  &:focus {
    outline: 2px solid #008485;
  }

  option {
    font-size: 16px;
    padding: 8px;
  }

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const SetGoalPen = styled.img`
  width: 29px;
  height: auto;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const SetGoalMoney = styled.img`
  width: 36px;
  height: auto;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const SetGoalCalendar = styled.img`
  width: 36px;
  height: auto;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  background: none;
  font-size: 16px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  padding: 0;
  font-family: "Noto Sans KR";

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #000 !important;
  }

  &[type="date"] {
    position: relative;

    &::-webkit-datetime-edit-text,
    &::-webkit-datetime-edit-month-field,
    &::-webkit-datetime-edit-day-field,
    &::-webkit-datetime-edit-year-field {
      display: none;
    }

    &::-webkit-calendar-picker-indicator {
      background: transparent;
      bottom: 0;
      color: transparent;
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
    }

    &[value=""] {
      &::-webkit-datetime-edit-text,
      &::-webkit-datetime-edit-month-field,
      &::-webkit-datetime-edit-day-field,
      &::-webkit-datetime-edit-year-field {
        display: none;
      }

      &::before {
        content: attr(placeholder);
        color: #adb5bd;
        position: absolute;
        left: 0;
      }
    }

    &:not([value=""]) {
      &::-webkit-datetime-edit-text,
      &::-webkit-datetime-edit-month-field,
      &::-webkit-datetime-edit-day-field,
      &::-webkit-datetime-edit-year-field {
        display: inline;
      }
    }
  }

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const UnitText = styled.span`
  color: #666;
  font-size: 16px;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const SubText = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 12px;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const SelectIconText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 12px;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const IconList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 60%; */
  align-items: flex-start;
  margin-bottom: 20px;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const IconBackground = styled.button<IconBackgroundProps>`
  width: 150px;
  height: 150px;
  background-color: ${(props) =>
    props.disabled ? "#f0f0f0" : props.$isSelected ? "#D0D4D7" : "#e9edf0"};
  margin-right: 20px;
  border-radius: 35px;
  box-shadow: 3px 3px 4px 1px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover {
    border: ${(props) => !props.disabled && "1px solid #008485"};
    background-color: ${(props) =>
      props.disabled ? "#f0f0f0" : props.$isSelected ? "#D0D4D7" : "#e9edf0"};
  }
`;

export const Icons = styled.img`
  width: 80%;
  height: auto;
`;

export const RegisterDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const RegisterContent = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  margin-bottom: 100px;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const ImageUploadSection = styled.div`
  /* flex: 0 0 344px; */

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const ImageUploadBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.2s ease;
  border: 1px solid lightgray;

  &:hover {
    background-color: #e9ecef;
  }

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const ImagePlaceholder = styled.div`
  width: 32px;
  height: 32px;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: #adb5bd;
  }

  &::before {
    width: 32px;
    height: 2px;
    top: 15px;
    left: 0;
  }

  &::after {
    width: 2px;
    height: 32px;
    left: 15px;
    top: 0;
  }

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const UploadedImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const CancelButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;

export const RegisterButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 100px;
  padding: 16px 40px;
  background-color: #008485;
  color: white;
  border: none;
  border-radius: 128px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Noto Sans KR";

  &:hover {
    background-color: #006e6f;
  }

  &:active {
    background-color: #005858;
  }

  /* fade-in 효과 적용 */
  animation: ${fadeIn} 1s ease-in-out;
`;
