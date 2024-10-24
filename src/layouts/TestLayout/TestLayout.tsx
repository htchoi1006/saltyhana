import { Outlet } from "react-router-dom";
import styled from "styled-components";

const TestWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function TestLayout() {
  return (
    <TestWrapper>
      <Outlet />
    </TestWrapper>
  );
}
