import { BASE_URL, API_ROUTES } from "@/constants";

export const getMoviesByCinemaId = async (cinemaId: string) => {
  const response = await fetch(
    `${BASE_URL}${API_ROUTES.moviesByCinemaId}${cinemaId}`,
    { cache: "no-cache" }
  );
  if (!response.ok) {
    throw new Error("Не удалось загрузить информацию с сервера");
  }
  return response.json();
};

export const getAllMovies = async () => {
  const response = await fetch(`${BASE_URL}${API_ROUTES.movies}`);
  if (!response.ok) {
    throw new Error("Не удалось загрузить информацию с сервера");
  }
  return response.json();
};
