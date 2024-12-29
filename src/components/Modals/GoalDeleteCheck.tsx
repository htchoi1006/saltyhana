import { CloseButton } from "../AgreeModal/AgreeModalStyles";
import register_icon from "../../images/modal_trashcan.png";
import ModalsSmallBackground from "./ModalsSmallBackground";
import { Button } from "./styles";

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
      <Button style={{ margin: "0px" }} onClick={handleConfirm}>
        삭제
      </Button>
    </ModalsSmallBackground>
  );
}
