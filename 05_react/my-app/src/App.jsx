import { useState } from "react";
import MainCard from "./components/MainCard";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
// import Link from "./components/Link";

function App() {
  const [showMainCard, setShowMainCard] = useState(true);

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center gap-6 pt-6 ${
        showMainCard
          ? "bg-linear-to-br from-purple-500 via-purple-400 to-fuchsia-400"
          : "bg-slate-100"
      }`}
    >
      <button
        onClick={() => setShowMainCard(!showMainCard)}
        className="cursor-pointer rounded-lg bg-white px-4 py-2 font-bold text-purple-700 shadow transition-colors hover:bg-purple-100"
      >
        {showMainCard ? "헤더 화면 보기" : "메인 카드 보기"}
      </button>
      {showMainCard ? (
        <MainCard />
      ) : (
        <div className="w-full flex-1 flex flex-col bg-slate-50 shadow-2xl">
          <div className="bg-white shadow-sm">
            <Header />
            <div className="flex justify-center border-t border-slate-100 py-2">
              <Menu />
            </div>
          </div>
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
            <Content />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
