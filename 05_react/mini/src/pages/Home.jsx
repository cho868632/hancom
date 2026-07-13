import { useNavigate } from "react-router";
import { QUESTIONS } from "../constants/questions";
import { MOVIE_TYPES } from "../constants/mbtiMap";

const NICKNAMES = Object.values(MOVIE_TYPES).map(
  (t) => `${t.emoji} ${t.nickname}`,
);

const Home = () => {
  const nav = useNavigate();
  const start = () => {
    nav("/quiz");
  };
  return (
    <main className="flex min-h-dvh flex-col">
      {/* 레터박스 상단 바 */}
      <div aria-hidden className="h-10 shrink-0 bg-black sm:h-14" />

      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="animate-fade-up text-sm font-semibold tracking-[0.35em] text-tungsten">
          NOW SHOWING
        </p>

        <h1
          className="animate-fade-up mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          씨네타입
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-fog sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {QUESTIONS.length}개의 질문으로 나의 영화 성향 유형을 찾고,
          <br className="hidden sm:block" /> 지금 볼 영화를 추천받으세요.
        </p>

        <button
          type="button"
          onClick={start}
          className="animate-fade-up mt-10 inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full bg-tungsten px-10 text-lg font-bold text-screen transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tungsten active:scale-[0.98]"
          style={{ animationDelay: "240ms" }}
        >
          테스트 시작하기
          <svg
            aria-hidden
            className="size-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10h12m-5-5 5 5-5 5" />
          </svg>
        </button>

        <p
          className="animate-fade-up mt-4 text-sm text-fog"
          style={{ animationDelay: "300ms" }}
        >
          약 3분 · 16가지 유형
        </p>
      </section>

      {/* 유형 별명이 흐르는 티커 */}
      <div className="relative overflow-hidden border-y border-line bg-surface py-4">
        <div className="ticker flex w-max gap-10 whitespace-nowrap text-sm text-fog">
          {[...NICKNAMES, ...NICKNAMES].map((name, i) => (
            <span key={i} aria-hidden={i >= NICKNAMES.length}>
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* 레터박스 하단 바 */}
      <div aria-hidden className="h-10 shrink-0 bg-black sm:h-14" />
    </main>
  );
};

export default Home;
