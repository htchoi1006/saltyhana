import { CloseButton } from "./styles";
import icon_ok from "../../images/modal_ok.png";
import icon_fail from "../../images/modal_fail.png";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ModalsBackground from "./ModalsBackground";

interface ModalsOkProps {
  onClose: () => void;
  statusCode: number | null;
  selectedBank: string | null;
  selectedDate: string;
  selectedTime: string | null;
}

export default function ModalsOk({ onClose, statusCode }: ModalsOkProps) {
  const isLoading = statusCode === null;

  return (
    <ModalsBackground onClose={onClose}>
      {isLoading ? (
        // 로딩 중일 때
        <LoadingSpinner />
      ) : (
        // 서버 응답을 받았을 때
        <>
          <img
            src={statusCode === 200 ? icon_ok : icon_fail}
            alt={
              statusCode === 200
                ? "Reservation Confirmation"
                : "Reservation Failure"
            }
            style={{ width: "35%" }}
          />
          {statusCode === 200 ? (
            <h2>예약이 완료되었습니다</h2>
          ) : (
            <h2>예약에 실패했습니다</h2>
          )}
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </>
      )}
    </ModalsBackground>
  );
}
