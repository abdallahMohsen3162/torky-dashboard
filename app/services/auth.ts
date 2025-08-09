"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getMyProfile: builder.query<any, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",  
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),

    updateProfile: builder.mutation<any, any>({
      query: (profileData) => ({
        url: "/auth/profile",
        method: "PATCH",
        body: profileData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),

    
  }),
});

export const { useLoginMutation, useGetMyProfileQuery, useUpdateProfileMutation } = authApi;
