import { API_ROUTES, BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({ query: () => API_ROUTES.movies }),
    getMoviesByCinemaId: builder.query<Movie[], string>({
      query: (cinemaId) => `${API_ROUTES.moviesByCinemaId}${cinemaId}`,
    }),
    getMovie: builder.query<Movie[], string>({
      query: (id) => `${API_ROUTES.movieById}${id}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMoviesByCinemaIdQuery,
  useGetMovieQuery,
} = moviesApi;
