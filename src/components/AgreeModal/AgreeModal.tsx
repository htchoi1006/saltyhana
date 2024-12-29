import React, { useState, useEffect, useRef } from "react";
import * as styled from "./AgreeModalStyles";
import ModalsBackground from "../Modals/ModalsBackground";

interface AgreeModalProps {
  onClose: () => void;
  onAgreeAll: () => void; // 약관 모두 동의 시 호출되는 함수
  isAgreed: boolean;
}

const AgreeModal: React.FC<AgreeModalProps> = ({
  onClose,
  onAgreeAll,
  isAgreed,
}) => {
  const [isChecked1, setIsChecked1] = useState(false); // 필수 약관 1
  const [isChecked2, setIsChecked2] = useState(false); // 필수 약관 2
  const [isChecked3, setIsChecked3] = useState(false); // 선택 약관
  const [isAllChecked, setIsAllChecked] = useState(false); // 전체 동의
  const [showWarning, setShowWarning] = useState(false); // 필수 약관 미체크 시 경고 메시지
  const modalContentRef = useRef<HTMLDivElement | null>(null); // 모달 콘텐츠 영역을 참조하는 ref

  // 부모의 체크박스가 클릭된 채 모달을 열면 체크박스 선택 되어있게
  useEffect(() => {
    setIsChecked1(isAgreed);
    setIsChecked2(isAgreed);
    setIsChecked3(isAgreed);
    setIsAllChecked(isAgreed);
  }, [isAgreed]);

  // 필수 약관이 모두 체크되었는지 확인
  useEffect(() => {
    if (isChecked1 && isChecked2 && isChecked3) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [isChecked1, isChecked2, isChecked3]);

  const handleAllChecked = () => {
    const newValue = !isAllChecked;
    setIsAllChecked(newValue);
    setIsChecked1(newValue);
    setIsChecked2(newValue);
    setIsChecked3(newValue); // 선택 약관도 함께 적용

    // "약관 전체 동의" 클릭 시 스크롤을 모달 내용 부분으로 이동
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    if (!isChecked1 || !isChecked2) {
      alert("필수 약관을 모두 체크해 주세요.");
    } else {
      onAgreeAll(); // 모든 약관 동의 시 호출
      onClose(); // 모달 닫기
    }
  };

  return (
    <ModalsBackground onClose={onClose}>
      <styled.CloseButton onClick={onClose} title="닫기">
        ✖
      </styled.CloseButton>

      <styled.ModalContainer ref={modalContentRef}>
        <styled.ModalTitle>서비스 이용 동의</styled.ModalTitle>

        {/* 전체 약관 동의 */}
        <styled.RoundCheckboxWrapper>
          <input
            type="checkbox"
            id="allCheckbox"
            checked={isAllChecked}
            onChange={handleAllChecked}
          />
          <label htmlFor="allCheckbox">약관 전체 동의</label>
        </styled.RoundCheckboxWrapper>

        <styled.RoundCheckboxWrapper>
          <input
            type="checkbox"
            id="checkbox1"
            checked={isChecked1}
            onChange={() => setIsChecked1(!isChecked1)}
          />
          <label htmlFor="checkbox1">(필수) 거래 관계의 설정 및 관리</label>
        </styled.RoundCheckboxWrapper>

        <styled.DetailContent>
          <p>
            (금융)거래와 관련하여 신용정보회사 또는 신용정보집중기관에 대한
            개인신용정보의 조회, (금융)거래 관계의 설정 여부의 판단, (금융)거래
            관계의 설정·유지·이행·관리, 금융사고 조사, 분쟁 해결, 민원 처리 및
            법령상 의무이행을 위한 목적으로 개인정보를 처리합니다.
          </p>
          <p>
            (금융)거래라 함은 은행업무(여신, 수신, 내·외국환), 겸영업무(펀드,
            신탁, 파생상품, 방카슈랑스, 신용카드, 마이데이터 서비스 등) 및
            부수업무(팩토링, 보호예수, 수납 및 지급대행, 대여금고, 상품권 등
            판매대행 등)와 이와 관련된 거래를 의미합니다.
          </p>
        </styled.DetailContent>

        {/* 개인(신용)정보 필수동의 */}
        <styled.RoundCheckboxWrapper>
          <input
            type="checkbox"
            id="checkbox2"
            checked={isChecked2}
            onChange={() => setIsChecked2(!isChecked2)}
          />
          <label htmlFor="checkbox2">(필수) 회원 가입 및 관리</label>
        </styled.RoundCheckboxWrapper>
        <styled.DetailContent>
          <p>
            회원가입, 회원제 서비스 이용, 제한적 본인 확인제에 따른 본인확인,
            개인식별, 부정이용방지, 비인가 사용방지, 가입의사 확인, 만14세 미만
            아동 개인정보 수집 시 법정대리인 동의여부 확인, 추후 법정 대리인
            본인확인, 사고조사, 분쟁해결, 민원처리 및 고지사항 전달 등의
            목적으로 개인정보를 처리합니다.
          </p>
        </styled.DetailContent>

        {/* 마케팅 정보 알림 선택동의 */}
        <styled.RoundCheckboxWrapper>
          <input
            type="checkbox"
            id="checkbox3"
            checked={isChecked3}
            onChange={() => setIsChecked3(!isChecked3)}
          />
          <label htmlFor="checkbox3">
            (선택) 상품 및 서비스 홍보 및 이용 권유
          </label>
        </styled.RoundCheckboxWrapper>
        <styled.DetailContent>
          <p>
            고객 만족도 조사를 통한 신규 서비스 개발 및 맞춤 서비스 제공,
            인구통계학적 특성에 따른 서비스 제공 및 광고의 게재, 서비스의 유효성
            확인, 경품지급, 사은행사 등 고객의 편의 및 참여기회 제공, 접속빈도
            파악, 고객의 서비스이용에 대한 통계작성의 목적으로 개인정보를
            처리합니다.
          </p>
        </styled.DetailContent>

        {/* 필수 약관 미체크 시 경고 메시지 */}
        {showWarning && (
          <styled.WarningMessage>
            필수 약관을 모두 체크해 주세요.
          </styled.WarningMessage>
        )}

        <styled.ModalButton onClick={handleSubmit}>확인</styled.ModalButton>
      </styled.ModalContainer>
    </ModalsBackground>
  );
};

export default AgreeModal;
