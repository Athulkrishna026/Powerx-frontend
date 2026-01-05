import React, { useState } from "react";
import { chatWithAIAPI } from "../../services/allApis";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I’m Px.Ai. How can I help you?" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
  if (!input.trim()) return;

  setMessages(prev => [...prev, { role: "user", text: input }]);
  setLoading(true);

  try {
    const result = await chatWithAIAPI({ message: input });

    if (result.status === 200) {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: result.data.reply }
      ]);
    } else {
      throw new Error("AI response failed");
    }

  } catch (err) {
    console.error("Chatbot error:", err);
    setMessages(prev => [
      ...prev,
      { role: "ai", text: "⚠️ AI server error. Try again." }
    ]);
  } finally {
    setLoading(false);
    setInput("");
  }
};


  return (
    <>
    <style>
        {`
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          animation: open ? "none" : "spinSlow 10s linear infinite",
        }}
        className="fixed bottom-6 right-6 z-50 group h-16 w-16 
                   flex items-center justify-center
                   rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600
                   text-white shadow-[0_10px_40px_rgba(79,70,229,0.4)]
                   hover:shadow-[0_15px_50px_rgba(79,70,229,0.6)]
                   hover:scale-110 active:scale-95 transition-all duration-300
                   border border-white/20 overflow-hidden"
      >
        {/* Glass shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Icon / Text */}
        <div className="relative flex flex-col items-center">
          {open ? (
            <svg
              className="w-6 h-6 transition-transform duration-300 rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <span className="text-xl font-bold tracking-tighter drop-shadow-md">
              Px<span className="text-[10px] align-top opacity-80">.Ai</span>
            </span>
          )}
        </div>

        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400/0 
                        group-hover:border-indigo-400/30 transition-all duration-300" />
      </button>

      {/* Chat Popup */}
      {open && (
  <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] 
                  flex flex-col overflow-hidden
                  rounded-[2rem] border border-white/30
                  bg-white/10 backdrop-blur-2xl backdrop-saturate-150
                  shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                  animate-in fade-in zoom-in duration-300">
    
    {/* Animated Background Glows (The "Super Wow" factor) */}
    <div className="absolute -top-[10%] -left-[10%] w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full -z-10" />
    <div className="absolute -bottom-[10%] -right-[10%] w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full -z-10" />

    {/* Header: Clean & Airy */}
    <div className="flex items-center justify-between px-6 py-5 bg-white/5 border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-white font-medium tracking-wide">Px.Ai Assistant</span>
      </div>
      <button 
        onClick={() => setOpen(false)} 
        className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Messages Area */}
    <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto scrollbar-hide">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] px-5 py-3 text-[15px] leading-relaxed shadow-sm
              ${msg.role === "user"
                ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-[20px] rounded-tr-none"
                : "bg-white/10 backdrop-blur-md text-white/90 border border-white/10 rounded-[20px] rounded-tl-none"
              }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex items-center gap-2 text-white/40 text-xs pl-2 italic">
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
          </span>
          Px.Ai is thinking
        </div>
      )}
    </div>

    {/* Input Area: Floating Style */}
    <div className="p-4 bg-white/5 backdrop-blur-md border-t border-white/10">
      <div className="relative flex items-center">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4
                     text-white placeholder-white/30 outline-none
                     focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50
                     transition-all duration-300"
        />
        <button
          onClick={sendMessage}
          className="absolute right-2 p-2.5 rounded-xl
                     bg-indigo-600 text-white 
                     hover:bg-indigo-500 hover:scale-105 active:scale-95
                     transition-all duration-200 shadow-lg shadow-indigo-500/20"
        >
          <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
      <p className="text-[10px] text-center text-white/20 mt-3 tracking-widest uppercase">
        Powered by Px.Ai Intelligence
      </p>
    </div>
  </div>
)}
    </>
  );
};

export default Chatbot;
