import { useState, forwardRef, useImperativeHandle, ReactNode } from "react";
import Modals from "./Modals";
import AgreeModal from "../AgreeModal/AgreeModal";
import ChoiceCounsel from "../ProductModal/ChoiceCounsel";
import ChatModal from "../ChatModal/ChatModal";
import GoalRegister from "./GoalRegister";
import GoalAchieveCheck from "./GoalAchieveCheck";
import MyPageModify from "./MyPageModify";
import GoalDeleteCheck from "./GoalDeleteCheck";
import GoalFail from "./GoalFail";

export interface ModalManagerType {
  openModal: (modalName: string, productLink?: string) => void; // productLink 추가
  closeModal: () => void;
}

interface ModalManagerProps {
  setIsAgreed?: (value: boolean) => void;
  isAgreed?: boolean;
  onDeleteGoal?: (goalId: number) => void; // 삭제 핸들러 추가
  onConfirm?: () => void; //삭제 확인 핸들러
  onCancel?: () => void; //삭제 취소 핸들러
  state?: string;
  isGoalEdit?: boolean;
  isInfoEdit?: number;
}

const ModalManager = forwardRef<ModalManagerType, ModalManagerProps>(
  (
    {
      setIsAgreed,
      isAgreed = false,
      onCancel,
      onConfirm,
      state,
      isGoalEdit,
      isInfoEdit,
    },
    ref,
  ) => {
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
        {modalType === "목표수정등록" && (
          <GoalRegister isGoalEdit={isGoalEdit} onClose={closeModal} />
        )}
        {modalType === "목표관리실패" && (
          <GoalFail state={state} onClose={closeModal} />
        )}
        {modalType === "내정보" && (
          <MyPageModify isInfoEdit={isInfoEdit} onClose={closeModal} />
        )}
        {modalType === "이용약관" && (
          <AgreeModal
            onClose={closeModal}
            onAgreeAll={handleAgreeAll} // 동의 상태 업데이트
            isAgreed={isAgreed}
          />
        )}
        {modalType === "목표달성확인" && (
          <GoalAchieveCheck
            goal={{ name: "여행", achieved: true }}
            onClose={closeModal}
          />
        )}
        {modalType === "목표삭제확인" && (
          <GoalDeleteCheck onConfirm={onConfirm} onCancel={onCancel} />
        )}
      </>
    );
  },
);

export default ModalManager;
