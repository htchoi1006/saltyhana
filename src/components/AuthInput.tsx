import { forwardRef, ReactNode, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

interface Props {
  labelName: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  startIcon: ReactNode;
  endIcon?: ReactNode;
  name: string;
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

const AuthInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { labelName, placeholder, startIcon, endIcon, type, name } = props;
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
          />
        </div>
        {endIcon && <div>{endIcon}</div>}
      </InputWrapper>
    </label>
  );
});

export default AuthInput;
