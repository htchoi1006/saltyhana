import { useState, forwardRef, useImperativeHandle } from "react";
import Modals from "./Modals";
import AgreeModal from "../AgreeModal/AgreeModal";
import ChoiceCounsel from "../ProductModal/ChoiceCounsel";
import ChatModal from "../ChatModal/ChatModal";
import GoalRegister from "./GoalRegister";

export interface ModalManagerType {
  // openModal: (modalName: string) => void;
  openModal: (modalName: string, productLink?: string) => void; // productLink 추가
  closeModal: () => void;
}

interface ModalManagerProps {
  setIsAgreed?: (value: boolean) => void;
  isAgreed?: boolean;
}

const ModalManager = forwardRef<ModalManagerType, ModalManagerProps>(
  ({ setIsAgreed, isAgreed = false }, ref) => {
    const [modalType, setModalType] = useState<string | null>(null);
    const [productLink, setProductLink] = useState<string | null>(null); // 링크 상태 추가

    const openModal = (type: string, productLink?: string) => {
      setModalType(type);
      if (productLink) {
        setProductLink(productLink);
      }
    };

    // 모달 닫기 함수
    const closeModal = () => {
      setModalType(null);
      setProductLink(null);
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
        {modalType === "상담선택" && (
          <ChoiceCounsel
            onClose={closeModal}
            openModal={openModal}
            productLink={productLink}
          />
        )}
        {modalType === "채팅모달" && <ChatModal onClose={closeModal} />}
        {modalType === "목표등록" && <GoalRegister onClose={closeModal} />}
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
