import React, { useState, useEffect, useRef } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import LocationMarker from "../../images/modal_location.png";
import CustomOverlay from "./CustomOverlay";
import KakaoMap from "./KakaoMap";

export interface Bank {
  name: string; // 지점 이름
  lat: number; // 위도
  lng: number; // 경도
  distance: number; // 거리
  address: string;
  number: string; //전화번호
}

const MAX_DISTANCE_KM = 5; // 상수로 변경 (5km)
const SEARCH_RADIUS_M = 5000; // 검색 반경 5000m

interface BankLocationProps {
  onSelectBank: (bank: Bank) => void; // 선택된 은행을 부모로 전달하는 함수
}

const BankLocation: React.FC<BankLocationProps> = ({ onSelectBank }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5663,
    lng: 126.9819,
  });
  const [nearbyBanks, setNearbyBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 커스텀 오버레이 상태
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const kakaoMapRef = useRef<{
    setCenter: (lat: number, lng: number) => void;
  } | null>(null);
  // 위치 업데이트
  const handleUpdatePosition = (position: { lat: number; lng: number }) => {
    setCurrentPosition(position);
    searchNearbyBanks(position.lat, position.lng); // 위치가 업데이트되면 은행 검색
  };

  // 근처 은행 검색
  useEffect(() => {
    searchNearbyBanks(currentPosition.lat, currentPosition.lng);
  }, [currentPosition]);

  const searchNearbyBanks = (lat: number, lng: number) => {
    const places = new window.kakao.maps.services.Places();
    const position = new window.kakao.maps.LatLng(lat, lng);

    setError(null); // 에러 초기화

    places.keywordSearch(
      "하나은행",
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const results: Bank[] = data
            .filter((place) => place.place_name.endsWith("지점"))
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
                address: place.address_name || "",
                number: place.phone,
              };
            });

          const nearby = results.filter(
            (bank) => bank.distance <= MAX_DISTANCE_KM,
          ); // 상수로 거리 필터링
          setNearbyBanks(nearby);
        } else {
          setError("검색 결과가 없습니다.");
        }
        setLoading(false); // 로딩 종료
      },
      { location: position, radius: SEARCH_RADIUS_M },
    );
  };

  // 거리 계산
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

  // 마커 클릭 핸들러
  const handleMarkerClick = (bank: Bank) => {
    setSelectedBank(bank); // 선택된 은행을 상태에 저장
    onSelectBank(bank); // 선택된 은행을 부모로 전달

    if (kakaoMapRef.current) {
      kakaoMapRef.current.setCenter(bank.lat, bank.lng);
    }
  };

  return (
    <KakaoMap ref={kakaoMapRef} onUpdatePosition={handleUpdatePosition}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        nearbyBanks.map((bank) => (
          <MapMarker
            key={bank.name}
            position={{ lat: bank.lat, lng: bank.lng }}
            onClick={() => handleMarkerClick(bank)}
            image={{
              src: LocationMarker,
              size: {
                width: 31,
                height: 38,
              },
            }}
          />
        ))
      )}
      {selectedBank && (
        <CustomOverlay
          bank={selectedBank}
          position={{ lat: selectedBank.lat, lng: selectedBank.lng }} // 오버레이 위치 설정
          onClose={() => setSelectedBank(null)}
        />
      )}
    </KakaoMap>
  );
};

export default BankLocation;
