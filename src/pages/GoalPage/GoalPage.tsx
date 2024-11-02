import React, { useState, useMemo, useRef, ChangeEvent } from "react";
import * as styled from "./styles";
import setgoalpen from "../../images/set_goal_pen.png";
import setgoalmoney from "../../images/set_goal_money.png";
import setgoalcalendar from "../../images/set_goal_calendar.png";
import iconbeach from "../../images/goal_icon_beach.webp";
import iconbeer from "../../images/goal_icon_beer.png";
import iconcar from "../../images/goal_icon_car.png";
import iconcake from "../../images/goal_icon_cake.png";
import iconcoffee from "../../images/goal_icon_coffee.png";
import iconlobstar from "../../images/goal_icon_lobstar.png";
import iconanniversary from "../../images/goal_icon_anniversary.png";
import iconmoney from "../../images/goal_icon_money.webp";
import iconpet from "../../images/goal_icon_pet.png";
import iconshopping from "../../images/goal_icon_shopping.webp";
import iconticket from "../../images/goal_icon_ticket.webp";
import icontravel from "../../images/goal_icon_travel.png";

interface InputValues {
  name: string;
  amount: string;
  date: string;
  image: string | null;
  category: string;
  directCategory: string;
}

interface ImageUploadBoxProps {
  image: string | null;
  onImageClick: () => void;
  onCancelClick: () => void;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  image,
  onImageClick,
  onCancelClick,
}) => {
  return (
    <styled.ImageUploadBox onClick={image ? undefined : onImageClick}>
      {image ? (
        <styled.UploadedImageContainer>
          <styled.UploadedImage src={image} alt="업로드된 이미지" />
          <styled.CancelButton
            onClick={(e) => {
              e.stopPropagation();
              onCancelClick();
            }}
          >
            ✕
          </styled.CancelButton>
        </styled.UploadedImageContainer>
      ) : (
        <styled.ImagePlaceholder />
      )}
    </styled.ImageUploadBox>
  );
};

