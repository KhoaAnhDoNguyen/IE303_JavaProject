import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';


const ChatBot = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    try {
      const newMessage = { role: 'user', content: message };
      setChatHistory(prevHistory => [...prevHistory, newMessage]); // Thêm tin nhắn mới vào cuối mảng
      setMessage('');

      const response = await axios.post('http://127.0.0.1:5000/chat', { message: message });
      const botResponse = { role: 'bot', content: response.data.response };
      console.log(response)
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
      <div className="close-container">
        <div className="customer-care">Chăm sóc khách hàng - K Bot</div>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default ChatBot;
