import { useNavigate } from "react-router";
import { GENRE_NAMES } from "../../constants/mbtiMap";

const ResultSummary = ({ profile }) => {
  const navigate = useNavigate();
  const genreNames = profile.genreIds
    .map((id) => GENRE_NAMES[id])
    .filter(Boolean);

  const goToType = (type) => navigate(`/result/${type.toLowerCase()}`);

  return (
    <section className="mt-8 rounded-2xl border border-line bg-surface p-6">
      <p className="text-sm font-semibold text-fog">
        {profile.emoji} {profile.nickname}
      </p>
      <p className="mt-3 text-base leading-relaxed text-ink">
        {profile.description}
      </p>

      <div className="mt-5 border-t border-line pt-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-velvet">
          추천 근거
        </p>
        <p className="mt-2 text-sm leading-relaxed text-fog">
          {profile.type} 취향 →{" "}
          <span className="text-ink">{genreNames.join(", ")}</span> 장르 위주로
          매칭, 최신 개봉작 우선으로 정렬
        </p>
        <p className="mt-2 text-sm text-fog">
          찰떡 궁합:{" "}
          <button
            type="button"
            onClick={() => goToType(profile.bestMatch)}
            className="cursor-pointer font-semibold text-tungsten underline decoration-dotted underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velvet"
          >
            {profile.bestMatch}
          </button>{" "}
          · 상극:{" "}
          <button
            type="button"
            onClick={() => goToType(profile.worstMatch)}
            className="cursor-pointer font-semibold text-velvet underline decoration-dotted underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velvet"
          >
            {profile.worstMatch}
          </button>
        </p>
      </div>
    </section>
  );
};

export default ResultSummary;
