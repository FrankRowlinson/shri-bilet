import { API_ROUTES, BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cinemasApi = createApi({
  reducerPath: "cinemasApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCinemas: builder.query<Cinema[], void>({
      query: () => API_ROUTES.cinemas,
    }),
  }),
});

export const { useGetCinemasQuery } = cinemasApi;
