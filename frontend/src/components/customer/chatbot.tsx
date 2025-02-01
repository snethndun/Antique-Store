import React, { useState, useEffect } from 'react';
import Navbar from './nav';
import './ChatApp.css'; 

interface Message {
  text: string;
  sender: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:5000');
    setWs(webSocket);

    webSocket.onmessage = (event) => {
      const serverMessage: Message = { text: event.data, sender: 'server' };
      setMessages((prevMessages) => [...prevMessages, serverMessage]);
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      webSocket.close();
    };
  }, []);

  const handleMessageSubmit = () => {
    if (newMessage.trim() !== '') {
      const userMessage: Message = { text: newMessage, sender: 'user' };
      setMessages([...messages, userMessage]);

      if (ws) {
        ws.send(newMessage);
      }

      setNewMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#E2E7E9', paddingBottom: '6%' }}>
        <div className="text-center mb-4 pt-5">
          <h1 className="text-decoration-underline">Chat Now</h1>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleMessageSubmit}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
