import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BackGround, Container, StyledParagraph, StyledLink } from "./styles";

const TestWaitingAdPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [videoEnded, setVideoEnded] = useState(false);
  const { type: consumptionType } = location.state || {};

  // 결과 확인
  const handleResultButtonClick = () => {
    // 상태 값이 있다면 바로 결과 페이지로 이동
    if (consumptionType) {
      navigate(`/result/consumption`, { state: { type: consumptionType } });
    }
    console.log(consumptionType);
  };

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
            onClick={handleResultButtonClick}
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