const GoalPage: React.FC = () => {
  const [values, setValues] = useState<InputValues>({
    name: "",
    amount: "",
    date: "",
    image: null,
    category: "",
    directCategory: "",
  });

  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const categories = ["예금", "적금", "펀드", "단순 저축", "여행", "소비"];

  const handleCategoryChange = (category: string) => {
    setValues((prev) => ({ ...prev, category }));
  };

  const handleDirectCategoryChange = (category: string) => {
    setValues((prev) => ({ ...prev, directCategory: category }));
  };

  const handleIconClick = (iconName: string) => {
    // 같은 아이콘을 다시 클릭하면 선택 취소
    if (selectedIcon === iconName) {
      setSelectedIcon("");
      console.log("아이콘 선택 취소");
      return;
    }

    // 이미지가 있으면 아이콘 선택 불가
    if (values.image) {
      console.log("이미지가 등록된 경우 아이콘을 선택할 수 없습니다.");
      return;
    }

    setSelectedIcon(iconName);
    console.log("Selected icon:", iconName);
  };

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
        // 이미지가 업로드되면 선택된 아이콘 취소
        setSelectedIcon("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    // 이미지 선택 시 기존 선택된 아이콘 취소
    setSelectedIcon("");
    fileInputRef.current?.click();
  };

  const handleCancelImage = () => {
    setValues((prev) => ({
      ...prev,
      image: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRegister = () => {
    console.log("=== 목표 등록 정보 ===");
    console.log("목표 이름:", values.name);
    console.log(
      "목표 금액:",
      values.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
    );
    console.log("목표 날짜:", values.date);

    // 이미지가 있으면 이미지 정보를, 없으면 선택된 아이콘 정보를 출력
    if (values.image) {
      console.log("등록된 이미지:", values.image);
    } else if (selectedIcon) {
      console.log("선택한 아이콘:", selectedIcon);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ""); // 콤마 제거
    if (!isNaN(Number(rawValue))) {
      setValues((prevValues) => ({
        ...prevValues,
        amount: rawValue, // 실제 값은 콤마 없이 저장
      }));
    }
  };

  const formattedAmount = useMemo(() => {
    // 콤마가 추가된 표시용 값
    return values.amount ? Number(values.amount).toLocaleString() : "";
  }, [values.amount]);

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
        <styled.ContainerHeader>금액으로 설정하기</styled.ContainerHeader>
        <styled.InputWrapper>
          <styled.InputContainer>
            <styled.SetGoalPen src={setgoalpen} alt="목표 이름 입력" />
            <styled.Input
              name="name"
              placeholder="이름을 입력해주세요."
              value={values.name}
              onChange={handleChange}
            />
          </styled.InputContainer>

          <styled.InputContainer>
            <styled.SetGoalMoney src={setgoalmoney} alt="목표 금액 입력" />
            <styled.Input
              name="amount"
              placeholder="목표 금액을 입력해주세요."
              value={formattedAmount}
              onChange={handleAmountChange}
              ref={amountInputRef}
              type="text"
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
          <styled.CategoryContainer>
            <styled.CategorySelect
              value={values.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={values.category ? "" : "placeholder"}
            >
              <option value="" disabled>
                종류
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </styled.CategorySelect>
          </styled.CategoryContainer>
        </styled.InputWrapper>
        <styled.SubText>
          {savingsMessage ||
            "위 칸을 채워주시면 하루에 얼마씩 돈을 모아야 할지 알려드려요!"}
        </styled.SubText>
        <styled.SelectIconText>
          <span>아래에서 원하는 아이콘을 선택해주세요.</span>
        </styled.SelectIconText>
        <styled.IconList>
          <styled.IconBackground
            onClick={() => handleIconClick("travel")}
            $isSelected={selectedIcon === "travel"}
            disabled={!!values.image}
          >
            <styled.Icons src={icontravel} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("anniversary")}
            $isSelected={selectedIcon === "anniversary"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconanniversary} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("shopping")}
            $isSelected={selectedIcon === "shopping"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconshopping} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("money")}
            $isSelected={selectedIcon === "money"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconmoney} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("beer")}
            $isSelected={selectedIcon === "beer"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconbeer} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("coffee")}
            $isSelected={selectedIcon === "coffee"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconcoffee} />
          </styled.IconBackground>
        </styled.IconList>
        <styled.IconList>
          <styled.IconBackground
            onClick={() => handleIconClick("car")}
            $isSelected={selectedIcon === "car"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconcar} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("ticket")}
            $isSelected={selectedIcon === "ticket"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconticket} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("cake")}
            $isSelected={selectedIcon === "cake"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconcake} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("lobstar")}
            $isSelected={selectedIcon === "lobstar"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconlobstar} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("beach")}
            $isSelected={selectedIcon === "beach"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconbeach} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("pet")}
            $isSelected={selectedIcon === "pet"}
            disabled={!!values.image}
          >
            <styled.Icons src={iconpet} />
          </styled.IconBackground>
        </styled.IconList>
        <styled.ContainerHeader style={{ marginTop: "41px" }}>
          <span>직접 등록하기</span>
        </styled.ContainerHeader>
        <styled.SelectIconText>
          <span>사고 싶은 물건을 직접 등록해보세요.</span>
        </styled.SelectIconText>
        <styled.RegisterDiv>
          <styled.RegisterContent>
            <styled.ImageUploadSection>
              <ImageUploadBox
                image={values.image}
                onImageClick={handleImageClick}
                onCancelClick={handleCancelImage}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
            </styled.ImageUploadSection>

            <styled.InputSection>
              <styled.InputGrid>
                <styled.InputColumn>
                  <styled.DirectInputContainer>
                    <styled.InputIcon src={setgoalpen} alt="이름 입력" />
                    <styled.RegisterInput
                      name="name"
                      placeholder="이름을 입력해주세요."
                      value={values.name}
                      onChange={handleChange}
                    />
                  </styled.DirectInputContainer>

                  <styled.DirectInputContainer>
                    <styled.InputIcon src={setgoalmoney} alt="금액 입력" />
                    <styled.RegisterInput
                      name="amount"
                      placeholder="가격을 입력해주세요."
                      value={values.amount}
                      onChange={handleChange}
                      type="number"
                      min="0"
                    />
                    <styled.UnitText>원</styled.UnitText>
                  </styled.DirectInputContainer>
                </styled.InputColumn>

                <styled.InputColumn>
                  <styled.DirectInputContainer>
                    <styled.InputIcon src={setgoalcalendar} alt="날짜 입력" />
                    <styled.RegisterInput
                      name="date"
                      placeholder="날짜 선택"
                      value={values.date}
                      onChange={handleChange}
                      type="date"
                      min={formatDate(new Date().toISOString())}
                    />
                  </styled.DirectInputContainer>

                  <styled.DirectInputContainer>
                    <styled.StyledSelect
                      onChange={(e) =>
                        handleDirectCategoryChange(e.target.value)
                      }
                      value={values.directCategory}
                      className={values.directCategory ? "" : "placeholder"}
                    >
                      <option value="" disabled>
                        종류
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </styled.StyledSelect>
                  </styled.DirectInputContainer>
                </styled.InputColumn>
              </styled.InputGrid>
            </styled.InputSection>
          </styled.RegisterContent>
        </styled.RegisterDiv>

        <styled.RegisterButton onClick={handleRegister}>
          등록하기
        </styled.RegisterButton>
      </styled.Container>
    </>
  );
};

export default GoalPage;
