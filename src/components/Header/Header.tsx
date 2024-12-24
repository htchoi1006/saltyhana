import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FixedHeader,
  HeaderBox,
  HanaLogo,
  HanaLogoDiv,
  HeaderLink,
  StyledHeaderLink,
  WelcomeSpan,
  ProfileImage,
} from "./styles";
import pig from "../../images/landing_piggy.png";
import defaultProfile from "../../images/default_profile.png"; // 디폴트 프로필 이미지 경로
import useLocalStorage from "../../hooks/useLocalStorage";

interface IUserInfo {
  id: string;
  password: string;
  isLoggedIn: boolean;
  profileImage: string; // 사용자 이미지 정보 추가
}

interface UserData {
  email: string;
  identifier: string;
  name: string;
  birth: string;
  profileImg: string | null;
}

const initInfo: IUserInfo = {
  id: "",
  password: "",
  isLoggedIn: false,
  profileImage: "", // 기본값으로 빈 문자열
};

export default function Header() {
  const location = useLocation();
  const [user, setUser] = useLocalStorage<IUserInfo>("userInfo", initInfo);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          return;
        }

        const response = await fetch("http://localhost:9090/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data: UserData = await response.json();
        setUserName(data.name);

        setUser((prev) => ({
          ...prev,
          profileImage: data.profileImg || "",
        }));
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [setUser]);

  const pathName = location.pathname;

  return (
    <FixedHeader>
      <HeaderBox>
        <div style={{ display: "flex", flex: 1 }}>
          <HeaderLink to="/">
            <HanaLogo src={pig} />
            <HanaLogoDiv>하나 리치</HanaLogoDiv>
          </HeaderLink>
        </div>
        <div style={{ flex: "none", display: "flex", gap: "5px" }}>
          {pathName === "/" ? (
            <>
              <StyledHeaderLink to="/login">로그인</StyledHeaderLink>
              <StyledHeaderLink to="/signup">회원가입</StyledHeaderLink>
            </>
          ) : (
            <>
              <HeaderLink
                to="/mypage"
                style={{
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <ProfileImage
                  src={user.profileImage || defaultProfile}
                  alt="프로필 이미지"
                />
                <WelcomeSpan>{userName}님 환영합니다</WelcomeSpan>
              </HeaderLink>
            </>
          )}
        </div>
      </HeaderBox>
    </FixedHeader>
  );
}
