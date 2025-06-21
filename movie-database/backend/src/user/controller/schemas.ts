import * as z from 'zod';

const UserRegisterData = z.object({
	userName: z.string(),
	avatar: z.string().optional(),
	email: z.string().email(),
	password: z.string(),
});

const UserUpdateData = z.object({
	userName: z.string(),
	avatar: z.string().optional(),
});

const UserLoginData = z.object({
	email: z.string().email(),
	password: z.string(),
});

const UserMovieData = z.object({
	movieId: z.string(),
});

const UserUpdatePasswordData = z.object({
	oldPassword: z.string(),
	newPassword: z.string(),
});

export default {
	UserRegisterData,
	UserUpdateData,
	UserLoginData,
	UserMovieData,
	UserUpdatePasswordData,
};
