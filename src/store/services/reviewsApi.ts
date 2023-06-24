import { API_ROUTES, BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getReviewsForMovie: builder.query<Review[], string>({
      query: (id) => `${API_ROUTES.reviewsByMovieId}${id}`,
    }),
  }),
});

export const { useGetReviewsForMovieQuery } = reviewsApi;
