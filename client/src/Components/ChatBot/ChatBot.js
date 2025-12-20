import React, { useState } from "react";
import { qaData } from "./qaData";
import "./ChatBot.css";
import { FaComments } from "react-icons/fa";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  const handleQuestionClick = (qa) => {
    setMessages([...messages, { text: qa.question, user: true }, { text: qa.answer, user: false }]);
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chat-toggle-btn" onClick={() => setOpen(!open)}>
        <FaComments size={22} />
      </button>
      {open && (
        <div className="chatbot-container">
          <div className="predefined-questions">
            <h4 style={{ color: "black" }}>Quick Questions:</h4>
            {qaData.map((qa, idx) => (
              <button key={idx} onClick={() => handleQuestionClick(qa)}>
                {qa.question}
              </button>
            ))}
          </div>

          <div className="chat-window">
            {messages.map((msg, i) => (
              <div key={i} className={msg.user ? "user-msg" : "bot-msg"}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
