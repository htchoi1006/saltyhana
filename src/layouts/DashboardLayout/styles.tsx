import styled from "styled-components";

interface MenuItemProps {
	active?: boolean;
}

export const HeaderWrapper = styled.div`
	height: 64px;
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 12px;
	border-bottom-color: rgba(5, 5, 5, 0.3);
	border-bottom-width: 1px;
	border-bottom-style: solid;
`;

export const BodyWrapper = styled.div`
	display: flex;
	height: 100%;
`;

export const StyledNav = styled.nav`
	width: 200px;
`;

export const HanaLogoDiv = styled.div`
	font-family: "Noto Sans KR";
	font-style: normal;
	font-weight: 700;
	font-size: 26px;
	line-height: 41px;
	margin-left: 10px;

	color: #000000;
`;

export const SidebarContainer = styled.div`
	width: 200px;
	height: 90vh;
	background-color: #ffffff;
	/* position: fixed; */
	left: 0;
	top: 64px;
	padding: 20px 0;
	border-right: solid 0.3px #e6eff5;
	display: flex;
	flex-direction: column;
`;

export const MenuItem = styled.div<MenuItemProps>`
	padding: 12px 20px;
	display: flex;
	align-items: center;
	gap: 12px;
	cursor: pointer;
	color: ${(props) => (props.active ? "#45857A" : "#666666")};
	background-color: ${(props) => (props.active ? "#F5F5F5" : "transparent")};
	transition: all 0.2s ease;
	cursor: pointer;
	font-family: "Noto Sans KR";
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	line-height: 26px;
	color: #008485;

	&:hover {
		background-color: #f5f5f5;
		color: #008485;
		cursor: pointer;
	}

	svg {
		width: 20px;
		height: 20px;
	}

	span {
		font-size: 15px;
	}
`;

export const Divider = styled.div`
	height: 1px;
	background-color: #eeeeee;
	margin: 10px 0;
`;

export const MenuSection = styled.div`
	flex: 1;
`;

export const SettingsSection = styled.div`
	/* margin-top: auto; */
	color: #b1b1b1;
	position: fixed;
	bottom: 10px;
`;

export const HomeIcon = styled.img`
	width: 20px;
	height: 20px;
`;

export const CalendarIcon = styled.img`
	width: 20px;
	height: 20px;
`;

export const GoalIcon = styled.img`
	width: 20px;
	height: 20px;
`;

export const AssetsIcon = styled.img`
	width: 20px;
	height: 20px;
`;

export const RecommendIcon = styled.img`
	width: 20px;
	height: 20px;
`;

export const ReservationIcon = styled.img`
	width: 20px;
	height: 20px;
`;

export const SettingIcon = styled.img`
	width: 20px;
	height: 20px;
`;

export const HanaLogo = styled.img`
	width: 45px;
	height: auto;
`;
