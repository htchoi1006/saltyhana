import React, { useRef, useState, memo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "./styles";
import EmailIcon from "../../icons/mail-02-stroke-rounded.svg";

// Props 타입 정의
interface AuthDisplayProps {
  labelName: string;
  value: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onSave?: (newValue: string) => void;
  type?: "text" | "date";
}

interface UserData {
  email: string;
  identifier: string;
  name: string;
  birth: string;
  profileImg: string | null;
}

interface UpdateUserData {
  email?: string;
  identifier?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  birth?: string;
  profileImage?: string | null;
}

interface PasswordInputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

interface PasswordSectionProps {
  passwordInfo: {
    newPassword: string;
    confirmPassword: string;
  };
  passwordError: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInputField = memo(
  ({ label, name, value, onChange, placeholder }: PasswordInputFieldProps) => {
    return (
      <label>
        <div>
          <styled.InputLabel>{label}</styled.InputLabel>
        </div>
        <styled.PasswordInputWrapper>
          <img src={EmailIcon} alt="password icon" />
          <styled.PasswordInput
            type="password"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </styled.PasswordInputWrapper>
      </label>
    );
  },
);

const PasswordSection = memo(
  ({ passwordInfo, passwordError, onPasswordChange }: PasswordSectionProps) => {
    return (
      <styled.PasswordSection>
        <PasswordInputField
          label="비밀번호"
          name="newPassword"
          value={passwordInfo.newPassword}
          onChange={onPasswordChange}
          placeholder="새 비밀번호 입력"
        />
        <PasswordInputField
          label="비밀번호 확인"
          name="confirmPassword"
          value={passwordInfo.confirmPassword}
          onChange={onPasswordChange}
          placeholder="비밀번호 확인"
        />
        {passwordError && (
          <styled.ErrorMessage>{passwordError}</styled.ErrorMessage>
        )}
      </styled.PasswordSection>
    );
  },
);

const AuthDisplay = memo(
  ({
    labelName,
    value,
    startIcon,
    endIcon,
    onSave,
    type = "text",
  }: AuthDisplayProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    // value prop이 변경될 때 editValue 업데이트
    useEffect(() => {
      setEditValue(value);
    }, [value]);

    const handleSave = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onSave && editValue !== value) {
        onSave(editValue);
      }
      setIsEditing(false);
    };

    const handleCancel = (e: React.MouseEvent) => {
      e.preventDefault();
      setEditValue(value);
      setIsEditing(false);
    };

    const handleEdit = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (type === "date") {
        const formattedDate = newValue.split("-").join(".");
        setEditValue(formattedDate);
      } else {
        setEditValue(newValue);
      }
    };

    const getDateInputValue = () => {
      if (type === "date" && editValue) {
        return editValue.split(".").join("-");
      }
      return editValue;
    };

    return (
      <styled.AuthDisplayContainer>
        <div>
          <styled.InputLabel>{labelName}</styled.InputLabel>
        </div>
        <styled.InputAndButtonWrapper>
          <styled.DisplayWrapper>
            {startIcon && <div>{startIcon}</div>}
            {isEditing ? (
              <styled.EditInput
                value={getDateInputValue()}
                onChange={handleInputChange}
                type={type}
                autoFocus
              />
            ) : (
              <styled.DisplayText>{value}</styled.DisplayText>
            )}
            {endIcon && <div>{endIcon}</div>}
          </styled.DisplayWrapper>
          {isEditing ? (
            <styled.ButtonGroup>
              <styled.Button
                className="cancel"
                onClick={handleCancel}
                type="button"
                style={{ marginRight: "0px" }}
              >
                취소
              </styled.Button>
              <styled.Button onClick={handleSave} type="button">
                저장
              </styled.Button>
            </styled.ButtonGroup>
          ) : (
            <styled.EditButton onClick={handleEdit} type="button">
              수정
            </styled.EditButton>
          )}
        </styled.InputAndButtonWrapper>
      </styled.AuthDisplayContainer>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.onSave === nextProps.onSave &&
      prevProps.labelName === nextProps.labelName
    );
  },
);

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modifiedFields, setModifiedFields] = useState<UpdateUserData>({});

  const [userInfo, setUserInfo] = useState({
    email: "",
    id: "",
    birth: "",
    name: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [passwordInfo, setPasswordInfo] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch("http://localhost:9090/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data: UserData = await response.json();
        const formattedBirth = data.birth
          ? data.birth.split("-").join(".")
          : "";

        setUserInfo({
          email: data.email,
          id: data.identifier,
          birth: formattedBirth,
          name: data.name,
          password: "",
        });

        if (data.profileImg) {
          setProfileImage(data.profileImg);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = useCallback(
    (field: keyof typeof userInfo) => (newValue: string) => {
      setUserInfo((prev) => ({
        ...prev,
        [field]: newValue,
      }));

      // Track modified field
      setModifiedFields((prev) => {
        const updatedFields = { ...prev };

        if (field === "birth") {
          updatedFields[field] = newValue.split(".").join("-");
        } else if (field === "id") {
          updatedFields.identifier = newValue;
        } else {
          updatedFields[field] = newValue;
        }

        return updatedFields;
      });

      setHasChanges(true);
    },
    [],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPasswordInfo((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "newPassword") {
        setModifiedFields((prev) => ({
          ...prev,
          password: value,
        }));
      } else if (name === "confirmPassword") {
        setModifiedFields((prev) => ({
          ...prev,
          confirmPassword: value,
        }));
      }

      if (name === "confirmPassword") {
        if (value !== passwordInfo.newPassword) {
          setPasswordError("비밀번호가 일치하지 않습니다.");
        } else {
          setPasswordError("");
        }
      }
      if (name === "newPassword" && passwordInfo.confirmPassword) {
        if (value !== passwordInfo.confirmPassword) {
          setPasswordError("비밀번호가 일치하지 않습니다.");
        } else {
          setPasswordError("");
        }
      }

      setHasChanges(true);
    },
    [passwordInfo.newPassword, passwordInfo.confirmPassword],
  );

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const updateData: UpdateUserData & { profileImage?: string } = {}; // 타입 확장

      // 기존 필드들 처리
      Object.entries(modifiedFields).forEach(([key, value]) => {
        // profileImage는 null값도 허용하도록 조건 수정
        if (key === "profileImage") {
          updateData[key] = value; // null이어도 포함
        }
        // 다른 필드들은 기존 검증 유지
        else if (value && value.trim() !== "") {
          updateData[key as keyof UpdateUserData] = value;
        }
      });

      // 프로필 이미지가 변경되었다면 추가
      if (profileImage !== null) {
        updateData.profileImage = profileImage;
      }

      if (Object.keys(updateData).length === 0) {
        alert("변경된 정보가 없습니다.");
        return;
      }

      // 비밀번호 검증
      if (updateData.password) {
        if (
          passwordError ||
          updateData.password !== updateData.confirmPassword
        ) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }
      }

      const response = await fetch(`http://localhost:9090/api/users/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      setModifiedFields({});
      setHasChanges(false);
      setPasswordInfo({
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError("");

      alert("정보가 성공적으로 업데이트되었습니다.");
      window.location.reload();
    } catch (err) {
      console.error("Error updating user data:", err);
      alert("정보 업데이트에 실패했습니다.");
    }
  };

  const resetFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleImageClick = () => {
    resetFileInput(); // 파일 입력 초기화
    fileInputRef.current?.click();
  };

  const handleImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("파일 크기는 5MB 이하여야 합니다.");
          resetFileInput();
          return;
        }

        if (!file.type.startsWith("image/")) {
          alert("이미지 파일만 업로드 가능합니다.");
          resetFileInput();
          return;
        }

        try {
          setIsUploading(true);
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              setProfileImage(e.target.result as string);
              setHasChanges(true);
            }
          };
        } catch (error) {
          console.error("Upload error:", error);
          alert("이미지 업로드 중 오류가 발생했습니다.");
          resetFileInput();
        } finally {
          setIsUploading(false);
        }
      }
    },
    [resetFileInput],
  );

  const handleImageDelete = () => {
    if (window.confirm("프로필 이미지를 삭제하시겠습니까?")) {
      setProfileImage(null);
      resetFileInput();
      setHasChanges(true);
      setModifiedFields((prev) => ({
        ...prev,
        profileImage: null,
      }));
    }
  };

  const handleUnsubscribe = async () => {
    if (window.confirm("정말로 회원탈퇴를 진행하시겠습니까?")) {
      // 회원탈퇴 API 호출 또는 로직 처리
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      await fetch(`http://localhost:9090/api/auth/unsubscribe`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      });

      // 루트 페이지로 이동
      navigate("/");
    }
  };

  return (
    <styled.Container>
      <styled.ProfileSection>
        <styled.ProfileImgDiv>
          {profileImage ? (
            <>
              <styled.ProfileImg src={profileImage} alt="Profile" />
              <styled.ImageOverlay>
                <styled.OverlayButton onClick={handleImageClick}>
                  이미지 변경
                </styled.OverlayButton>
                <styled.OverlayButton onClick={handleImageDelete}>
                  이미지 삭제
                </styled.OverlayButton>
              </styled.ImageOverlay>
            </>
          ) : (
            <>
              <styled.DefaultProfileImg />
              <styled.ImageOverlay>
                <styled.SingleOverlayButton onClick={handleImageClick}>
                  이미지 등록
                </styled.SingleOverlayButton>
              </styled.ImageOverlay>
            </>
          )}
        </styled.ProfileImgDiv>
        <styled.HiddenInput
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
        />
      </styled.ProfileSection>

      <styled.NameDiv>
        <span>{userInfo.name}</span>
      </styled.NameDiv>
      <styled.InputContainer>
        <styled.InputWrapper>
          <AuthDisplay
            labelName="이메일"
            value={userInfo.email}
            startIcon={<img src={EmailIcon} alt="email icon" />}
            onSave={handleSave("email")}
          />
          <AuthDisplay
            labelName="아이디"
            value={userInfo.id}
            startIcon={<img src={EmailIcon} alt="email icon" />}
            onSave={handleSave("id")}
          />
          <AuthDisplay
            labelName="생년월일"
            value={userInfo.birth}
            startIcon={<img src={EmailIcon} alt="email icon" />}
            onSave={handleSave("birth")}
            type="date"
          />
          <PasswordSection
            passwordInfo={passwordInfo}
            passwordError={passwordError}
            onPasswordChange={handlePasswordChange}
          />
          <styled.UnsubscribeDiv onClick={handleUnsubscribe}>
            회원탈퇴
          </styled.UnsubscribeDiv>
        </styled.InputWrapper>
      </styled.InputContainer>
      <styled.RegisterButton onClick={handleSubmit}>
        변경하기
      </styled.RegisterButton>
    </styled.Container>
  );
};

export default MyPage;
