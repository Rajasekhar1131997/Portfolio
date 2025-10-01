import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";
import botLogo from "./assets/robot.png";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showIntroBubble, setShowIntroBubble] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true); // ✅ to send greeting inside chat only once
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Show floating intro bubble on page load
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowIntroBubble(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setShowIntroBubble(false);
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Send intro message into chat when first opened
  useEffect(() => {
    if (isOpen && firstOpen) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "👋 Hi! I’m Raja’s personal assistant. How can I help you today?",
        },
      ]);
      setFirstOpen(false);
    }
  }, [isOpen, firstOpen]);

  // Format links
  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      const cleanUrl = url.replace(/\.*$/, "");
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>`;
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: input });
      const reply = { sender: "assistant", text: formatMessage(res.data.reply) };
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
      {/* Floating Bubble with Intro Tooltip */}
      {!isOpen && (
        <div className="chatbot-wrapper">
          <div className={`intro-tooltip ${showIntroBubble ? "show" : ""}`}>
            👋 Hi! I’m Raja’s personal assistant.  
            How can I help you today?
          </div>
          <div className="chatbot-bubble" onClick={() => setIsOpen(true)}>
            <img src={botLogo} alt="Chatbot" className="chatbot-logo" />
          </div>
        </div>
      )}

      {/* Full Chat Window */}
      <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
        <div className="chatbot-header">
          <span className="chatbot-title">Rajasekhar’s Assistant</span>
          <div className="chatbot-actions">
            <button onClick={() => setMessages([])} className="clear-btn">
              Clear
            </button>
            <button onClick={() => setIsOpen(false)} className="toggle-btn">
              ✕
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

          {isTyping && (
            <div className="typing-bubble">
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
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
    </>
  );
}

export default Chatbot;