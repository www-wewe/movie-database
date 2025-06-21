import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { CategoryCreateData } from '../types/data';
import { CategoryResult } from '../types/return';

const create = async (data: CategoryCreateData): CategoryResult => {
	try {
		const category = await prisma.category.create({
			data,
		});

		return Result.ok(category);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default create;
