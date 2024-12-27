// import styled from "styled-components";

// export const ChoiceContainer = styled.div`
//   display: flex;
//   width: 100%;
//   height: 70%;
//   justify-content: center;
// `;

// export const ChoiceCard = styled.div`
//   width: 50%;
//   background: #efefef;
//   border-radius: 30px;
//   box-shadow: 3px 4px 10px 4px rgba(0, 0, 0, 0.2);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin: 5px 20px;
//   text-align: center;
//   transition: transform 0.3s;
//   cursor: pointer;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// export const Icon = styled.img`
//   width: 50%;
//   height: auto;
//   margin-bottom: 10px;
// `;

// export const Title = styled.div`
//   font-family: "Noto Sans KR", sans-serif;
//   font-weight: 700;
//   font-size: 20px;
//   color: #404040;
// `;

// export const CloseButton = styled.button`
//   position: absolute;
//   top: 5%;
//   right: 7%;
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #555;
//   font-size: 28px;
// `;

// export const SearchButton = styled.div`
//   position: absolute;
//   /* width: 21%;
//   height: 8%;
//   top: 4.45%;
//   right: 13%; */
//   width: 18%; /* 기존 21%에서 15%로 축소 */
//   height: 7%; /* 기존 8%에서 6%로 축소 */
//   top: 5.2%; /* 위치를 약간 조정 */
//   right: 13%; /* 위치를 약간 조정 */
//   background: #efefef;
//   border-radius: 16px;
//   box-shadow: 1.5px 2px 2px 2px rgba(0, 0, 0, 0.2);
//   display: flex; /* Flexbox 활성화 */
//   align-items: center; /* 세로 정렬 */
//   padding: 0 8px; /* 버튼 내부 여백 */
//   transition: transform 0.3s;
//   cursor: pointer;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// export const SearchIcon = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;

//   img {
//     width: 35px;
//     height: 35px;
//   }
// `;

// export const SearchButtonTitle = styled.div`
//   font-family: "Noto Sans KR", sans-serif;
//   /* font-weight: 400; */
//   font-size: 17px;
//   color: #404040;
//   all: unset;
// `;

import styled from "styled-components";

export const ChoiceContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: center;
  flex-direction: column;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 20px;
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #404040;

  margin-bottom: 30px;
`;

export const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 60px;
  margin-right: 20px;
`;

export const ChoiceCard = styled.div`
  width: 50%;
  height: 280px;
  background: #efefef;
  border-radius: 30px;
  box-shadow: 3px 4px 10px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px 20px;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Icon = styled.img`
  width: 50%;
  height: auto;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #404040;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 28px;
`;

export const SearchButton = styled.div`
  width: 140px;
  background: #efefef;
  border-radius: 16px;
  box-shadow: 1.5px 2px 2px 2px rgba(0, 0, 0, 0.2);
  display: flex; /* Flexbox 활성화 */
  align-items: center; /* 세로 정렬 */
  justify-content: center;
  padding: 0 8px; /* 버튼 내부 여백 */
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const SearchIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
  }
`;

export const SearchButtonTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  /* font-weight: 400; */
  font-size: 17px;
  color: #404040;
  all: unset;
  width: 160px;
`;
