import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	type UserResponse,
	type LoginRequest,
	type SignUpResponse,
	type SignUpRequest,
} from "common/types";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "/",
	}),
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: "/auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
		signUp: builder.mutation<SignUpResponse, SignUpRequest>({
			query: (body) => ({
				url: "/users",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
