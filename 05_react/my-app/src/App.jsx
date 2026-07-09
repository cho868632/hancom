import { useState } from "react";
import Greeting from "./components/Greeting";
import Hello from "./components/Hello";
import Profile from "./components/Profile";
// import Link from "./components/Link";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [displayName, setDisplayName] = useState("사용자");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayName(inputValue);
    setInputValue("");
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 via-purple-400 to-fuchsia-400 flex items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col text-center gap-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        <Hello />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <input
            type="text"
            placeholder="이름을 입력 해 주세요"
            value={inputValue}
            onChange={handleChange}
            className="w-64 rounded-lg border-none bg-white/90 p-2 text-center text-black shadow-inner outline-none ring-2 ring-transparent focus:ring-purple-300"
          />
          <button
            type="submit"
            className="w-64 cursor-pointer rounded-lg bg-white px-4 py-2 font-bold text-purple-700 shadow transition-colors hover:bg-purple-100"
          >
            이름 제출
          </button>
        </form>
        <Greeting name={displayName} />
        <Profile name={displayName} />
      </div>
    </div>
  );
}

export default App;
