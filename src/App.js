import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.trim() === '') return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5001/api/gemini', { prompt: userInput });
      const botMessage = { sender: 'bot', text: response.data };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
    }

    setUserInput('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini Chatbot</h1>
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
