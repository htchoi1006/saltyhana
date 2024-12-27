import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
  padding: 0 50px;
`;

export const LeftSection = styled.div`
  margin-left: 10%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 45px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: #666666;
  margin-bottom: 30px;
`;

export const ResultButton = styled.button`
  position: fixed;
  bottom: 150px;
  right: 200px;
  padding: 12px 28px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px; /* 둥근 모서리 */
  border: none;
  cursor: pointer;

  font-style: normal;
  font-size: 22px;
  color: #ffffff;
  font-weight: 600;

  padding: 10px 40px;
  background: #008485;

  text-decoration: none;
  transition:
    background-color 0.5s ease,
    color 0.5s ease;

  &:hover {
    background-color: #ffffff; /* hover 시 배경을 흰색으로 변경 */
    color: #008485; /* hover 시 텍스트 색상을 짙은 #008485로 설정 */
  }
`;

export const RightSection = styled.div`
  margin-right: 10%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  height: 400px;
  border: 1px solid #dddddd;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
`;
