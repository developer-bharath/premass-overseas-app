import { useState } from "react";
import { ChatCircle, X, PaperPlaneRight, WhatsappLogo } from "phosphor-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { sender: "user", text: message }]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thanks for your message! Our team will get back to you shortly." }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* WHATSAPP BUTTON */}
        <a
          href="https://wa.me/918977708366?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center animate-pulse hover:animate-none"
          title="Chat on WhatsApp"
        >
          <WhatsappLogo size={28} weight="duotone" className="group-hover:scale-110 transition-transform" />
        </a>

        {/* CHATBOT BUTTON */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-br from-[#cd9429] to-orange-500 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-[#cd9429]/50 transition-all duration-300 flex items-center justify-center"
            title="Chat with us"
          >
            <ChatCircle size={28} weight="duotone" />
          </button>
        )}
      </div>

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* HEADER */}
          <div className="bg-[#054374] text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#cd9429] rounded-full flex items-center justify-center font-bold">P</div>
              <div>
                <p className="font-bold">Premass Support</p>
                <p className="text-xs text-gray-300">We typically reply instantly</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
              <X size={20} weight="bold" />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "user" ? "bg-[#cd9429] text-white" : "bg-gray-100 text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#cd9429]"
            />
            <button onClick={handleSend} className="px-4 py-2 bg-[#cd9429] text-white rounded-lg hover:opacity-90">
              <PaperPlaneRight size={20} weight="bold" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
