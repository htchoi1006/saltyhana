import styled from "styled-components";

export const Container = styled.div`
	background-color: #f5f7fa;
	font-family: "Noto Sans KR";
`;

export const CalendarContainer = styled.div`
	padding: 2rem;
	background: white;
	border-radius: 0.5rem;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	width: fit-content;
`;

export const CalendarHeader = styled.div`
	/* margin-bottom: 2rem; */
`;

// export const Title = styled.h2`
// 	font-size: 2rem;
// 	font-weight: 600;
// 	color: #374151;
// `;

export const WeekDayContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 185px);
	margin-bottom: 0.5rem;
`;

export const WeekDay = styled.div`
	text-align: center;
	font-size: 1rem;
	padding: 0.5rem;
	height: 20px; /* 높이 줄임 */
	display: flex;
	align-items: center;
	justify-content: center;
	color: #374151;
	font-weight: 500;
`;

export const CalendarGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 185px);
	gap: 1px;
	background-color: #e5e7eb;
	border: 1px solid #e5e7eb;
`;

export const IconWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const ScheduleBar = styled.div<{
	category: "deadline" | "goal" | "work";
}>`
	position: absolute;
	bottom: 0.75rem;
	left: 0.75rem;
	right: 0.75rem;
	height: 0.25rem;
	border-radius: 0.125rem;

	${({ category }) => {
		switch (category) {
			case "deadline":
				return "background-color: #3B82F6;";
			case "goal":
				return "background-color: #F59E0B;";
			case "work":
				return "background-color: #10B981;";
			default:
				return "";
		}
	}}
`;

export const Legend = styled.div`
	display: flex;
	gap: 1.5rem;
	justify-content: flex-end;
	margin-top: 1.5rem;
`;

export const LegendItem = styled.div`
	display: flex;
	align-items: center;

	span {
		font-size: 1rem;
		color: #4b5563;
	}
`;

export const LegendDot = styled.div<{ color: string }>`
	width: 0.75rem;
	height: 0.75rem;
	border-radius: 50%;
	background-color: ${({ color }) => color};
	margin-right: 0.5rem;
`;

export const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	font-weight: 600;
	color: #374151;
`;

export const NavigationButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #374151;
	border-radius: 0.375rem;

	&:hover {
		background-color: #f3f4f6;
	}

	&:focus {
		outline: none;
		ring: 2px;
		ring-offset: 2px;
		ring-color: #3b82f6;
	}
`;

export const MonthDisplay = styled.span`
	margin: 0 1rem;
	min-width: 200px;
	text-align: center;
`;

export const DateCell = styled.div<{ isEmpty: boolean; isToday?: boolean }>`
	position: relative;
	height: 130px;
	background-color: white;
	padding: 0.75rem;
	font-size: 1rem;
	font-family: "Noto Sans KR";
	font-style: normal;
	font-weight: 700;
	/* font-size: 45px; */

	color: #585757;

	span {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		color: #374151;
		${({ isToday }) =>
			isToday &&
			`
      background-color: #3B82F6;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
    `}
	}

	${({ isEmpty }) =>
		!isEmpty &&
		`
    &:hover {
      background-color: #F9FAFB;
    }
  `}
`;
