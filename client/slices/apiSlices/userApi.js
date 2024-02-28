import { api } from "./api";
import { USER_URL } from "../constants";

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signIn`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
 
export const { useSigninMutation, useSignupMutation } = userApiSlice;
