export interface User {
	email: string;
	password: string;
}

export interface UserResponse {
	accessToken: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignUpRequest extends LoginRequest {}

export interface SignUpResponse {
	id: number;
}

export interface Slot {
	id: number;
	specialist: string;
	time: Date;
	authorId: number | null;
	author: Author;
	doctor: Author;
}

interface Author {
	id: number;
	email: string;
	specialisation: string | null;
	name: string | null;
	type: string;
}

export interface Doctor {
	id: number;
	name: string;
	specialisation: string;
}
