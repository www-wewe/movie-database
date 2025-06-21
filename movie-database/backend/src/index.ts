import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from './middleware/sessionMiddleware';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './common/types';
import movieRouter from './movie/routes';
import userRouter from './user/routes';
import categoryRouter from './category/routes';
import directorRouter from './director/routes';
import { Role } from '@prisma/client';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string;
      userName: string;
      email: string;
      role: Role;
      isBlocked: boolean;
    };
  }
}

configEnvVariables();
const app = express();
const port = env.PORT ?? 3000;

// CORS middlware
app.use(
	cors({
		origin: 'http://localhost:4000',
		credentials: true,
	})
);

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session());

app.use('/movie', movieRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/director', directorRouter);

// No route was taken - 404 - Resource (API endpoint) not found.
app.use((_req, res) => {
	const response: ApiResponse<object> = {
		status: 'failure',
		data: {},
		error: 'No matching endpoint was found.',
	};

	return res.status(404).send(response);
});

app.listen(port, () => {
	console.log(
		`[${new Date().toISOString()}] RESTful API for Movie database is listening on port ${port}`
	);
});

export default app;
