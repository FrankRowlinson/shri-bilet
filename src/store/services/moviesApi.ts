import { API_ROUTES, BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
    getMoviesForCart: builder.query<Movie[], string[]>({
      async queryFn(ids, _queryApi, _extraOptions, fetchWithBQ) {
        const response = await Promise.all(
          ids.map((id) => fetchWithBQ(`${API_ROUTES.movieById}${id}`))
        );
        return response[0].data
          ? { data: response.map((movie) => movie.data) as Movie[] }
          : { error: response[0].error as FetchBaseQueryError };
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMoviesByCinemaIdQuery,
  useGetMovieQuery,
  useGetMoviesForCartQuery,
} = moviesApi;
