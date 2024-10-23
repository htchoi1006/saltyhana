import React, { useState } from "react";
import * as styled from "./ModalStyles";
import icon from "../../images/chatmodal_counsel.png";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  // 메시지 목록 관리
  const [messages, setMessages] = useState<String[]>([]);

  // 현재 입력한 메시지를 관리
  const [currentMessage, setCurrentMessage] = useState("");

  // 메시지 전송 핸들러
  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      setMessages([...messages, currentMessage]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <styled.ModalOverlay>
      <styled.ModalContent>
        <styled.Header>
          {/* <h2>고객센터</h2> */}
          <styled.ChatIcon src={icon} />

          <styled.CloseButton onClick={onClose}>X</styled.CloseButton>
        </styled.Header>
        <styled.ChatArea>
          {messages.length === 0 ? (
            <p>무엇을 도와드릴까요?</p>
          ) : (
            messages.map((msg, index) => (
              <styled.Message key={index} isUser={index % 2 === 0}>
                {msg}
              </styled.Message>
            ))
          )}
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
};

export default ChatModal;
