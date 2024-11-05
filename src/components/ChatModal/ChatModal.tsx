import React, { useState, useEffect, useRef } from "react";
import * as styled from "./ChatModalStyles";
import icon from "../../images/chatmodal_counsel.png";

const predefinedResponses: { [key: string]: string } = {
  트레블로그:
    "트레블로그 여행 적금은 연 4.50%~6.00%의 이율을 제공하며 5년 동안 유지됩니다.",
  달달하나:
    "달달 하나 적금은 2백만원까지 혜택을 받을 수 있으며, 기본 0.10%~최고 3.00%의 이율이 적용됩니다.",
  하나적금:
    "하나 청년도약 계좌는 가입기간은 5년이고, 가입금액 1천원 이상 ~ 70만원 이하(천원 단위)입니다.",
};

interface ModalsProps {
  onClose: () => void;
}

export default function ChatModal(props: ModalsProps) {
  const { onClose } = props;

  const [messages, setMessages] = useState<
    { text: string; isUser: boolean; timestamp: string }[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // 초기 메시지 설정
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          text: "상품에 대해서 궁금하신 부분이 있으신가요?",
          isUser: false,
          timestamp: "",
        },
      ]);
    }
  }, []);

  // 메시지 전송 핸들러
  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMessages = [
        ...messages,
        { text: currentMessage, isUser: true, timestamp: currentTime },
      ];
      setMessages(newMessages);
      setCurrentMessage("");

      let responseFound = false;
      for (const key in predefinedResponses) {
        if (currentMessage.includes(key)) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: predefinedResponses[key],
              isUser: false,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
          responseFound = true;
          break;
        }
      }

      if (!responseFound) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "죄송합니다, 해당 상품에 대한 정보를 찾을 수 없습니다.",
            isUser: false,
            timestamp: currentTime,
          },
        ]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <styled.ModalOverlay>
      <styled.ModalContent closing={isClosing}>
        <styled.Header>
          <styled.ChatIcon src={icon} />
          <styled.CloseButton onClick={handleCloseModal}>✖</styled.CloseButton>
        </styled.Header>

        <styled.ChatArea ref={chatAreaRef}>
          {messages.map((msg, index) => (
            <styled.MessageWrapper key={index} isUser={msg.isUser}>
              <styled.Message isUser={msg.isUser}>{msg.text}</styled.Message>
              {msg.timestamp && (
                <styled.Timestamp isUser={msg.isUser}>
                  {msg.timestamp}
                </styled.Timestamp>
              )}
            </styled.MessageWrapper>
          ))}
        </styled.ChatArea>

        <styled.ChatInput>
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage}>전송</button>
        </styled.ChatInput>
      </styled.ModalContent>
    </styled.ModalOverlay>
  );
}
