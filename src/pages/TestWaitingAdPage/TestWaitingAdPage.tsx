import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackGround, Container, StyledParagraph, StyledLink } from "./styles";

const TestWaitingAdPage: React.FC = () => {
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);

  // 결과 확인 버튼 클릭 시 navigate 함수 호출
  const fetchTestResult = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/test/result`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "데이터 전송 중 문제가 발생하였습니다.";
        throw new Error(errorMessage);
      }

      const consumptionType = await response.json();
      console.log("서버 응답 데이터:", consumptionType); // 디버깅용

      navigate(`/result/consumption`, { state: { type: consumptionType } });
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  /*
  const handleResultButtonClick = async () => {
    try {
      const result = await fetchTestResult();
      navigate(`/result/consumption`, {state:{type: result}});
    } catch (error) {
      console.error(error);
    }
  };
*/
  useEffect(() => {
    const checkVideoEnd = () => {
      const iframe = document.getElementById("youtube-player");
      if (iframe) {
        const player = new (window as any).YT.Player(iframe, {
          events: {
            onStateChange: (event: any) => {
              if (event.data === (window as any).YT.PlayerState.ENDED) {
                setVideoEnded(true);
              }
            },
          },
        });
      }
    };

    const onYouTubeIframeAPIReady = () => {
      checkVideoEnd();
    };

    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onload = () => {
        (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      };
      document.body.appendChild(tag);
    } else {
      checkVideoEnd();
    }
  }, []);

  return (
    <BackGround>
      <Container>
        <StyledParagraph>광고가 끝난 후 버튼을 클릭하세요.</StyledParagraph>
        <iframe
          id="youtube-player"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/OGkqjiJESxI?enablejsapi=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {videoEnded && (
          <StyledLink
            as="button"
            onClick={fetchTestResult}
            to="#"
            type="button"
          >
            결과 확인
          </StyledLink>
        )}
      </Container>
    </BackGround>
  );
};

export default TestWaitingAdPage;
