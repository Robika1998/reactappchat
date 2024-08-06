import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get("http://localhost:5000/messages");
      setMessages(response.data);
    };

    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    };

    fetchMessages();
    fetchUsers();
  }, []);

  const handleSendMessage = async () => {
    if (!selectedUser) {
      alert("Please select a user to send a message to.");
      return;
    }

    const newMessage = {
      userId: user.id,
      username: user.username,
      text: message,
      to: selectedUser.id,
    };
    await axios.post("http://localhost:5000/messages", newMessage);
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.userId === user.id && msg.to === selectedUser?.id) ||
      (msg.userId === selectedUser?.id && msg.to === user.id)
  );

  return (
    <div>
      <h2>Chat</h2>
      <div>
        <h3>Users</h3>
        <ul>
          {users.map((usr) => (
            <li
              key={usr.id}
              onClick={() => setSelectedUser(usr)}
              style={{
                cursor: "pointer",
                fontWeight: selectedUser?.id === usr.id ? "bold" : "normal",
              }}
            >
              {usr.username}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedUser && (
          <div>
            <h3>Chat with {selectedUser.username}</h3>
            {filteredMessages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.username}</strong>: {msg.text}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedUser && (
        <div>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
