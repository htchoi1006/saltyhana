// import {
//   ChoiceContainer,
//   ChoiceCard,
//   Icon,
//   Title,
//   CloseButton,
//   SearchButton,
//   SearchButtonTitle,
//   SearchIcon,
// } from "./styles";
// import ftof from "../../images/modal_reserve_facetoface.png";
// import chat from "../../images/modal_reserve_chat.png";
// import ModalsBackground from "../Modals/ModalsBackground";
// import document from "../../images/document.png";
// interface ModalsProps {
//   openModal: (modalName: string) => void;
//   onClose: () => void;
// }

// // export default function ChoiceCounsel(props: ModalsProps) {
// //   const { onClose, openModal } = props;
// export default function ChoiceCounsel(
//   props: ModalsProps & { productLink?: string | null },
// ) {
//   const { onClose, openModal, productLink } = props;

//   const handleFaceToFaceClick = () => {
//     onClose(); // 현재 모달 먼저 닫고
//     openModal("창구예약"); // 창구예약 모달
//   };

//   const handleChatClick = () => {
//     onClose();
//     openModal("채팅모달");
//   };

//   const handleUrlClick = () => {
//     if (productLink) {
//       window.open(productLink, "_blank"); // Open product link in a new tab
//     } else {
//       console.error("Product link is not provided.");
//     }
//   };

//   return (
//     <ModalsBackground onClose={onClose}>
//       <ChoiceContainer>
//         <SearchButton onClick={handleUrlClick}>
//           <SearchIcon title="검색">
//             <img src={document} alt="상품조회" />
//           </SearchIcon>
//           <SearchButtonTitle>상품조회</SearchButtonTitle>
//         </SearchButton>
//         <CloseButton onClick={onClose} title="닫기">
//           ✖
//         </CloseButton>
//         <ChoiceCard onClick={handleFaceToFaceClick}>
//           {" "}
//           <Icon src={ftof} alt="대면상담" />
//           <Title>대면 상담</Title>
//         </ChoiceCard>
//         <ChoiceCard onClick={handleChatClick}>
//           {" "}
//           <Icon src={chat} alt="비대면 상담" />
//           <Title>비대면 상담</Title>
//         </ChoiceCard>
//       </ChoiceContainer>
//     </ModalsBackground>
//   );
// }

import {
  ChoiceContainer,
  ChoiceCard,
  Icon,
  Title,
  CloseButton,
  SearchButton,
  SearchButtonTitle,
  SearchIcon,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  TitleDiv,
} from "./styles";
import ftof from "../../images/modal_reserve_facetoface.png";
import chat from "../../images/modal_reserve_chat.png";
import ModalsBackground from "../Modals/ModalsBackground";
import document from "../../images/document.png";
interface ModalsProps {
  openModal: (modalName: string) => void;
  onClose: () => void;
}

// export default function ChoiceCounsel(props: ModalsProps) {
//   const { onClose, openModal } = props;
export default function ChoiceCounsel(
  props: ModalsProps & { productLink?: string | null },
) {
  const { onClose, openModal, productLink } = props;

  const handleFaceToFaceClick = () => {
    onClose(); // 현재 모달 먼저 닫고
    openModal("창구예약"); // 창구예약 모달
  };

  const handleChatClick = () => {
    onClose();
    openModal("채팅모달");
  };

  const handleUrlClick = () => {
    if (productLink) {
      window.open(productLink, "_blank"); // Open product link in a new tab
    } else {
      console.error("Product link is not provided.");
    }
  };

  return (
    <ModalsBackground onClose={onClose}>
      <ChoiceContainer>
        <TopContainer>
          <CloseButton onClick={onClose} title="닫기">
            ✖
          </CloseButton>
        </TopContainer>
        <TitleDiv>
          <span>상품 가입을 위한 상담이 필요하신가요?</span>
        </TitleDiv>
        <MiddleContainer>
          <ChoiceCard onClick={handleFaceToFaceClick}>
            {" "}
            <Icon src={ftof} alt="대면상담" />
            <Title>방문 상담 예약</Title>
          </ChoiceCard>
          <ChoiceCard onClick={handleChatClick}>
            {" "}
            <Icon src={chat} alt="비대면 상담" />
            <Title>비대면 상담</Title>
          </ChoiceCard>
        </MiddleContainer>
        <BottomContainer>
          <SearchButton onClick={handleUrlClick}>
            <SearchIcon title="검색">
              <img src={document} alt="상품 설명서" />
            </SearchIcon>
            <SearchButtonTitle>상품 설명서</SearchButtonTitle>
          </SearchButton>
        </BottomContainer>
      </ChoiceContainer>
    </ModalsBackground>
  );
}
