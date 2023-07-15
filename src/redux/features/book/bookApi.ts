import { api } from "@/redux/api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
    }),
    getTopBooks: builder.query({
      query: () => "/books?limit=10",
    }),
  }),
});

export const { useGetTopBooksQuery, useGetAllBooksQuery } = productApi;
