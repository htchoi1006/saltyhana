import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 64px);
`;

export const ProfileImgDiv = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.3s;
  width: 200px;
  height: 200px;
  border: 1px solid black;
  border-radius: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const SingleOverlayButton = styled.button`
  width: 100%;
  height: 100%; // 전체 높이 사용
  border: none;
  background: transparent;
  color: white;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProfileImgDiv}:hover & {
    opacity: 1;
  }
`;

export const OverlayButton = styled.button`
  width: 100%;
  height: 50%;
  border: none;
  background: transparent;
  color: white;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const DefaultProfileImg = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 50%;
    height: 50%;
    color: #9ca3af;
  }
`;

export const ButtonBase = styled.button`
  padding: 8px 16px;
  margin-top: 12px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ImageUploadButton = styled(ButtonBase)`
  background-color: #008485;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 140px;
  height: 40px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  &:hover {
    background-color: #006f6f;
  }
`;

export const ImageDeleteButton = styled(ButtonBase)`
  background-color: #616266;
  color: white;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 140px;
  height: 40px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  &:hover {
    background-color: #4d4e52;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// export const DefaultProfileImg = styled.div`
// 	width: 60%;
// 	height: 60%;
// 	background-color: #e5e7eb;
// 	border-radius: 50%;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;

// 	svg {
// 		width: 50%;
// 		height: 50%;
// 		color: #9ca3af;
// 	}
// `;

export const NameDiv = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 24px;
  color: #222222;

  margin-top: 30px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-top: 50px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 600px;
`;

export const InputLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

// export const DisplayWrapper = styled.div`
// 	display: flex;
// 	align-items: center;
// 	padding: 12px 16px;
// 	border: 1px solid #e2e8f0;
// 	border-radius: 8px;
// 	background-color: #f8fafc;
// 	gap: 8px;
// `;

export const DisplayText = styled.span`
  flex: 1;
  margin-left: 8px;
  color: #1e293b;
`;

// export const EditInput = styled.input`
// 	flex: 1;
// 	margin-left: 8px;
// 	padding: 4px 8px;
// 	border: 1px solid #e2e8f0;
// 	border-radius: 4px;
// 	font-size: 14px;
// `;

export const Button = styled.button`
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  background-color: #008485;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 70px;
  height: 52px;

  &:hover {
    background-color: #006f6f;
  }

  &.cancel {
    background-color: #64748b;
    margin-right: 8px;

    &:hover {
      background-color: #475569;
    }
  }
`;

export const PasswordSection = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.8s;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: -4px;
  margin-left: 4px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

// 기존 EditInput 스타일 수정
// export const EditInput = styled.input`
// 	flex: 1;
// 	margin-left: 8px;
// 	padding: 4px 8px;
// 	border: 1px solid #e2e8f0;
// 	border-radius: 4px;
// 	font-size: 14px;

// 	&::placeholder {
// 		color: #a0aec0;
// 	}
// `;

export const PasswordInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background-color: #f8fafc;
  gap: 8px;
`;

export const PasswordInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;

  &::placeholder {
    color: #a0aec0;
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

export const AuthDisplayContainer = styled.label`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.6s;
  display: flex;
  flex-direction: column;
`;

export const InputAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const DisplayWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background-color: #f8fafc;
  gap: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

export const EditButton = styled(Button)`
  width: 70px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  border-radius: 20px;
`;

export const EditInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;

  &::placeholder {
    color: #a0aec0;
  }
`;
