import { useState, forwardRef, useImperativeHandle, Ref } from "react";
import Modals from "./Modals";
import AgreeModal from "../AgreeModal/AgreeModal";

export interface ModalManagerType {
  openModal: (modalName: string) => void;
  closeModal: () => void;
}

interface ModalManagerProps {
  setIsAgreed?: (value: boolean) => void;
  isAgreed?: boolean;
}

const ModalManager = forwardRef<ModalManagerType, ModalManagerProps>(
  ({ setIsAgreed, isAgreed = false }, ref) => {
    const [modalType, setModalType] = useState<string | null>(null);

    // 모달 열기 함수
    const openModal = (type: string) => {
      setModalType(type); // 해당 모달 타입 저장
    };

    // 모달 닫기 함수
    const closeModal = () => {
      setModalType(null); // 모달 닫기
    };

    const handleAgreeAll = () => {
      if (setIsAgreed) {
        setIsAgreed(true);
      }
    };

    // 부모 컴포넌트가 사용할 수 있도록 메서드 노출
    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    return (
      <>
        {/* 특정 모달이 열리면 해당 모달 표시 */}
        {modalType === "창구예약" && <Modals onClose={closeModal} />}
        {modalType === "이용약관" && (
          <AgreeModal
            onClose={closeModal}
            onAgreeAll={handleAgreeAll} // 동의 상태 업데이트
            isAgreed={isAgreed}
          />
        )}
      </>
    );
  },
);

export default ModalManager;
