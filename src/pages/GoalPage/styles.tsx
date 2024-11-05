import styled from "styled-components";

interface IconBackgroundProps {
  $isSelected?: boolean;
  disabled?: boolean;
}

export const Container = styled.div`
  font-family: "Noto Sans KR";
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const ContainerHeader = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 20px;
  letter-spacing: -0.02em;

  color: #343434;
`;

// ------------------------------------------

// export const InputWrapper = styled.div`
// 	display: flex;
// 	width: 80%;
// 	gap: 20px;
// 	align-items: flex-start;
// 	margin-top: 30px;
// `;

// export const InputContainer = styled.div`
// 	flex: 1;
// 	/* background-color: #f8f9fa; */
// 	background-color: #ffffff;
// 	border-radius: 20px;
// 	padding: 3px 12px;
// 	display: flex;
// 	align-items: center;
// 	gap: 8px;
// 	width: 380px;
// 	height: 47px;
// 	font-family: "Noto Sans KR";
// 	border: 1px solid lightgray;

// 	&:focus-within {
// 		outline: 2px solid #008485;
// 	}
// `;

export const InputWrapper = styled.div`
  display: flex;
  width: 80%;
  gap: 20px;
  align-items: flex-start;
  margin-top: 30px;
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
  height: 47px;
  font-family: "Noto Sans KR";
  border: 1px solid lightgray;

  &:focus-within {
    outline: 2px solid #008485;
  }
`;

export const CategoryContainer = styled.div`
  flex: 0.6;
  /* padding: 3px 12px; */
  height: 53px;
  font-family: "Noto Sans KR";
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
`;

export const SetGoalPen = styled.img`
  width: 29px;
  height: auto;
`;

export const SetGoalMoney = styled.img`
  width: 36px;
  height: auto;
`;

export const SetGoalCalendar = styled.img`
  width: 36px;
  height: auto;
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

  /* &::placeholder {
		color: #adb5bd;
	} */

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #000 !important;
  }
`;

export const UnitText = styled.span`
  color: #666;
  font-size: 16px;
`;

export const SubText = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 12px;
`;

export const SelectIconText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 12px;
`;

export const IconList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 60%; */
  align-items: flex-start;
  margin-bottom: 20px;
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
`;

export const RegisterContent = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  margin-bottom: 100px;
`;

export const ImageUploadSection = styled.div`
  /* flex: 0 0 344px; */
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
`;

export const UploadedImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
`;

export const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InputSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const InputIcon = styled.img`
  width: 30px;
  height: auto;
`;

export const RegisterInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  padding: 4px 0;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #000 !important;
  }

  &::placeholder {
    color: #adb5bd;
  }
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
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 1px solid lightgray;
  padding: 0 12px;
  font-size: 16px;
  font-family: "Noto Sans KR";
  background-color: #ffffff;
  cursor: pointer;
  outline: none;
  color: #000000;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &.placeholder {
    color: #adb5bd;
  }

  &:focus {
    outline: 2px solid #008485;
  }

  option {
    font-size: 16px;
    padding: 8px;
    color: #000000;
  }

  option[value=""] {
    color: #adb5bd;
  }

  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
`;

export const DirectInputContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 3px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 47px;
  font-family: "Noto Sans KR";
  border: 1px solid lightgray;

  &:focus-within {
    outline: 2px solid #008485;
  }

  /* StyledSelect가 포함된 컨테이너일 경우 */
  ${StyledSelect} {
    border: none;
    height: 41px;
    padding: 0;
    border-radius: 0;

    &:focus {
      outline: none;
    }
  }
`;

export const InputGrid = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
`;
