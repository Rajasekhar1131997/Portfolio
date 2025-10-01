import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      setMessages([
        ...newMessages,
        { role: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "bot", text: "⚠️ Error: Could not connect to backend" },
      ]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          maxHeight: "300px",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <b>{m.role === "user" ? "You" : "Bot"}:</b> {m.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
        <input
          style={{ flex: 1, padding: "8px", border: "none" }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "8px 12px",
            border: "none",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;