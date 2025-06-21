import express from 'express';
import CategoryController from './controller/index';
import { Role } from '@prisma/client';
import auth from '../middleware/authMiddleware';

const categoryRouter = express.Router();

categoryRouter.post('/', auth(Role.ADMIN), CategoryController.create);

categoryRouter.get('/', CategoryController.read.all);

categoryRouter.get('/:id', CategoryController.read.specificById);

categoryRouter.put('/:id', auth(Role.ADMIN), CategoryController.update);

categoryRouter.delete('/:id', auth(Role.ADMIN), CategoryController.delete);

export default categoryRouter;
