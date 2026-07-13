import { useQuery } from "@tanstack/react-query";
import { discoverMovies } from "../api/tmdb";
import { MOVIE_TYPES } from "../constants/mbtiMap";

export function useMovieList(mbtiType) {
  const profile = MOVIE_TYPES[mbtiType];

  return useQuery({
    queryKey: ["movies", mbtiType],
    queryFn: async () => {
      const pages = await Promise.all(
        [1, 2, 3].map((page) =>
          discoverMovies({
            genreIds: profile.genreIds,
            sortBy: "popularity.desc",
            page,
          }),
        ),
      );
      return pages.flatMap((p) => p.results ?? []);
    },
    enabled: !!profile,
    select: (results) =>
      results
        .filter((m) => m.overview?.trim())
        // .sort((a, b) => (b.release_date ?? "").localeCompare(a.release_date ?? ""))
        .slice(0, 12),
  });
}
