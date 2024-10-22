import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  > div {
    flex: 1;
  }
`;

export const Paper = styled.div`
  background: #f6f6f6;
  border-radius: 50px;
  padding: 50px;
`;

export const ImgWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
