import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "team", text: "Hi! Tell us what you need help with." },
  ]);
  const [chatInput, setChatInput] = useState("");

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    setChatMessages((current) => [
      ...current,
      { from: "user", text: chatInput.trim() },
      { from: "team", text: "Thanks. Please visit our contact page and leave your email, our team will reply quickly." },
    ]);
    setChatInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {chatOpen && (
        <div className="mb-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between bg-black px-4 py-3 text-white">
            <span className="font-bold">Live chat</span>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
          <div className="max-h-64 space-y-3 overflow-auto p-4">
            {chatMessages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`rounded-lg px-3 py-2 text-sm ${message.from === "user" ? "ml-8 bg-cyan-500 text-black" : "mr-8 bg-slate-100 text-slate-700 dark:bg-gray-900 dark:text-slate-200"}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-gray-800">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChatMessage()} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-black" placeholder="Type a message" />
            <button type="button" onClick={sendChatMessage} className="rounded-lg bg-cyan-500 px-3 py-2 text-black">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setChatOpen(!chatOpen)} className="grid h-14 w-14 place-items-center rounded-full bg-cyan-400 text-black shadow-2xl shadow-cyan-500/30 transition hover:scale-105" aria-label="Open live chat">
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default Chatbot;
