import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import nowlocation from "../images/modal_nowlocation.png";

interface KakaoMapProps {
  children: React.ReactNode; // Add children prop type
}

const KakaoMap: React.FC<KakaoMapProps> = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5663, // Default 하나은행 본점 위도
    lng: 126.9819, // Default 하나은행 본점 경도
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("사용자가 위치 정보 제공을 거부했습니다.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("위치 정보를 사용할 수 없습니다.");
              break;
            case error.TIMEOUT:
              console.error("위치 정보를 가져오는 시간이 초과되었습니다.");
              break;
            default:
              console.error("알 수 없는 오류가 발생했습니다.");
              break;
          }
        },
      );
    } else {
      console.log("이 브라우저에서는 Geolocation을 지원하지 않습니다.");
    }
  }, []);

  return (
    <Map
      center={{ lat: currentPosition.lat, lng: currentPosition.lng }}
      style={{ width: "100%", height: "100%" }}
      level={6}
    >
      <MapMarker
        position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
        image={{
          src: nowlocation, // 사용자 정의 이미지 URL
          size: {
            width: 42, // 이미지 너비
            height: 65, // 이미지 높이
          },
        }}
      ></MapMarker>
      {children} {/* Render children here */}
    </Map>
  );
};

export default KakaoMap;
