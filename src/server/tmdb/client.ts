const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const tmdbFetch = async <T>(path: string): Promise<T> => {
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TMBD_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.statusText} ${response.status}`);
  }

  return response.json();
};
