import { api } from "@/redux/api/apiSlice";

interface IGenericCredentials {
  email: string;
  password: string;
}

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data: IGenericCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    userSignUp: builder.mutation({
      query: (data: IGenericCredentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (id: string) => `/user/${id}`,
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignUpMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = userApi;
