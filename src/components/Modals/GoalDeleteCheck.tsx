import { CloseButton, DeleteButton } from "../AgreeModal/AgreeModalStyles";
import register_icon from "../../images/modal_trashcan.png";
import ModalsSmallBackground from "./ModalsSmallBackground";

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
    <ModalsSmallBackground onClose={handleCancel}>
      <CloseButton onClick={handleCancel} title="닫기">
        ✖
      </CloseButton>
      <img
        src={register_icon}
        alt="Goal Deletion Confirmation"
        style={{ width: "35%" }}
      />
      <h2>목표를 삭제하시겠습니까?</h2>
      <DeleteButton onClick={handleConfirm}>삭제</DeleteButton>
    </ModalsSmallBackground>
  );
}
