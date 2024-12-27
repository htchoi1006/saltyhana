import { CloseButton } from "../AgreeModal/AgreeModalStyles";
import nochange_icon from "../../images/modal_no_change.png";
import forbidden_icon from "../../images/modal_forbidden.png";
import ModalsSmallBackground from "./ModalsSmallBackground";
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
    <ModalsSmallBackground onClose={handleClose}>
      <CloseButton onClick={handleClose} title="닫기">
        ✖
      </CloseButton>
      <img
        src={state == "삭제" ? forbidden_icon : nochange_icon}
        alt="Goal Achievement Confirmation"
        style={{ width: "35%" }}
      />

      <h2>목표 {state}에 실패했습니다</h2>
    </ModalsSmallBackground>
  );
}
