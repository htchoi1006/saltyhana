import { CloseButton } from "./styles";
import register_icon from "../../images/modal_goal_register.png";
import ModalsBackground from "./ModalsBackground";

interface GoalRegisterProps {
  onClose: () => void; // onClose
}

export default function GoalRegister(props: GoalRegisterProps) {
  const { onClose } = props;

  return (
    <ModalsBackground onClose={onClose}>
      <img
        src={register_icon}
        alt="Goal Registeration Confirmation"
        style={{ width: "35%" }}
      />

      <h2>목표 등록이 완료되었습니다</h2>

      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalsBackground>
  );
}
