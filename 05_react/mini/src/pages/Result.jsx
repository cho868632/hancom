import { Outlet, useNavigate, useParams } from "react-router";
import { useQuizStore } from "../store/useQuizStore";
import { MOVIE_TYPES } from "../constants/mbtiMap";
import { useMovieList } from "../hooks/useMovieList";
import ResultSummary from "../components/result/ResultSummary";
import MovieCard from "../components/result/MovieCard";
import Loader from "../components/common/Loader";

const Result = () => {
  const { mbtiType } = useParams();
  const upper = mbtiType?.toUpperCase();
  const profile = upper ? MOVIE_TYPES[upper] : undefined;
  const reset = useQuizStore((s) => s.reset);
  const navigate = useNavigate();

  const {
    data: movies,
    isLoading,
    isError,
    refetch,
  } = useMovieList(profile ? upper : undefined);

  const retry = () => {
    reset();
    navigate("/quiz");
  };

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-lg font-semibold text-ink">
          잘못된 결과 타입이야: {mbtiType}
        </p>
        <button
          type="button"
          onClick={retry}
          className="min-h-12 cursor-pointer rounded-full border border-line px-7 font-semibold text-ink transition-colors duration-200 hover:border-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velvet"
        >
          테스트 다시 하기
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <header className="text-center">
        <p className="text-sm font-semibold text-fog">당신의 시네타입</p>
        <h1
          aria-label={profile.type}
          className="mt-6 flex justify-center gap-2 sm:gap-4"
        >
          {profile.type.split("").map((letter, i) => (
            <span
              key={i}
              aria-hidden
              className="animate-fade-up inline-block text-7xl font-extrabold tracking-tight text-tungsten sm:text-9xl"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <button
          type="button"
          onClick={retry}
          className="mt-6 min-h-12 cursor-pointer rounded-full border border-line px-7 font-semibold text-ink transition-colors duration-200 hover:border-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velvet"
        >
          다시 테스트하기
        </button>
      </header>

      <ResultSummary profile={profile} />

      <section className="mt-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-velvet">
          추천 영화
        </p>

        {isLoading && <Loader label="영화 찾는 중..." />}
        {isError && (
          <div className="mt-4 flex flex-col items-start gap-3">
            <p className="text-sm text-fog">
              영화를 불러오지 못했습니다. 잠시 후 다시 시도해 주십시오.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="cursor-pointer rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velvet"
            >
              다시 시도
            </button>
          </div>
        )}

        {movies && movies.length === 0 && (
          <p className="mt-4 text-sm text-fog">
            추천할 영화를 찾지 못했습니다. 테스트를 다시 해보세요.
          </p>
        )}

        {movies && movies.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {movies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <Outlet />
    </main>
  );
};

export default Result;
