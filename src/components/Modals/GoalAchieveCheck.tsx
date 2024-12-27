import { CloseButton, ExtendGoalButton } from "./styles";
import thropy_icon from "../../images/modal_trophy.png";
import bomb_icon from "../../images/modal_bomb.png";
import ModalsBackground from "./ModalsBackground";
import { useNavigate } from "react-router-dom";

interface Goal {
  name: string;
  achieved: boolean;
}

interface GoalAchieveCheckProps {
  goal: Goal;
  onClose: () => void; // onClose
}

export default function GoalAchieveCheck(props: GoalAchieveCheckProps) {
  const { goal, onClose } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleExtendGoal = () => {
    onClose();
    navigate("/goal");
  };

  return (
    <ModalsBackground onClose={handleClose}>
      <img
        src={goal.achieved ? thropy_icon : bomb_icon}
        alt="Goal Achievement Confirmation"
        style={{ width: "35%" }}
      />

      <h2>
        ${goal.name} 목표 달성에 ${goal.achieved ? "성공" : "실패"}하였습니다
      </h2>

      <div>
        <ExtendGoalButton onClick={handleExtendGoal}>
          기간 연장
        </ExtendGoalButton>
        <CloseButton onClick={handleClose}>닫기</CloseButton>
      </div>
    </ModalsBackground>
  );
}
