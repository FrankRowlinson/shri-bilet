import { API_ROUTES, BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovie: builder.query<Movie, string>({
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
    getMoviesForMainPage: builder.query<Movie[], string>({
      async queryFn(cinemaId, _queryApi, _extraOptions, fetchWithBQ) {
        if (!cinemaId) {
          const response = await fetchWithBQ(`${API_ROUTES.movies}`);
          return response.data
            ? { data: response.data as Movie[] }
            : { error: response.error as FetchBaseQueryError };
        }
        const response = await fetchWithBQ(
          `${API_ROUTES.moviesByCinemaId}${cinemaId}`
        );
        return response.data
          ? { data: response.data as Movie[] }
          : { error: response.error as FetchBaseQueryError };
      },
    }),
  }),
});

export const {
  useGetMovieQuery,
  useGetMoviesForCartQuery,
  useGetMoviesForMainPageQuery,
} = moviesApi;
