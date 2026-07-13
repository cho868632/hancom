import { useNavigate, useParams } from "react-router";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { mbtiType } = useParams();

  return (
    <button
      type="button"
      onClick={() => navigate(`/result/${mbtiType}/movie/${movie.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface text-left transition-colors duration-200 hover:border-tungsten focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tungsten"
    >
      <div className="aspect-2/3 w-full overflow-hidden bg-surface-2">
        {movie.poster_path ? (
          <img
            src={`${POSTER_BASE}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            width={342}
            height={513}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-fog">
            포스터 없음
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-semibold text-ink">{movie.title}</p>
        <p className="mt-1 text-xs tabular-nums text-fog">★ {movie.vote_average?.toFixed(1)}</p>
      </div>
    </button>
  );
};

export default MovieCard;
