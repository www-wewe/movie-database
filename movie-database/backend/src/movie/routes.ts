import express from 'express';
import MovieController from './controller/index';
import ReviewController from '../review/controller/index';
import { Role } from '@prisma/client';
import auth from '../middleware/authMiddleware';

const movieRouter = express.Router();

movieRouter.post('/', auth(Role.ADMIN), MovieController.create);

movieRouter.get('/', MovieController.read.all);

movieRouter.get('/:id', MovieController.read.specificById);

movieRouter.get('/category/:categoryId', MovieController.read.allByCategory);

movieRouter.get('/director/:directorId', MovieController.read.allByDirector);

movieRouter.put('/:id', auth(Role.ADMIN), MovieController.update);

movieRouter.delete('/:id', auth(Role.ADMIN), MovieController.delete);

// Review routes
movieRouter.post('/:movieId/review', auth(Role.USER), ReviewController.create);

movieRouter.delete(
	'/:movieId/review/:reviewId',
	auth(Role.USER),
	ReviewController.delete
);

export default movieRouter;
