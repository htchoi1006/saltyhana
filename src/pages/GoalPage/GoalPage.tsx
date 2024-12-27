import React, {
  useState,
  useMemo,
  useRef,
  ChangeEvent,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  iconId: number | null;
  goalImg: string | null;
  connectedAccount: number;
}

interface ImageUploadBoxProps {
  image: string | null;
  onImageClick: () => void;
  onCancelClick: () => void;
}

interface Icon {
  id: number;
  name: string;
  imageUrl: string;
  color: string;
}

const categoryToNumber: Record<string, number> = {
  예금: 1,
  적금: 2,
  펀드: 3,
  "단순 저축": 4,
  여행: 5,
  소비: 6,
};

const categories = ["예금", "적금", "펀드", "단순 저축", "여행", "소비"];

const iconToNumber: Record<string, number> = {
  travel: 23,
  anniversary: 8,
  shopping: 21,
  money: 17,
  beer: 10,
  coffee: 14,
  car: 12,
  ticket: 22,
  cake: 11,
  lobstar: 16,
  beach: 9,
  pet: 19,
  party: 18,
  cruise: 15,
  amusementpark: 7,
  christmas: 13,
  phone: 20,
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
  const location = useLocation();
  const navigate = useNavigate();
  const { isEdit, goalId, goalData } = location.state || {};
  console.log(goalId);

  const determineCategory = (goalType: number | undefined) => {
    if (!goalType) return "";

    // category 번호와 이름을 매핑하는 역방향 매핑 생성
    const numberToCategory = Object.entries(categoryToNumber).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [value]: key,
      }),
      {} as Record<number, string>,
    );

    return numberToCategory[goalType] || "";
  };

  const [values, setValues] = useState<InputValues>({
    name: goalData?.goalName || "",
    amount: goalData?.goalMoney?.toString() || "",
    startDate: goalData?.startDate || "",
    endDate: goalData?.endDate || "",
    image: goalData?.goalImg || null,
    category: determineCategory(goalData?.goalType),
    directCategory: "",
    accountId: goalData?.connectedAccount?.toString() || "",
  });

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const modalManagerRef = useRef<ModalManagerType>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    location.state?.selectedDate || "",
  );
  const [icons, setIcons] = useState<Icon[]>([]);
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/icons/goal", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch icons");
        }

        const data = await response.json();
        setIcons(data);
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    };

    fetchIcons();
  }, []);

  useEffect(() => {
    if (goalData?.iconId) {
      const iconEntries = Object.entries(iconToNumber);
      const iconName = iconEntries.find(
        ([_, value]) => value === goalData.iconId,
      )?.[0];
      if (iconName) {
        setSelectedIcon(iconName);
      }
    }
  }, [goalData]);

  // 유저의 계좌 정보를 가져오기 위함
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

  const handleCategoryChange = (category: string) => {
    setValues((prev) => ({ ...prev, category }));
  };

  const handleDirectCategoryChange = (category: string) => {
    setValues((prev) => ({ ...prev, directCategory: category }));
  };

  const handleIconClick = (iconId: number) => {
    if (selectedIconId === iconId) {
      setSelectedIconId(null);
      return;
    }

    if (values.image) {
      return;
    }

    setSelectedIconId(iconId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const cropImageToCircle = (
    image: HTMLImageElement,
    size: number = 200,
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = size;
      canvas.height = size;

      if (ctx) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Calculate dimensions to maintain aspect ratio
        const aspectRatio = image.width / image.height;
        let drawWidth = size;
        let drawHeight = size;
        let offsetX = 0;
        let offsetY = 0;

        if (aspectRatio > 1) {
          drawWidth = size * aspectRatio;
          offsetX = -(drawWidth - size) / 2;
        } else {
          drawHeight = size / aspectRatio;
          offsetY = -(drawHeight - size) / 2;
        }

        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      }

      resolve(canvas.toDataURL("image/png"));
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = async () => {
          const croppedImage = await cropImageToCircle(img);
          setValues((prev) => ({
            ...prev,
            image: croppedImage,
          }));
          setSelectedIcon("");
        };
        img.src = reader.result as string;
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
    const requiredFields = {
      name: values.name,
      amount: values.amount,
      startDate: values.startDate || selectedDate,
      endDate: values.endDate,
      category: values.category,
      accountId: values.accountId,
    };

    const anyRequiredFieldMissing = Object.values(requiredFields).some(
      (value) => !value || value.trim() === "",
    );

    if (!anyRequiredFieldMissing) {
      try {
        const goalRequest: GoalRequest = {
          goalName: values.name,
          goalMoney: parseInt(values.amount.replace(/,/g, "")),
          startDate: values.startDate || selectedDate,
          endDate: values.endDate,
          goalType: categoryToNumber[values.category],
          iconId: values.image ? null : selectedIconId,
          goalImg: values.image || null,
          connectedAccount: parseInt(values.accountId),
        };

        const method = isEdit ? "PUT" : "POST";
        const url = isEdit
          ? `http://localhost:9090/api/goals/${goalId}`
          : "http://localhost:9090/api/goals";

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
          body: JSON.stringify(goalRequest),
        });

        if (!response.ok) {
          throw new Error(`Failed to ${isEdit ? "update" : "register"} goal`);
        }

        // 응답을 기다린 후 모달을 열고 네비게이트
        await response.json();

        // 모달 열기를 try 블록 안에서 실행
        if (modalManagerRef.current) {
          modalManagerRef.current.openModal("목표수정등록");
        }
      } catch (error) {
        console.error(
          `Failed to ${isEdit ? "update" : "register"} goal:`,
          error,
        );
        if (modalManagerRef.current) {
          modalManagerRef.current.openModal("목표관리실패");
        }
      }
    } else {
      alert(
        "필수 정보(목표 이름, 금액, 날짜, 종류, 계좌)를 모두 입력해주세요.",
      );
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(rawValue))) {
      setValues((prevValues) => ({
        ...prevValues,
        amount: rawValue,
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
        <styled.ContainerHeader>
          {isEdit ? "목표 수정하기" : "목표 설정하기"}
        </styled.ContainerHeader>
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
          {icons.slice(0, 6).map((icon) => (
            <styled.IconBackground
              key={icon.id}
              onClick={() => handleIconClick(icon.id)}
              $isSelected={selectedIconId === icon.id}
              disabled={!!values.image}
            >
              <styled.Icons src={icon.imageUrl} alt={icon.name} />
            </styled.IconBackground>
          ))}
        </styled.IconList>
        <styled.IconList>
          {icons.slice(6, 12).map((icon) => (
            <styled.IconBackground
              key={icon.id}
              onClick={() => handleIconClick(icon.id)}
              $isSelected={selectedIconId === icon.id}
              disabled={!!values.image}
            >
              <styled.Icons src={icon.imageUrl} alt={icon.name} />
            </styled.IconBackground>
          ))}
        </styled.IconList>
        <styled.IconList>
          {icons.slice(12).map((icon) => (
            <styled.IconBackground
              key={icon.id}
              onClick={() => handleIconClick(icon.id)}
              $isSelected={selectedIconId === icon.id}
              disabled={!!values.image}
            >
              <styled.Icons src={icon.imageUrl} alt={icon.name} />
            </styled.IconBackground>
          ))}
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
          {isEdit ? "수정하기" : "등록하기"}
        </styled.RegisterButton>
        <ModalManager
          ref={modalManagerRef}
          isGoalEdit={isEdit}
          state={isEdit ? "수정" : "등록"}
        />
      </styled.Container>
    </>
  );
}
