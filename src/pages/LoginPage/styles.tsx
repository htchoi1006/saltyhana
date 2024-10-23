import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  > div {
    flex: 1;
  }
`;

export const Paper = styled.div`
  width: 450px;
  background: #f6f6f6;
  border-radius: 50px;
  padding: 50px;
  font-size: 20px;
  > h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    color: #424242;
    line-height: 110%;
    text-shadow: 2px 4px 8px rgba(252, 226, 206, 0.2);
    margin: 0;
  }
  > h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 55px;
    color: #008485;
    line-height: 110%;
    text-shadow: 2px 4px 8px rgba(252, 226, 206, 0.2);
    margin: 0 0 40px 0;
  }
`;

export const ImgWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledLink = styled(Link)`
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 25px 0;
  & > * {
    display: block;
    text-align: center;
    background: #008485;
    border-radius: 128px;
    letter-spacing: 0.2px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    border: 0;
    width: 100%;
    color: #ffffff;
    cursor: pointer;
    padding: 5px 0;
    text-decoration: none;
  }
`;
