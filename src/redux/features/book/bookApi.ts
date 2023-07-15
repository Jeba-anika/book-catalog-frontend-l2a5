import { api } from "@/redux/api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books?limit=10",
    }),
  }),
});

export const { useGetBooksQuery } = productApi;
