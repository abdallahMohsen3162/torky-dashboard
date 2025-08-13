"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const distributorsApi = createApi({
  reducerPath: "distributorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getDistributors: builder.query<any, any>({
      query: ({id}) => `/distributors/${id}`,
    }),

    distributorsAnalyses: builder.query<any, void>({
      query: () => "/distributors/analyses",
    }),
    
  }),
});

export const { 
  useGetDistributorsQuery,
  useDistributorsAnalysesQuery
 } = distributorsApi;
