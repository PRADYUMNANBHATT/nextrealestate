// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/user/" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => {
        return {
          url: "register",
          method: "POST",
          body: user,
          headers: { "Content-type": "application/json" },
        };
      },
    }),
    verifyemail: builder.mutation({
      query: (user) => {
        return {
          url: "verifyemail",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: `userlogin`,
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
    getUser: builder.query({
      query: () => {
        return {
          url: `my-profile`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: "logout",
          method: "POST",
          body: {},
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
    passwordResetLink: builder.mutation({
      query: (user) => {
        return {
          url: "reset-password-link",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/change-password`,
          method: "POST",
          body: data,
          // headers: {
          //   "Content-type": "application/json",
          // },
          credentials: "include",
        };
      },
    }),
    changePassword: builder.mutation({
      query: (user) => {
        return {
          url: "reset-password-link",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateUserMutation,
  useVerifyemailMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  usePasswordResetLinkMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
