import React, {
  useState,
  useMemo,
  useRef,
  ChangeEvent,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import ModalManager, {
  ModalManagerType,
} from "../../components/Modals/ModalManager";
import { commonIcons, goalIcons } from "./styles";
import AnimatedSavingContainer from "../../components/AnimatedSavingContainer/AnimatedSavingContainer";
import * as styled from "./styles";

interface InputValues {
  name: string;
  amount: string;
  startDate: string;
  endDate: string;
  image: string | null;
  category: string;
  directCategory: string;
  accountId: string;
}

interface Account {
  id: number;
  accountAlias: string;
  accountNumber: string;
  accountNickname: string;
  main: boolean;
}

interface GoalRequest {
  goalName: string;
  goalMoney: number;
  startDate: string;
  endDate: string;
  goalType: number;
  iconId: number;
  goalImg: string | null;
  connectedAccount: number;
}

interface ImageUploadBoxProps {
  image: string | null;
  onImageClick: () => void;
  onCancelClick: () => void;
}

const categoryToNumber: Record<string, number> = {
  예금: 1,
  적금: 2,
  펀드: 3,
  "단순 저축": 4,
  여행: 5,
  소비: 6,
};

const iconToNumber: Record<string, number> = {
  travel: 11,
  anniversary: 12,
  shopping: 13,
  money: 14,
  beer: 15,
  coffee: 16,
  car: 17,
  ticket: 18,
  cake: 19,
  lobstar: 20,
  beach: 21,
  pet: 22,
  party: 23,
  cruise: 24,
  amusementpark: 25,
  christmas: 26,
  phone: 27,
};

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

export default function GoalPage() {
  const [values, setValues] = useState<InputValues>({
    name: "",
    amount: "",
    startDate: "", // 목표 시작 날짜
    endDate: "", // 목표 완료 날짜
    image: null,
    category: "",
    directCategory: "",
    accountId: "",
  });

  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/accounts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }

        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  // useLocation 사용, 다른 페이지 전달 값 받기
  const location = useLocation();

  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const categories = ["예금", "적금", "펀드", "단순 저축", "여행", "소비"];
  const modalManagerRef = useRef<ModalManagerType>(null);
  // 캘린더 페이지에서 전달된 state에서 날짜 값 가져오기
  const [selectedDate, setSelectedDate] = useState<string>(
    location.state?.selectedDate || "",
  );

  const registerGoal = async (goalData: GoalRequest) => {
    try {
      const response = await fetch("http://localhost:9090/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming token is stored in localStorage
          accept: "*/*",
        },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error("Failed to register goal");
      }

      return await response.json();
    } catch (error) {
      console.error("Error registering goal:", error);
      throw error;
    }
  };

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

  const handleRegister = async () => {
    console.log("=== 목표 등록 정보 ===");
    console.log("목표 이름:", values.name);
    console.log(
      "목표 금액:",
      values.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
    );
    console.log("목표 날짜:", values.endDate);
    console.log("선택 계좌:", values.accountId);

    if (values.image) {
      console.log("등록된 이미지:", values.image);
    } else if (selectedIcon) {
      values.image = selectedIcon;
      console.log("선택한 아이콘:", selectedIcon);
    }

    if (values.category) {
      values.directCategory = values.category;
    } else if (values.directCategory) {
      values.category = values.directCategory;
    }

    if (!values.startDate) {
      values.startDate = selectedDate;
    }

    const anyValueMissing = Object.values(values).some(
      (value) => value === null || value === "",
    );

    console.log(values, anyValueMissing);

    if (!anyValueMissing) {
      try {
        const goalRequest: GoalRequest = {
          goalName: values.name,
          goalMoney: parseInt(values.amount),
          startDate: values.startDate || selectedDate,
          endDate: values.endDate,
          goalType: categoryToNumber[values.category],
          iconId: selectedIcon ? iconToNumber[selectedIcon] : 0,
          goalImg:
            values.image && values.image !== selectedIcon ? values.image : null,

          connectedAccount: parseInt(values.accountId),
        };

        await registerGoal(goalRequest);
        modalManagerRef.current?.openModal("목표등록");

        setValues({
          name: "",
          amount: "",
          startDate: "",
          endDate: "",
          image: null,
          category: "",
          directCategory: "",
          accountId: "",
        });
        setSelectedIcon("");
        setSelectedDate("");
      } catch (error) {
        console.error("Failed to register goal:", error);
      }
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
    if (!values.amount || !values.endDate) {
      return "위 칸을 채워주시면 하루에 얼마씩 돈을 모아야 할지 알려드려요!";
    }

    const targetAmount = parseInt(values.amount);
    if (isNaN(targetAmount) || targetAmount <= 0) return "";

    const startDate = values.startDate
      ? new Date(values.startDate)
      : selectedDate
        ? new Date(selectedDate)
        : new Date();
    const targetDate = new Date(values.endDate);

    if (targetDate <= startDate)
      return "종료 날짜는 시작 날짜 이후로 설정해주세요.";

    const diffTime = targetDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dailyAmount = Math.ceil(targetAmount / diffDays);

    return (
      <AnimatedSavingContainer dailyAmount={dailyAmount} days={diffDays} />
    );
  }, [values.amount, values.startDate, values.endDate, selectedDate]);

  return (
    <>
      <styled.Container>
        <styled.ContainerHeader>목표 설정하기</styled.ContainerHeader>
        <styled.InputWrapper>
          <styled.InputContainer>
            <styled.SetGoalPen
              src={commonIcons.setGoalPen}
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
              src={commonIcons.setGoalMoney}
              alt="목표 금액 입력"
            />
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
        <styled.InputWrapper style={{ marginTop: "16px" }}>
          <styled.InputContainer style={{ width: "156px" }}>
            <styled.SetGoalCalendar
              src={commonIcons.setGoalCalendar}
              alt="목표 시작 날짜 입력"
            />
            <styled.Input
              name="startDate"
              placeholder="목표 시작 날짜"
              value={values.startDate || selectedDate}
              onChange={handleChange}
              type="date"
              min={formatDate(new Date().toISOString())}
            />
          </styled.InputContainer>

          <styled.InputContainer>
            <styled.SetGoalCalendar
              src={commonIcons.setGoalCalendar}
              alt="목표 종료 날짜 입력"
            />
            <styled.Input
              name="endDate"
              placeholder="목표 종료 날짜"
              value={values.endDate}
              onChange={handleChange}
              type="date"
              min={values.startDate || formatDate(new Date().toISOString())}
            />
          </styled.InputContainer>
          <styled.CategoryContainer>
            <styled.CategorySelect
              value={values.accountId}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "accountId",
                    value: e.target.value,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              className={values.accountId ? "" : "placeholder"}
            >
              <option value="" disabled>
                입금 계좌 선택
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountAlias} ({account.accountNumber})
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
            <styled.Icons src={goalIcons.iconTravel} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("anniversary")}
            $isSelected={selectedIcon === "anniversary"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconAnniversary} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("shopping")}
            $isSelected={selectedIcon === "shopping"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconShopping} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("money")}
            $isSelected={selectedIcon === "money"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconMoney} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("beer")}
            $isSelected={selectedIcon === "beer"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconBeer} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("coffee")}
            $isSelected={selectedIcon === "coffee"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconCoffee} />
          </styled.IconBackground>
        </styled.IconList>
        <styled.IconList>
          <styled.IconBackground
            onClick={() => handleIconClick("car")}
            $isSelected={selectedIcon === "car"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconCar} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("ticket")}
            $isSelected={selectedIcon === "ticket"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconTicket} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("cake")}
            $isSelected={selectedIcon === "cake"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconCake} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("lobstar")}
            $isSelected={selectedIcon === "lobstar"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconLobster} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("beach")}
            $isSelected={selectedIcon === "beach"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconBeach} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("pet")}
            $isSelected={selectedIcon === "pet"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconPet} />
          </styled.IconBackground>
        </styled.IconList>
        <styled.IconList>
          <styled.IconBackground
            onClick={() => handleIconClick("party")}
            $isSelected={selectedIcon === "party"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconParty} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("cruise")}
            $isSelected={selectedIcon === "cruise"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconCruise} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("amusementpark")}
            $isSelected={selectedIcon === "amusementpark"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconAmusementPark} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("christmas")}
            $isSelected={selectedIcon === "christmas"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconChristmas} />
          </styled.IconBackground>
          <styled.IconBackground
            onClick={() => handleIconClick("phone")}
            $isSelected={selectedIcon === "phone"}
            disabled={!!values.image}
          >
            <styled.Icons src={goalIcons.iconPhone} />
          </styled.IconBackground>
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
        </styled.IconList>

        <styled.RegisterButton onClick={handleRegister}>
          등록하기
        </styled.RegisterButton>
        <ModalManager ref={modalManagerRef} />
      </styled.Container>
    </>
  );
}
