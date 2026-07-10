import { useState } from "react";
import Hello from "./Hello";
import Greeting from "./Greeting";
import Profile from "./Profile";
import Card from "./Card";
import Alert from "./Alert";
import Rating from "./Rating";
import Tag from "./Tag";
import SubmitButton from "./SubmitButton";
import { Slider } from "@mui/material";
import Weather from "./Weather";
import User from "./User";

function MainCard() {
  const [inputValue, setInputValue] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [count, setCount] = useState(0);

  const list = ["밥", "뭐", "먹지"];

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayName(inputValue);
    setInputValue("");
  };

  return (
    <div className=" mb-4 w-full max-w-sm flex flex-col text-center gap-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
      <Weather />
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
      {displayName ? (
        <>
          <Greeting name={displayName} />
          <Profile name={displayName} />
        </>
      ) : (
        <Card
          title="환영합니다"
          desc="React로 만든 카드 컴포넌트입니다"
          emoji="🎉"
        />
      )}
      <div className="border-t border-white/20 pt-4 mt-2 flex flex-col gap-3">
        <p className="text-xs font-semibold text-white/70">
          알림 피드백 토글 테스트
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setAlertType("success")}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${alertType === "success" ? "bg-white text-purple-700 font-bold" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            성공
          </button>
          <button
            onClick={() => setAlertType("error")}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${alertType === "error" ? "bg-white text-purple-700 font-bold" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            에러
          </button>
          <button
            onClick={() => setAlertType("warning")}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${alertType === "warning" ? "bg-white text-purple-700 font-bold" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            경고
          </button>
        </div>

        <div className="mt-1">
          <Alert
            type={alertType}
            text={`${alertType.toUpperCase()} 메시지 발송 완료`}
          />
        </div>
      </div>

      <Rating score={3} />
      <Tag tags={list} />
      <SubmitButton />
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <div className="border-t border-white/20 pt-4 mt-2 flex flex-col items-center gap-3">
        <p className="text-xs font-semibold text-white/70">카운터</p>
        <span className="text-4xl font-extrabold text-white tabular-nums">
          {count}
        </span>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="w-11 h-10 rounded-lg bg-white/20 text-white text-lg font-bold cursor-pointer transition-colors hover:bg-white/30"
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-3 h-10 rounded-lg bg-white/20 text-white text-xs font-medium cursor-pointer transition-colors hover:bg-white/30"
          >
            reset
          </button>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-11 h-10 rounded-lg bg-white/20 text-white text-lg font-bold cursor-pointer shadow transition-colors hover:bg-purple-100"
          >
            +
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}

export default MainCard;
