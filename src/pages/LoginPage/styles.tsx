import { Link } from "react-router-dom";
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

export const StyledLink = styled(Link)`
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 1.1s;
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
