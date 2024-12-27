import { CloseButton } from "./styles";
import nochange_icon from "../../images/modal_no_change.png";
import forbidden_icon from "../../images/modal_forbidden.png";
import ModalsBackground from "./ModalsBackground";
import { useNavigate } from "react-router-dom";

interface GoalFailProps {
  state?: string;
  onClose: () => void; // onClose
}

export default function GoalFail(props: GoalFailProps) {
  const { state, onClose } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/calendar");
  };

  return (
    <ModalsBackground onClose={handleClose}>
      <img
        src={state == "삭제" ? forbidden_icon : nochange_icon}
        alt="Goal Achievement Confirmation"
        style={{ width: "35%" }}
      />

      <h2>목표 {state}에 실패했습니다</h2>

      <CloseButton onClick={handleClose}>닫기</CloseButton>
    </ModalsBackground>
  );
}
