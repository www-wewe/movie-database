import express from 'express';
import UserController from './controller/index';
import { Role } from '@prisma/client';
import auth from '../middleware/authMiddleware';

const userRouter = express.Router();

// CREATE
userRouter.post('/registration', UserController.create.user);
userRouter.post('/admin', auth(Role.ADMIN), UserController.create.admin);


// READ
userRouter.get('/', auth(Role.ADMIN), UserController.read.all);
userRouter.get('/auth-info', UserController.getAuthInfo);
userRouter.get(
	'/:id',
	auth(Role.ADMIN, Role.USER),
	UserController.read.specificById
);


// UPDATE
userRouter.put('/', auth(Role.USER, Role.ADMIN), UserController.update.profile);
userRouter.patch('/password', auth(Role.USER, Role.ADMIN), UserController.update.password);
userRouter.patch(
	'/favourites/add',
	auth(Role.USER),
	UserController.addMovie.toFavourites
);
userRouter.patch(
	'/watch-list/add',
	auth(Role.USER),
	UserController.addMovie.toWatchList
);
userRouter.patch(
	'/favourites/remove',
	auth(Role.USER),
	UserController.removeMovie.fromFavourites
);
userRouter.patch(
	'/watch-list/remove',
	auth(Role.USER),
	UserController.removeMovie.fromWatchList
);
userRouter.patch(
	'/block/:id',
	auth(Role.ADMIN),
	UserController.update.flipIsBlockedState
);


// DELETE
userRouter.delete('/:id', auth(Role.ADMIN), UserController.delete);


// AUTH
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);


export default userRouter;
