import prisma from '../../prismaClient';
import { Result } from '@badrap/result';
import { DirectorCreateData } from '../types/data';
import { DirectorResult } from '../types/return';

const create = async (data: DirectorCreateData): DirectorResult => {
	try {
		const director = await prisma.director.create({
			data,
		});

		return Result.ok(director);
	} catch (e) {
		return Result.err(e as Error);
	}
};

export default create;
