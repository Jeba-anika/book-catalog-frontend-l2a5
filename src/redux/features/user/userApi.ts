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
  }),
});

export const { useUserLoginMutation, useUserSignUpMutation } = userApi;
