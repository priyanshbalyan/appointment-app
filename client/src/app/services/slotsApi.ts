import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "app/store";
import { type Doctor, type Slot } from "common/types";

interface BookSlotRequest {
	time: Date;
	doctorId: number;
}

interface BookSlotResponse {
	id: number;
}

export const slotApi = createApi({
	reducerPath: "slotApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token !== null) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getSlots: builder.query<Slot[], void>({
			query: () => `slots`,
		}),
		getSlotsById: builder.query<Slot[], number>({
			query: (id) => `slots?docId=${id}`,
		}),
		getDoctors: builder.query<Doctor[], void>({
			query: () => "users/doctors",
		}),
		bookSlots: builder.mutation<BookSlotResponse, BookSlotRequest[]>({
			query: (body) => ({
				url: "/slots",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useGetSlotsQuery,
	useGetSlotsByIdQuery,
	useBookSlotsMutation,
	useGetDoctorsQuery,
} = slotApi;
