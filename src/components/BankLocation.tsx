import React, { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import KakaoMap from "./KakaoMap";
import { MarkerText } from "./Modals/styles";
import LocationMarker from "../../src/images/modal_location.png";

export interface Bank {
  name: string; // 지점 이름
  lat: number; // 위도
  lng: number; // 경도
  distance: number; // 거리
}

interface BankLocationProps {
  onSelectBank: (bank: Bank) => void; // 선택된 은행을 부모로 전달하는 함수
}

const BankLocation: React.FC<BankLocationProps> = ({ onSelectBank }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5663,
    lng: 126.9819,
  });
  const [nearbyBanks, setNearbyBanks] = useState<Bank[]>([]); // 근처 은행 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          searchNearbyBanks(latitude, longitude); // 위치 업데이트 후 은행 검색
        },
        (error) => {
          console.error("위치 정보를 가져오는 데 실패했습니다.", error);
          setLoading(false);
        },
      );
    } else {
      console.log("이 브라우저에서는 Geolocation을 지원하지 않습니다.");
      setLoading(false);
    }
  }, []);

  const searchNearbyBanks = (lat: number, lng: number) => {
    const places = new window.kakao.maps.services.Places();
    const position = new window.kakao.maps.LatLng(lat, lng);

    places.keywordSearch(
      "하나은행",
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const results: Bank[] = data
            .filter((place) => place.place_name.endsWith("지점")) // '지점'으로 끝나는 곳만 필터링
            .map((place) => {
              const distance = getDistance(
                lat,
                lng,
                parseFloat(place.y),
                parseFloat(place.x),
              );
              return {
                name: place.place_name,
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
                distance: distance,
              };
            });

          const nearby = results.filter((bank) => bank.distance <= 2); // 2km 이내의 은행만 필터링
          setNearbyBanks(nearby); // 근처 은행 목록 업데이트
        } else {
          console.error("검색 결과가 없습니다.", status);
        }
        setLoading(false); // 검색 완료 후 로딩 종료
      },
      { location: position, radius: 2000 },
    );
  };

  const getDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    const R = 6371; // 지구의 반지름 (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // km
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {loading ? (
        <div>Loading...</div> // 로딩 표시
      ) : (
        <KakaoMap>
          {nearbyBanks.map((bank) => (
            <MapMarker
              key={bank.name}
              position={{ lat: bank.lat, lng: bank.lng }}
              onClick={() => {
                onSelectBank(bank); // 선택된 은행을 부모로 전달
              }}
              image={{
                src: LocationMarker, // 사용자 정의 이미지 URL
                size: {
                  width: 40, // 이미지 너비
                  height: 40, // 이미지 높이
                },
              }}
            >
              <MarkerText>
                {bank.name}
                <br />
                {bank.distance.toFixed(2)} km
              </MarkerText>
            </MapMarker>
          ))}
        </KakaoMap>
      )}
    </div>
  );
};

export default BankLocation;
