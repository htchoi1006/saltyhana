import React, { useRef, useState, memo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import * as styled from "./styles";
import profileImg from "../../images/mypage_profileImg.png";
import EmailIcon from "../../icons/mail-02-stroke-rounded.svg";

// Props 타입 정의
interface AuthDisplayProps {
  labelName: string;
  value: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onSave?: (newValue: string) => void;
}

interface UserData {
  email: string;
  identifier: string;
  name: string;
  birth: string;
  profileImg: string | null;
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
  ({ labelName, value, startIcon, endIcon, onSave }: AuthDisplayProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    // value prop이 변경될 때 editValue 업데이트
    useEffect(() => {
      setEditValue(value);
    }, [value]);

    const handleSave = (e: React.MouseEvent) => {
      e.preventDefault();
      // 값이 변경되었을 때만 저장 실행
      if (onSave && editValue !== value) {
        onSave(editValue);
      }
      setIsEditing(false);
    };

    const handleCancel = (e: React.MouseEvent) => {
      e.preventDefault();
      setEditValue(value); // 원래 값으로 복원
      setIsEditing(false);
    };

    const handleEdit = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(e.target.value);
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
                value={editValue}
                onChange={handleInputChange}
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
    // 메모이제이션 조건 수정
    return (
      prevProps.value === nextProps.value &&
      prevProps.onSave === nextProps.onSave &&
      prevProps.labelName === nextProps.labelName
    );
  },
);

const MyPage: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        // Format birth date to match the desired format (YYYY.MM.DD)
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
      setHasChanges(true);

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
    },
    [passwordInfo.newPassword, passwordInfo.confirmPassword],
  );

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
          reader.readAsDataURL(file);
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
          />
          <PasswordSection
            passwordInfo={passwordInfo}
            passwordError={passwordError}
            onPasswordChange={handlePasswordChange}
          />
        </styled.InputWrapper>
      </styled.InputContainer>
      <styled.RegisterButton>변경하기</styled.RegisterButton>
    </styled.Container>
  );
};

export default MyPage;
