import { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 🔥 bubble vs chat window

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: input });
      const reply = { sender: "assistant", text: res.data.reply };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "⚠️ Error fetching response." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Bubble */}
      {!isOpen && (
        <div className="chatbot-bubble" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      {/* Full Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span className="chatbot-title">Rajasekhar’s Assistant</span>
            <div className="chatbot-actions">
              <button onClick={() => setMessages([])} className="clear-btn">
                Clear
              </button>
              <button onClick={() => setIsOpen(false)} className="toggle-btn">
                —
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
            {isTyping && <div className="typing-indicator">...</div>}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;