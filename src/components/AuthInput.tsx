import {
  forwardRef,
  ReactNode,
  HTMLInputTypeAttribute,
  HTMLInputAutoCompleteAttribute,
} from "react";
import styled from "styled-components";

interface Props {
  labelName: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  startIcon: ReactNode;
  endIcon?: ReactNode;
  name: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  showCheckButton?: boolean;
  onCheck?: () => void;
}

const InputLabel = styled.span`
  color: #757575;
  font-weight: 400;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  isolation: isolate;
  border: 0.75px solid #757575;
  border-radius: 16px;
`;

const UnstyledInput = styled.input`
  border: none;
  line-height: 140%;
  outline: none;
  line-height: 140%;
  background-color: inherit;
  width: 100%;
  font-size: inherit;
`;

const CheckButton = styled.button`
  padding: 4px 8px;
  background-color: #008485;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #006e6f;
  }
`;

const AuthInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    labelName,
    placeholder,
    startIcon,
    endIcon,
    type,
    name,
    autoComplete,
    showCheckButton,
    onCheck,
  } = props;
  return (
    <label>
      <div>
        <InputLabel>{labelName}</InputLabel>
      </div>
      <InputWrapper>
        <div>{startIcon}</div>
        <div style={{ flex: 1 }}>
          <UnstyledInput
            type={type}
            name={name}
            ref={ref}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        </div>
        {showCheckButton && (
          <CheckButton type="button" onClick={onCheck}>
            중복 확인
          </CheckButton>
        )}
        {endIcon && <div>{endIcon}</div>}
      </InputWrapper>
    </label>
  );
});

export default AuthInput;
