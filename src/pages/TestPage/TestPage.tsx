import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stepper from "../../components/Stepper/Stepper";
import { HeaderOffset } from "../../components/Header/styles";
import { SelectionWrapper, Question, BeforeQuestion } from "./styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface Question {
  question: string;
  answers: QuestionContent[];
}

interface QuestionContent {
  body: string;
  seqNum: number;
}

const TestPage: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 질문 번호
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(null)); // 질문별 점수 상태
  const [questions, setQuestions] = useState<Question | null>(null);

  const fetchConsumptionTestData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/test/${currentQuestionIndex + 1}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        // 서버에서 보낸 에러 메시지를 파싱
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "데이터를 불러오는 중 문제가 발생하였습니다.";
        throw new Error(errorMessage);
      }

      const questionData = await response.json();

      return questionData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("데이터를 불러오는 중 문제가 발생하였습니다.");
    }
  };

  const sendTestResult = async () => {
    try {
      const testResult = answers.map((answer, index) => ({
        questionNum: index + 1, // index + 1
        answerNum: answer ?? 0, // 값이 null이면 0으로 대체
      }));

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/test/result`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testResult),
        },
      );

      if (!response.ok) {
        // 서버에서 보낸 에러 메시지를 파싱
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "데이터 전송 중 문제가 발생하였습니다.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("데이터를 전송 중 문제가 발생하였습니다.");
    }
  };

  const fetchTestResult = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/test/result`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        // 서버에서 보낸 에러 메시지를 파싱
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "데이터 전송 중 문제가 발생하였습니다.";
        throw new Error(errorMessage);
      }

      const consumptionType = await response.json();

      return consumptionType;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("데이터를 전송 중 문제가 발생하였습니다.");
    }
  };

  const fetchRecommendedProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/recommend`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
        throw new Error("추천 상품을 불러오는데 문제가 발생하였습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("추천 상품을 불러오는데 문제가 발생하였습니다.");
    }
  };

  const handleSelectionClick = async (points: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = points;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex === 9) {
      try {
        // 테스트 결과 전송
        await sendTestResult();

        // 추가 API 호출 (추천 상품)
        fetchRecommendedProducts();

        // 결과 타입 가져오기
        const consumptionType = await fetchTestResult();

        // /ad로 이동하면서 추천 상품 데이터와 소비성향 데이터를 상태로 전달
        navigate(`/ad`, {
          state: {
            type: consumptionType,
          },
        });
      } catch (error) {
        console.error("데이터 처리 중 오류 발생:", error);
        alert("테스트 결과를 처리하는 중 문제가 발생했습니다.");
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 이전 질문으로 돌아갈 때 점수 처리
  const handleBeforeClick = () => {
    if (currentQuestionIndex === 0) {
      navigate("/teststart");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const questionData = await fetchConsumptionTestData();

      if (questionData != null) {
        setQuestions(questionData);
      }
    };

    fetchData();
  }, [currentQuestionIndex]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: "none" }}>
        <HeaderOffset></HeaderOffset>
        <div style={{ padding: "65px 80px" }}>
          <Stepper curCount={currentQuestionIndex} maxCount={10} />
        </div>
      </div>
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {questions ? (
          <>
            <Question>
              <h1>Q{currentQuestionIndex + 1}</h1>
              <p>{questions.question}</p>
            </Question>
            <SelectionWrapper>
              {questions.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectionClick(answer.seqNum)}
                >
                  <span>{answer.body}</span>
                </button>
              ))}
            </SelectionWrapper>
          </>
        ) : (
          <LoadingSpinner />
        )}
        <BeforeQuestion onClick={handleBeforeClick} />
      </div>
    </div>
  );
};

export default TestPage;
