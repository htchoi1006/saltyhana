import React, { useState, useMemo, useRef, ChangeEvent } from "react";
import * as styled from "./styles";
import setgoalpen from "../../images/set_goal_pen.png";
import setgoalmoney from "../../images/set_goal_money.png";
import setgoalcalendar from "../../images/set_goal_calendar.png";
import iconbeef from "../../images/goal_icon_beef.png";
import iconbeer from "../../images/goal_icon_beer.png";
import iconcar from "../../images/goal_icon_car.png";
import iconcoin from "../../images/goal_icon_coin.png";
import iconcart from "../../images/goal_icon_cart.png";
import iconclothes from "../../images/goal_icon_clothes.png";
import iconcoffee from "../../images/goal_icon_coffee.png";
import icongift from "../../images/goal_icon_gift.png";
import iconhouse from "../../images/goal_icon_house.png";
import iconmoney from "../../images/goal_icon_money.png";
import icontravel from "../../images/goal_icon_travel.png";
import icontv from "../../images/goal_icon_tv.png";

interface InputValues {
	name: string;
	amount: string;
	date: string;
	image: string | null;
}

const GoalPage: React.FC = () => {
	const [values, setValues] = useState<InputValues>({
		name: "",
		amount: "",
		date: "",
		image: null,
	});

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setValues((prev) => ({
					...prev,
					image: reader.result as string,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const savingsMessage = useMemo(() => {
		// 아무 값도 입력되지 않은 경우의 기본 메시지
		if (!values.amount && !values.date) {
			return "위 칸을 채워주시면 하루에 얼마씩 돈을 모아야 할지 알려드려요!";
		}

		if (!values.amount || !values.date) return "";

		const targetAmount = parseInt(values.amount);
		if (isNaN(targetAmount) || targetAmount <= 0) return "";

		const today = new Date();
		const targetDate = new Date(values.date);

		// 날짜가 과거인 경우 체크
		if (targetDate <= today) return "목표 날짜는 오늘 이후로 설정해주세요.";

		// 남은 일수 계산 (당일 포함)
		const diffTime = targetDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		// 하루 저축 금액 계산
		const dailyAmount = Math.ceil(targetAmount / diffDays);

		// 금액 포맷팅 (만원 단위로 변환)
		const formatAmount = (amount: number) => {
			if (amount >= 10000) {
				const man = Math.floor(amount / 10000);
				const remainder = amount % 10000;
				if (remainder === 0) {
					return `${man}만`;
				}
				return `${man}만 ${remainder.toLocaleString()}`;
			}
			return amount.toLocaleString();
		};

		return `하루에 ${formatAmount(dailyAmount)}원씩 ${diffDays}일 동안 저축을 도와드릴게요!`;
	}, [values.amount, values.date]);

	return (
		<>
			<styled.Container>
				<styled.ContainerHeader>
					금액으로 설정하기
				</styled.ContainerHeader>
				<styled.InputWrapper>
					<styled.InputContainer>
						<styled.SetGoalPen
							src={setgoalpen}
							alt="목표 이름 입력"
						/>
						<styled.Input
							name="name"
							placeholder="이름을 입력해주세요."
							value={values.name}
							onChange={handleChange}
						/>
					</styled.InputContainer>

					<styled.InputContainer>
						<styled.SetGoalMoney
							src={setgoalmoney}
							alt="목표 금액 입력"
						/>
						<styled.Input
							name="amount"
							placeholder="목표 금액을 입력해주세요."
							value={values.amount}
							onChange={handleChange}
							type="number"
							min="0"
						/>
						<styled.UnitText>원</styled.UnitText>
					</styled.InputContainer>

					<styled.InputContainer>
						<styled.SetGoalCalendar
							src={setgoalcalendar}
							alt="목표 날짜 입력"
						/>
						<styled.Input
							name="date"
							placeholder="날짜 선택"
							value={values.date}
							onChange={handleChange}
							type="date"
							min={formatDate(new Date().toISOString())}
						/>
					</styled.InputContainer>
				</styled.InputWrapper>
				<styled.SubText>
					{savingsMessage ||
						"위 칸을 채워주시면 하루에 얼마씩 돈을 모아야 할지 알려드려요!"}
				</styled.SubText>
				<styled.SelectIconText>
					<span>아래에서 원하는 아이콘을 선택해주세요.</span>
				</styled.SelectIconText>
				<styled.IconList>
					<styled.IconBackground>
						<styled.Icons src={icontravel} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconhouse} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconbeef} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconclothes} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconbeer} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconcar} />
					</styled.IconBackground>
				</styled.IconList>
				<styled.IconList>
					<styled.IconBackground>
						<styled.Icons src={icongift} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconmoney} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconcart} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconcoin} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={iconcoffee} />
					</styled.IconBackground>
					<styled.IconBackground>
						<styled.Icons src={icontv} />
					</styled.IconBackground>
				</styled.IconList>
				<styled.ContainerHeader style={{ marginTop: "41px" }}>
					<span>직접 등록하기</span>
				</styled.ContainerHeader>
				<styled.SelectIconText>
					<span>사고 싶은 물건을 직접 등록해보세요.</span>
				</styled.SelectIconText>
				{/* ----------------------------------------------------- */}
				<styled.RegisterDiv>
					<styled.RegisterContent>
						<styled.ImageUploadSection>
							<styled.ImageUploadBox onClick={handleImageClick}>
								{values.image ? (
									<styled.UploadedImage
										src={values.image}
										alt="업로드된 이미지"
									/>
								) : (
									<styled.ImagePlaceholder />
								)}
							</styled.ImageUploadBox>
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleImageUpload}
								accept="image/*"
								style={{ display: "none" }}
							/>
						</styled.ImageUploadSection>

						<styled.InputSection>
							<styled.InputContainer>
								<styled.InputIcon
									src={setgoalpen}
									alt="이름 입력"
								/>
								<styled.RegisterInput
									name="name"
									placeholder="이름을 입력해주세요."
									value={values.name}
									onChange={handleChange}
								/>
							</styled.InputContainer>

							<styled.InputContainer>
								<styled.InputIcon
									src={setgoalmoney}
									alt="금액 입력"
								/>
								<styled.Input
									name="amount"
									placeholder="가격을 입력해주세요."
									value={values.amount}
									onChange={handleChange}
									type="number"
									min="0"
								/>
								<styled.UnitText>원</styled.UnitText>
							</styled.InputContainer>

							<styled.InputContainer>
								<styled.InputIcon
									src={setgoalcalendar}
									alt="날짜 입력"
								/>
								<styled.Input
									name="date"
									placeholder="날짜 선택"
									value={values.date}
									onChange={handleChange}
									type="date"
									min={formatDate(new Date().toISOString())}
								/>
							</styled.InputContainer>
						</styled.InputSection>
					</styled.RegisterContent>
					{/* <styled.RegisterButton>
						<span>등록하기</span>
					</styled.RegisterButton> */}
				</styled.RegisterDiv>
			</styled.Container>
		</>
	);
};

export default GoalPage;
