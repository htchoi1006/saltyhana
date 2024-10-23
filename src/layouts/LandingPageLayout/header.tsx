import React from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "./styles";
import logo from "../../images/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <header>
      <styled.StyleDiv>
        <styled.Logo src={logo} />
        <styled.HeaderButton onClick={handleSignupClick}>
          Sign up
        </styled.HeaderButton>
      </styled.StyleDiv>
    </header>
  );
};

export default Header;
