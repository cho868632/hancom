const BASE_URL = "https://api.themoviedb.org/3";

async function tmdbFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("language", "ko-KR");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function discoverMovies({ genreIds = [], sortBy = "popularity.desc", page = 1 }) {
  return tmdbFetch("/discover/movie", {
    with_genres: genreIds.join(","),
    sort_by: sortBy,
    include_adult: false,
    page,
  });
}

export function fetchMovieDetail(movieId) {
  return tmdbFetch(`/movie/${movieId}`);
}

export function fetchMovieVideos(movieId) {
  return tmdbFetch(`/movie/${movieId}/videos`);
}
