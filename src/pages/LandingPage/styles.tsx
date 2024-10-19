// 여기서는 이렇게 Landing Page에 대한 CSS 코드를 분리하시면 됩니다 !
// 화면 2분할하고 왼쪽에는 페이지코드, 오른쪽에는 CSS 코드를 띄워놓고 작업하시면 능률이 올라요

import styled from "styled-components"; //1. styled-component를 import 합니다.

export const Container = styled.div`
	//2. 어떤 컴포넌트에 대해 스타일을 선언할 때는 [export const 이름 = styled.div] 로 선언합니다.
	h1 {
		color: #333;
	}
`;

export const Button = styled.button`
	background-color: #4caf50;
	border: none;
	color: white;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #45a049;
	}
`;
