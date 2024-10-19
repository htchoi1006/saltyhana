import React from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "./styles"; //1. 일반 페이지에서는 항상 코드 상단에 이 import 문을 붙여넣어주세요.

const LandingPage: React.FC = () => {
	const navigate = useNavigate();

	//라우팅은 이렇게 하시면 돼요
	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleSignupClick = () => {
		navigate("/signup");
	};

	return (
		//2. styles 파일에서 지정한 CSS를 사용하려면 컴포넌트 이름 앞에 [styles.] 를 적어주시면 됩니다!
		<styled.Container>
			<h1>랜딩페이지</h1>
			<p>환영합니다!</p>
			<styled.Button onClick={handleLoginClick}>
				<span>로그인 페이지</span>
			</styled.Button>
			<styled.Button onClick={handleSignupClick}>
				<span>회원가입 페이지</span>
			</styled.Button>
		</styled.Container>
	);
};

export default LandingPage;
