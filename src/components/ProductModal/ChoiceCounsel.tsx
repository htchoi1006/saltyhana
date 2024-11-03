import {
  ChoiceContainer,
  ChoiceCard,
  Icon,
  Title,
  CloseButton,
} from "./styles";
import ftof from "../../images/modal_reserve_facetoface.png";
import chat from "../../images/modal_reserve_chat.png";
import ModalsBackground from "../Modals/ModalsBackground";

interface ModalsProps {
  onClose: () => void;
  openModal: (modalName: string) => void;
}

export default function ChoiceCounsel(props: ModalsProps) {
  const { onClose, openModal } = props;

  const handleFaceToFaceClick = () => {
    onClose(); // 현재 모달 먼저 닫고
    openModal("창구예약"); // 창구예약 모달
  };

  const handleChatClick = () => {
    onClose();
  };

  return (
    <ModalsBackground onClose={onClose}>
      <ChoiceContainer>
        <CloseButton onClick={onClose} title="닫기">
          ✖
        </CloseButton>
        <ChoiceCard onClick={handleFaceToFaceClick}>
          {" "}
          <Icon src={ftof} alt="대면상담" />
          <Title>대면 상담</Title>
        </ChoiceCard>
        <ChoiceCard onClick={handleChatClick}>
          {" "}
          <Icon src={chat} alt="비대면 상담" />
          <Title>비대면 상담</Title>
        </ChoiceCard>
      </ChoiceContainer>
    </ModalsBackground>
  );
}
