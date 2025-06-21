import data from './data';
import prisma from '../prismaClient';
import { Category, Director, Movie, Review, User } from '@prisma/client';


// Create users queries
const userCreateQueries = data.users.map((user: User) =>
	prisma.user.create({
		data: {
			...user,
		},
	})
);

// Create categories queries
const categoryCreateQueries = data.categories.map((category: Category) =>
	prisma.category.create({
		data: {
			...category,
		},
	})
);

// Create directors queries
const directorCreateQueries = data.directors.map((director: Director) =>
	prisma.director.create({
		data: {
			...director,
		},
	})
);

// Create movies queries
const movieCreateQueries = data.movies.map((movie: Movie) =>
	prisma.movie.create({
		data: {
			...movie,
		},
	})
);

// Create review queries
const reviewCreateQueries = data.reviews.map((review: Review) =>
	prisma.review.create({
		data: {
			...review,
		},
	})
);

const seed = async () => {
	console.log(`[${new Date(Date.now()).toISOString()}]: Seeding started`);
	try {
		await prisma.$transaction([
			...userCreateQueries,
			...categoryCreateQueries,
			...directorCreateQueries,
			...movieCreateQueries,
			...reviewCreateQueries,
		]);

		console.log(`[${new Date(Date.now()).toISOString()}]: Seeding successful!`);
	} catch (e) {
		console.log(e);
		console.log(
			`[${new Date(
				Date.now()
			).toISOString()}]: Seeding was not successful. Aborting!`
		);
	}
};

seed();
