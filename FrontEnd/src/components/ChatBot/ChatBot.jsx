// ChatBot.jsx
import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    try {
      const newMessage = { role: 'user', content: message };
      setChatHistory(prevHistory => [...prevHistory, newMessage]); // Thêm tin nhắn mới vào cuối mảng
      setMessage('');
  
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: [...chatHistory, newMessage] })
      });
      const data = await response.json();
      const botResponse = { role: 'bot', content: data.response };
      setChatHistory(prevHistory => [...prevHistory, botResponse]); // Thêm câu trả lời từ bot vào cuối mảng
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-content">
        {chatHistory.map((item, index) => (
          <div key={index} className={`message ${item.role}`}>
            {item.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyPress={handleKeyPress} // Thêm sự kiện khi nhấn phím
          placeholder="Nhập câu hỏi của bạn tại đây" 
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
      <button className="close-button" onClick={onClose}>X</button>
    </div>
  );
};

export default ChatBot;
