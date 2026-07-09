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
    <div className=" bg-purple-400 flex flex-col text-center justify-center gap-4">
      <Hello />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <input
          type="text"
          placeholder="이름을 입력 해 주세요"
          value={inputValue}
          onChange={handleChange}
          className="border p-2 rounded text-black w-64 border-none"
        />
        <button
          type="submit"
          className="bg-white text-purple-700 px-4 py-2 rounded font-bold w-64 hover:bg-purple-100 cursor-pointer"
        >
          이름 제출
        </button>
      </form>
      <Greeting name={displayName} />
      <Profile name={displayName} />
    </div>
  );
}

export default App;
