import { useState } from "react";
import MessageTextbox from '../MessageTextbox/MessageTextbox';
import { mockMessages } from "../../mock/mockMessages";
import styles from "./Chat.module.scss";
import  {ChatMessage}  from "../Message/Message";
import Message from "../Message/Message";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const currentUserId = "123"; // Simulating logged-in user

  const handleSendMessage = () => {
    if (message.trim().length === 0) return;
  
    const newMessage: ChatMessage = {  // ✅ Explicitly type it
      id: (messages.length + 1).toString(),
      userId: currentUserId,
      userName: "Alice",
      content: message,
      timestamp: Date.now(),
      type: "user", // ✅ Explicitly set type
      isEdited: false,
      isDeleted: false,
    };
  
    setMessages([...messages, newMessage]);
    setMessage("");
  };
  

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessage}>
        {messages.map((msg) => (
          <Message 
            key={msg.id} 
            message={msg} 
            userId={currentUserId} 
          />
        ))}
        </div>
      <div className={styles.inputContainer}>
        <MessageTextbox
          value={message}
          onChange={setMessage}
          placeholder="Message"
          showButton={message.trim().length > 0}
          onButtonClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
