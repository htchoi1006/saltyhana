import { CloseButton } from "./styles";
import register_icon from "../../images/modal_goal_register.png";
import ModalsBackground from "./ModalsBackground";
import { useNavigate } from "react-router-dom";

interface GoalRegisterProps {
  onClose: () => void; // onClose
}

export default function GoalRegister(props: GoalRegisterProps) {
  const { onClose } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/calendar");
  };

  return (
    <ModalsBackground onClose={handleClose}>
      <img
        src={register_icon}
        alt="Goal Registeration Confirmation"
        style={{ width: "35%" }}
      />

      <h2>목표 등록이 완료되었습니다</h2>

      <CloseButton onClick={handleClose}>닫기</CloseButton>
    </ModalsBackground>
  );
}
