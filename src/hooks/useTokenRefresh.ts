// hooks/useTokenRefresh.ts
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const useTokenRefresh = () => {
  const navigate = useNavigate();

  const refreshTokens = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const params = new URLSearchParams({
        refreshToken: refreshToken,
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/refresh?${params.toString()}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data: TokenResponse = await response.json();

      // 새로운 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // userInfo 업데이트
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      userInfo.accessToken = data.accessToken;
      userInfo.refreshToken = data.refreshToken;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      return true;
    } catch (error) {
      console.error("Token refresh error:", error);

      // 토큰 갱신 실패 시 로그아웃 처리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      navigate("/login");

      return false;
    }
  }, [navigate]);

  const setupTokenRefresh = useCallback(() => {
    // Access 토큰 만료 4분 30초 전에 갱신 (30초의 여유를 둠)
    const REFRESH_INTERVAL = 4.5 * 60 * 1000; // 4분 30초

    const intervalId = setInterval(async () => {
      const success = await refreshTokens();
      if (!success) {
        clearInterval(intervalId);
      }
    }, REFRESH_INTERVAL);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, [refreshTokens]);

  useEffect(() => {
    const cleanup = setupTokenRefresh();
    return cleanup;
  }, [setupTokenRefresh]);

  return { refreshTokens };
};
