import React, { useState, useEffect, useRef } from "react";
import * as styled from "./ChatModalStyles";
import icon from "../../images/chatmodal_counsel.png";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";

interface ChatMessage {
  id: number;
  name: string;
  message: string;
  timestamp: string; // 서버에서 전달받는 타임스탬프
  sender: "client" | "server"; // 클라이언트와 서버 구분
}

interface ModalsProps {
  onClose: () => void;
}

export default function ChatModal(props: ModalsProps) {
  const { onClose } = props;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const chatAreaRef = useRef<HTMLDivElement>(null);
  const stompClient = useRef<any>(null);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const connect = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "";
    let socketUrl = apiUrl.split("//")[1].split("/api")[0];
    const socket = new WebSocket(`ws://${socketUrl}/ws`);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe("/sub/chatroom/1", (message: any) => {
        const newMessage: ChatMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  const fetchMessages = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "";
      let socketUrl = apiUrl.split("//")[1].split("/api")[0];
      const response = await axios.get(`http://${socketUrl}/chat/1`);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    }
  };

  const sendMessage = () => {
    if (stompClient.current && currentMessage.trim() !== "") {
      const body = {
        id: Date.now(),
        name: "test",
        message: currentMessage,
        sender: "client",
      };

      stompClient.current.send("/pub/message", {}, JSON.stringify(body));
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    connect();
    fetchMessages();

    return () => {
      disconnect();
    };
  }, []);

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
            <styled.MessageWrapper key={index} sender={msg.sender}>
              <styled.Timestamp sender={msg.sender}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </styled.Timestamp>
              <styled.Message sender={msg.sender}>{msg.message}</styled.Message>
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
