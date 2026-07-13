import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useMovieDetail } from "../../hooks/useMovieDetail";
import { useMovieVideos } from "../../hooks/useMovieVideos";
import Loader from "../common/Loader";

const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";

const MovieModal = () => {
  const { movieId } = useParams();
  const nav = useNavigate();

  const { data: movie, isLoading, isError, refetch } = useMovieDetail(movieId);
  const { data: trailer } = useMovieVideos(movieId);
  const close = () => nav(-1);

  const formattedDate = movie?.release_date
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(movie.release_date))
    : null;

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-screen/80 p-4"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={movie ? `${movie.title} 상세정보` : "영화 상세정보"}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-velvet">
            영화 상세
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="닫기"
            className="flex size-11 cursor-pointer items-center justify-center rounded-full text-fog transition-colors duration-200 hover:bg-surface-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velvet"
          >
            ✕
          </button>
        </div>

        {isLoading && <Loader label="상세정보 불러오는 중..." />}
        {isError && (
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <p className="text-sm text-fog">영화 정보를 불러오지 못했어.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="cursor-pointer rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velvet"
            >
              다시 시도
            </button>
          </div>
        )}

        {movie && (
          <div className="p-6">
            {trailer ? (
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-surface-2">
                <iframe
                  className="size-full"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              movie.backdrop_path && (
                <img
                  src={`${BACKDROP_BASE}${movie.backdrop_path}`}
                  alt={movie.title}
                  width={780}
                  height={439}
                  className="aspect-video w-full rounded-xl object-cover"
                />
              )
            )}

            <h2 className="mt-5 text-xl font-bold text-ink">{movie.title}</h2>
            <p className="mt-1 text-sm tabular-nums text-fog">
              {formattedDate} · {movie.runtime}분 · ★{" "}
              {movie.vote_average?.toFixed(1)}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="rounded-full border border-line px-3 py-1 text-xs text-fog"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
