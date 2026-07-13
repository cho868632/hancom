import { useQuery } from "@tanstack/react-query";
import { fetchMovieVideos } from "../api/tmdb";

export function useMovieVideos(movieId) {
  return useQuery({
    queryKey: ["movie-videos", movieId],
    queryFn: () => fetchMovieVideos(movieId),
    enabled: !!movieId,
    select: (data) =>
      data.results?.find((v) => v.site === "YouTube" && v.type === "Trailer") ?? null,
  });
}
