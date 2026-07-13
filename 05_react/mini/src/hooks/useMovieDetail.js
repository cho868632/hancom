import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "../api/tmdb";

export function useMovieDetail(movieId) {
  return useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => fetchMovieDetail(movieId),
    enabled: !!movieId,
  });
}
