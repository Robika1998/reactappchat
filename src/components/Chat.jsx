import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get("http://localhost:5000/messages");
      setMessages(response.data);
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    const newMessage = {
      userId: user.id,
      username: user.username,
      text: message,
    };
    await axios.post("http://localhost:5000/messages", newMessage);
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
