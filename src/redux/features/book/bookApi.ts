import { api } from "@/redux/api/apiSlice";
import { IBook } from "@/types/globalTypes";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
    }),
    getTopBooks: builder.query({
      query: () => "/books?limit=10",
    }),
    getBookDetail: builder.query({
      query: (id: number) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (data: IBook) => ({
        url: "/books",
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTopBooksQuery,
  useGetAllBooksQuery,
  useGetBookDetailQuery,
  useAddBookMutation,
} = productApi;
