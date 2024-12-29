import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Wrapper,
  LeftSection,
  Title,
  Description,
  ResultButton,
  RightSection,
  VideoWrapper,
} from "./styles";

const TestWaitingAdPage: React.FC = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { type: consumptionType } = location.state || {};

  const handleResultButtonClick = () => {
    if (consumptionType) {
      navigate(`/result/consumption`, { state: { type: consumptionType } });
    }
  };

  useEffect(() => {
    const initializeYouTubePlayer = () => {
      const iframe = document.getElementById("youtube-player");
      if (iframe) {
        const player = new (window as any).YT.Player(iframe, {
          events: {
            onReady: (event: any) => {
              // 동영상 자동 재생
              event.target.mute(); // 무음으로 설정
              event.target.playVideo(); // 자동 재생
            },
            onStateChange: (event: any) => {
              if (event.data === (window as any).YT.PlayerState.ENDED) {
                setVideoEnded(true); // 동영상이 끝날 때 버튼 표시
              }
            },
          },
        });
      }
    };

    const onYouTubeIframeAPIReady = () => {
      initializeYouTubePlayer();
    };

    // YouTube IFrame API 스크립트 로드
    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onload = () => {
        (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      };
      document.body.appendChild(tag);
    } else {
      initializeYouTubePlayer();
    }
  }, []);

  return (
    <Wrapper>
      <LeftSection>
        <Title>
          소비성향 분석 중
          <span
            style={{
              display: "inline-block",
              marginLeft: "10px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            <LoadingDots />
          </span>
        </Title>
        <Description>
          분석 결과가 곧 표시됩니다. 잠시만 기다려 주세요!
        </Description>
      </LeftSection>
      <RightSection>
        <VideoWrapper>
          <iframe
            id="youtube-player"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/OGkqjiJESxI?enablejsapi=1&autoplay=1&mute=1&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        {videoEnded && (
          <ResultButton onClick={handleResultButtonClick}>
            결과 확인
          </ResultButton>
        )}
      </RightSection>
    </Wrapper>
  );
};

const LoadingDots = () => (
  <span>
    <span className="dot" style={{ animationDelay: "0s" }}>
      .
    </span>
    <span className="dot" style={{ animationDelay: "0.2s" }}>
      .
    </span>
    <span className="dot" style={{ animationDelay: "0.4s" }}>
      .
    </span>
    <style>
      {`
      .dot {
        font-size: 24px;
        animation: blink 1.2s infinite;
      }
      @keyframes blink {
        50% {
          opacity: 0;
        }
      }
      `}
    </style>
  </span>
);

export default TestWaitingAdPage;
