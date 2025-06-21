import express from 'express';
import DirectorController from './controller/index';
import { Role } from '@prisma/client';
import auth from '../middleware/authMiddleware';

const directorRouter = express.Router();

directorRouter.post('/', auth(Role.ADMIN), DirectorController.create);

directorRouter.get('/', DirectorController.read.all);

directorRouter.get('/:id', DirectorController.read.specificById);

directorRouter.put('/:id', auth(Role.ADMIN), DirectorController.update);

directorRouter.delete('/:id', auth(Role.ADMIN), DirectorController.delete);

export default directorRouter;
