import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, UserResponse } from "../../interfaces/Auth";
import { RootState } from "../store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const rootState: RootState = getState() as RootState;
      let token = rootState.auth.token;
      token = token || localStorage.getItem("token");
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  reducerPath: "authAPI",
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials
      }),
      transformResponse: (rawResult: { data: UserResponse }) => {
        return rawResult.data
      }
    }),
    protected: builder.mutation({
      query: () => "protected"
    })
  })
});

export const { useLoginMutation, useProtectedMutation } = api;
