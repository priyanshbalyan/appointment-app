import React from "react";

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
		path: "/",
		component: SignInPage,
		name: "SignInPage",
	},
	{
		path: "/appointments",
		component: AppointmentsPage,
		name: "Appointments",
	},
	{
		path: "/signup",
		component: SignUpPage,
		name: "SignUp",
	},
	{
		path: "/book",
		component: BookingPage,
		name: "Booking",
	},
];

export default routes;
