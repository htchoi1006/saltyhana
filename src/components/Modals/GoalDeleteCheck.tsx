import { CloseButton } from "./styles";
import register_icon from "../../images/modal_trashcan.png";
import ModalsBackground from "./ModalsBackground";

interface GoalDeleteCheckProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function GoalDeleteCheck(props: GoalDeleteCheckProps) {
  const { onConfirm, onCancel } = props;

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <ModalsBackground onClose={handleCancel}>
      <img
        src={register_icon}
        alt="Goal Deletion Confirmation"
        style={{ width: "35%" }}
      />
      <h2>목표를 삭제하시겠습니까?</h2>
      <div style={{ display: "flex" }}>
        <CloseButton onClick={handleCancel}>취소</CloseButton>
        <CloseButton onClick={handleConfirm}>삭제</CloseButton>
      </div>
    </ModalsBackground>
  );
}
