import React from "react";
import { Endpoints } from "features/router/endpoints";

const SignInPage = React.lazy(
	async () => await import("pages/SignInPage/SignInPage"),
);
const SignUpPage = React.lazy(
	async () => await import("pages/SignUpPage/SignUpPage"),
);
const AppointmentsPage = React.lazy(
	async () => await import("pages/AppointmentsPage/AppointmentsPage"),
);
const BookingPage = React.lazy(
	async () => await import("pages/BookingPage/BookingPage"),
);

const routes = [
	{
		path: Endpoints.SIGN_IN,
		component: SignInPage,
		name: "SignInPage",
		requireAuth: false,
	},
	{
		path: Endpoints.SIGN_UP,
		component: SignUpPage,
		name: "SignUp",
		requireAuth: false,
	},
	{
		path: Endpoints.APPOINTMENTS,
		component: AppointmentsPage,
		name: "Appointments",
		requireAuth: true,
	},
	{
		path: Endpoints.BOOK,
		component: BookingPage,
		name: "Booking",
		requireAuth: true,
	},
];

export default routes;
