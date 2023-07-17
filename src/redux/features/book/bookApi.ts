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
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }),
    }),
    searchBooks: builder.query({
      query: ({ search }) => ({
        url: `/books?searchTerm=${search}`,
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/addReview/${id}`,
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: data,
      }),
    }),
    addToWishlist: builder.mutation({
      query: (id) => ({
        url: `/books/addToWishlist/${id}`,
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }),
    }),
    addToCurrentlyReading: builder.mutation({
      query: (id) => ({
        url: `/books/addToCurrentlyReading/${id}`,
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }),
    }),
    getFilteredBooks: builder.query({
      query: ({ genre, publicationDate }) =>
        `/books?genre=${genre}&publicationDate=${publicationDate}`,
    }),
    finishedReading: builder.mutation({
      query: (id) => ({
        url: `/books/finishedReading/${id}`,
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }),
    }),
  }),
});

export const {
  useGetTopBooksQuery,
  useGetAllBooksQuery,
  useGetBookDetailQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useLazySearchBooksQuery,
  useLazyGetAllBooksQuery,
  useAddReviewMutation,
  useAddToWishlistMutation,
  useAddToCurrentlyReadingMutation,
  useLazyGetFilteredBooksQuery,
  useFinishedReadingMutation,
} = productApi;
