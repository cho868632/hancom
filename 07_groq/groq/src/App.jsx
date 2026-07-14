import { useState } from "react";
import { getMessage } from "./api/api";

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessage((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await getMessage(text);
      setMessage((prev) => [...prev, { role: "ai", content: res }]);
    } catch (error) {
      console.log("메세지 수신 실패", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-screen bg-[#f0eee6] text-[#3d3d3a]">
      {/* 헤더 */}
      <header className="flex items-center gap-2 px-5 py-3 border-b border-black/5">
        <div className="h-7 w-7 rounded-md bg-[#d97757] flex items-center justify-center text-white text-sm font-semibold">
          G
        </div>
        <span className="font-semibold">Groq Chat</span>
      </header>

      {/* 대화 영역 */}
      <div className="result flex-1 overflow-y-auto">
        {message.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center px-4">
            <div className="h-12 w-12 rounded-xl bg-[#d97757] flex items-center justify-center text-white text-xl font-semibold mb-4">
              G
            </div>
            <h1 className="text-2xl font-semibold">무엇을 도와드릴까요?</h1>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
            {message.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 shadow-sm whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-3">
                  <div className="h-7 w-7 shrink-0 rounded-md bg-[#d97757] flex items-center justify-center text-white text-xs font-semibold">
                    G
                  </div>
                  <div className="pt-0.5 whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>
                </div>
              ),
            )}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-7 w-7 shrink-0 rounded-md bg-[#d97757] flex items-center justify-center text-white text-xs font-semibold">
                  G
                </div>
                <div className="pt-2 flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-black/30 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-black/30 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-black/30 animate-bounce" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 입력 바 */}
      <div className="px-4 pb-6">
        <div className="max-w-3xl mx-auto flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm focus-within:border-[#d97757]/50 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="무엇이든 물어보세요"
            className="flex-1 bg-transparent outline-none placeholder:text-black/40"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="shrink-0 h-8 w-8 rounded-lg bg-[#d97757] text-white flex items-center justify-center disabled:opacity-30 hover:bg-[#c96545] transition-colors"
            aria-label="전송"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
