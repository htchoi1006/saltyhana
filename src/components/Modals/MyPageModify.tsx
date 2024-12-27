import { CloseButton } from "./styles";
import register_icon from "../../images/modal_goal_register.png";
import nochange_icon from "../../images/modal_no_change.png";
import forbidden_icon from "../../images/modal_forbidden.png";
import ModalsBackground from "./ModalsBackground";
import { useNavigate } from "react-router-dom";

interface MyPageModifyProps {
  isInfoEdit?: number; // 0: 실패, 1: 변경 내용 없음, 2: 변경 성공
  onClose: () => void; // onClose
}

export default function MyPageModify(props: MyPageModifyProps) {
  const { isInfoEdit, onClose } = props;
  const navigate = useNavigate();

  console.log("isInfoEdit :" + isInfoEdit);

  const handleClose = () => {
    onClose();
    navigate("/mypage");
  };

  return (
    <ModalsBackground onClose={handleClose}>
      <img
        src={
          isInfoEdit == 0
            ? forbidden_icon
            : isInfoEdit == 2
              ? register_icon
              : nochange_icon
        }
        alt="Goal Achievement Confirmation"
        style={{ width: "35%" }}
      />

      <h2>
        {isInfoEdit == 0
          ? "정보 업데이트에 실패했습니다"
          : isInfoEdit == 2
            ? "정보가 성공적으로 업데이트되었습니다"
            : "변경된 정보가 없습니다"}
      </h2>

      <CloseButton onClick={handleClose}>닫기</CloseButton>
    </ModalsBackground>
  );
}
