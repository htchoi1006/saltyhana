import React from "react";
import styled from "styled-components";

const Container = styled.div`
	h1 {
		color: #444;
	}
`;

const LoginPage: React.FC = () => {
	return (
		<Container>
			<h1>로그인 페이지</h1>
			<p>로그인 페이지 입니다 </p>
		</Container>
	);
};

export default LoginPage;
