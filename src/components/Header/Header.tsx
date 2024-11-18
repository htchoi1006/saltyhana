import { useLocation } from "react-router-dom";

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
  profileImage?: string; // 사용자 이미지 정보 추가
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
              {/* 변경된 부분 */}
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
                  src={user.profileImage || defaultProfile} // 등록된 이미지가 없으면 디폴트 이미지 사용
                  alt="프로필 이미지"
                />
                <WelcomeSpan>{user.id}님 환영합니다</WelcomeSpan>
              </HeaderLink>
            </>
          )}
        </div>
      </HeaderBox>
    </FixedHeader>
  );
}
