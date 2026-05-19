import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "team", text: "Hi! Tell us what you need help with." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userText = chatInput.trim();
    setChatMessages((current) => [
      ...current,
      { from: "user", text: userText },
    ]);
    setChatInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      setChatMessages((current) => [
        ...current,
        { from: "team", text: data.reply },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages((current) => [
        ...current,
        { from: "team", text: "Oops, something went wrong. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
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
              <div key={`${message.from}-${index}`} className={`rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${message.from === "user" ? "ml-8 bg-cyan-500 text-black" : "mr-8 bg-slate-100 text-slate-700 dark:bg-gray-900 dark:text-slate-200"}`}>
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="mr-8 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-gray-900 dark:text-slate-200">
                <span className="animate-pulse">Typing...</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-gray-800">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChatMessage()} disabled={isLoading} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-black disabled:opacity-50" placeholder="Type a message" />
            <button type="button" onClick={sendChatMessage} disabled={isLoading} className="rounded-lg bg-cyan-500 px-3 py-2 text-black disabled:opacity-50">
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
