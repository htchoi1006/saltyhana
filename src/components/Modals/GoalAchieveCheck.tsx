import { Button } from "./styles";
import thropy_icon from "../../images/modal_trophy.png";
import bomb_icon from "../../images/modal_bomb.png";
import ModalsBackground from "./ModalsBackground";
import { useNavigate } from "react-router-dom";
import { Goal } from "../../pages/HomePage/HomePage";

interface GoalAchieveCheckProps {
  goal?: Goal;
  onClose: () => void; // onClose
}

export default function GoalAchieveCheck(props: GoalAchieveCheckProps) {
  const { goal, onClose } = props;
  const navigate = useNavigate();

  // let goal = props.goal;
  // goal = {
  //   id: 1,
  //   achieved: true,
  //   name: "여행",
  //   iconUrl: "12",
  //   //"https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_8.png",
  //   category: "4",
  //   amount: 180000,
  //   startAt: "2024-12-09",
  //   endAt: "2024-12-23"
  // };

  const handleClose = () => {
    onClose();
  };

  const handleExtendGoal = () => {
    onClose();
    if (goal !== undefined) {
      console.log(parseInt(goal.iconUrl));

      const formattedGoalData = {
        goalName: goal.name,
        goalMoney: goal.amount,
        startDate: goal.startAt.split("T")[0],
        endDate: goal.endAt.split("T")[0],
        goalType: parseInt(goal.category),
        iconId: goal.iconUrl.startsWith("https")
          ? null
          : parseInt(goal.iconUrl),
        goalImg: goal.iconUrl.startsWith("https") ? goal.iconUrl : null,
        category: goal.category,
      };

      navigate("/goal", {
        state: {
          isEdit: true,
          goalId: goal?.id,
          goalData: formattedGoalData,
        },
      });
    }
  };

  if (!goal) {
    return <></>;
  }

  return (
    <ModalsBackground onClose={handleClose}>
      <img
        src={goal.achieved ? thropy_icon : bomb_icon}
        alt="Goal Achievement Confirmation"
        style={{ width: "35%" }}
      />
      {goal.achieved ? (
        <>
          <h2 style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              {goal.name + " "}
            </span>
            목표 달성에
            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              {" 성공 "}
            </span>
            하였습니다
            <br />이 기세로 다음 목표도 도전!
          </h2>
          <Button style={{ margin: "0px" }} onClick={handleClose}>
            닫기
          </Button>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              {goal.name + " "}
            </span>
            목표 달성에
            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              {" 실패 "}
            </span>
            하였습니다
            <br />
            다음 목표 달성에 좀 더 힘내봐요!
          </h2>
          <div style={{ display: "flex" }}>
            <Button onClick={handleExtendGoal}>기간 연장</Button>
            <Button onClick={handleClose}>닫기</Button>
          </div>
        </>
      )}
    </ModalsBackground>
  );
}
