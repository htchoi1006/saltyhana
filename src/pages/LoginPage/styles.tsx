import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  text-decoration: none;
  font-size: 14px;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;
