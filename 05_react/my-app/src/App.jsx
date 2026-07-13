import { Outlet, useNavigate, useLocation } from "react-router";

function App() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center gap-6 pt-6 ${
        isHome
          ? "bg-linear-to-br from-purple-500 via-purple-400 to-fuchsia-400"
          : "bg-slate-100"
      }`}
    >
      <button
        onClick={() => nav(isHome ? "/about" : "/")}
        className="cursor-pointer rounded-lg bg-white px-4 py-2 font-bold text-purple-700 shadow transition-colors hover:bg-purple-100"
      >
        {isHome ? "헤더 화면 보기" : "메인 카드 보기"}
      </button>
      <Outlet />
    </div>
  );
}

export default App;
