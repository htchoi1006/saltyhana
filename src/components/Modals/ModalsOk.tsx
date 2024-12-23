import { CloseButton } from "./styles";
import icon_ok from "../../images/modal_ok.png";
import ModalsBackground from "./ModalsBackground";

interface ModalsOkProps {
  onClose: () => void;
  statusCode: number | null;
  selectedBank: string | null;
  selectedDate: string;
  selectedTime: string | null;
}

export default function ModalsOk({ onClose, statusCode }: ModalsOkProps) {
  return (
    <ModalsBackground onClose={onClose}>
      <img
        src={icon_ok}
        alt="Reservation Confirmation"
        style={{ width: "35%" }}
      />
      {statusCode === 200 ? (
        <h2>예약이 완료되었습니다</h2>
      ) : (
        <h2>예약에 실패했습니다.</h2>
      )}
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalsBackground>
  );
}
