import {
	Category,
	Director,
	Movie,
	Review,
	Role,
	User,
} from '@prisma/client';

// Users IDs
const adminId = '65393e2d-630a-4f2f-801f-8262ea67def2';
const johnDoeId = '50dca027-2270-4b99-a4e3-2da5923ba081';
const willSmithId = 'e2b539cd-ff03-4aa4-a646-d6848d41fcb5';
const alexBlackId = 'a6afbefd-2a02-4a58-bb7c-4aef18b29e8d';

// Categories IDs
const actionCategoryId = '45df7da5-dc30-44d6-86d0-7ed52134d297';
const comedyCategoryId = '03d278d5-0155-4ef1-bb5a-dd0d1d296b09';
const documentaryCategoryId = 'd32ac9d5-d1ad-49df-8ecd-9aba607cadbe';

// Users
const users: User[] = [
	// Admin
	{
		id: adminId,
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		isBlocked: false,
		userName: 'admin',
		avatar: null,
		hashedPassword:
			'$argon2id$v=19$m=65536,t=3,p=4$Q9njaNd62H2huSJYQvVEtg$RcZho3T35NNEoJht8LAPDYRN8iy+K60OgO7z8nNvGsQ', // "adminpassword"
		role: Role.ADMIN,
		email: 'movies.admin@gmail.com',
	},
	{
		id: johnDoeId,
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		isBlocked: false,
		userName: 'John Doe',
		avatar: null,
		hashedPassword:
      '$argon2id$v=19$m=65536,t=3,p=4$c/T6Uy+khja6EGSRgU7W5Q$x5odYgKjDhMOwJl78LQq8EKNHW9Kl2dz0Oy5ii5Zc6M', // "password"
		email: 'john.doe@gmail.com',
		role: Role.USER,
	},
	{
		id: willSmithId,
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		isBlocked: false,
		userName: 'Will Smith',
		avatar: null,
		hashedPassword:
      '$argon2id$v=19$m=65536,t=3,p=4$ZZ43rwaj8/Lgrb0KECLfKg$Z0pPQd8KrY51ZrGEOis1RK8twnCVR5n/z8c6cDbQGzY', // "strongpassword"
		email: 'will.smith@gmail.com',
		role: Role.USER,
	},
	{
		id: alexBlackId,
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		isBlocked: false,
		userName: 'Alex Black',
		avatar: null,
		hashedPassword:
      '$argon2id$v=19$m=65536,t=3,p=4$+hTUF6DaH7L5K2FANSnr3w$j42SnpzZi/I0wFAdO2f6+ZGdLTYwM6NPeE7lXx/DlLQ', // "qwertyuiop"
		email: 'alex.black@gmail.com',
		role: Role.USER,
	},
];

// Categories
const categories: Category[] = [
	{
		id: actionCategoryId,
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Action',
		picture: null,
	},
	{
		id: comedyCategoryId,
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Comedy',
		picture: null,
	},
	{
		id: '3e4127a2-a257-4b2b-bbbe-3f6059dfc4f2',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Crime',
		picture: null,
	},
	{
		id: documentaryCategoryId,
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Documentary',
		picture: null,
	},
	{
		id: '96995fc5-18d9-46dd-b744-4de7c051367e',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Horror',
		picture: null,
	},
	{
		id: '7a04d3ed-f392-4743-81a8-80c72f7e9752',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Sci-fi',
		picture: null,
	},
	{
		id: 'a6526d72-2569-4ade-b53e-e7c05186b80c',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Romantic',
		picture: null,
	},
	{
		id: 'ec675071-92a3-443d-878d-3915023bedfe',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Animated',
		picture: null,
	},
	{
		id: '957596ee-d11b-43a7-9498-b47f862489ff',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Drama',
		picture: null,
	},
];

// Directors
const directors: Director[] = [
	{
		id: '3cd56c17-8cfb-4310-af53-2a61a5707e58',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Chad Stahelski',
		birthDate: new Date('1968-09-20T12:00:00.000Z'),
		dateOfDeath: null,
		description:
      'Chad Stahelski (born September 20, 1968) is an American stuntman and film director. He directed the 2014 film John Wick and its three sequels. He has worked as a stuntman, stunt coordinator and second unit director on several films.',
		picture: null,
	},
	{
		id: 'a8abcd4c-f137-4543-86d3-f9018c4f4350',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Sam Mendes',
		birthDate: new Date('1965-08-01T12:00:00.000Z'),
		dateOfDeath: null,
		description:
      'Sir Samuel Alexander Mendes CBE (born 1 August 1965) is a British film and stage director, producer, and screenwriter. In 2000, Mendes was appointed a CBE for his services to drama, and he was knighted in the 2020 New Years Honours List. That same year, he was awarded the Shakespeare Prize by the Alfred Toepfer Foundation in Hamburg, Germany. In 2005, he received a lifetime achievement award from the Directors Guild of Great Britain. In 2008, The Daily Telegraph ranked him number 15 in their list of the "100 most powerful people in British culture".',
		picture: null,
	},
	{
		id: 'a819798e-e2b5-4f27-a303-02bce2a798ca',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Patrick Hughes',
		birthDate: new Date('1978-05-13T12:00:00.000Z'),
		dateOfDeath: null,
		description:
      'Patrick Hughes (born May 13, 1978) is an Australian film director and screenwriter.',
		picture: null,
	},
	{
		id: '29e01142-9196-46ab-92b5-cc2ec90b2f92',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Jean Girault',
		birthDate: new Date('1924-05-09T12:00:00.000Z'),
		dateOfDeath: new Date('1982-07-24T12:00:00.000Z'),
		description:
      'Jean Girault was born on May 9, 1924 in Villenauxe-la-Grande, Aube, France. He was a writer and director, known for The Gendarme of Saint-Tropez (1964), Jo (1971) and The Exchange Student (1967). He was previously married to Françoise Girault. He died on July 24, 1982 in Paris, France.',
		picture: null,
	},
	{
		id: 'b2f4cccc-5aa1-4c1b-9a23-76aedd18e189',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Jonás Karásek',
		birthDate: new Date('1976-05-05T12:00:00.000Z'),
		dateOfDeath: null,
		description:
      'Director, graphic designer and art director. He was born and lives in Bratislava. After studying applied design, he graduated from VŠVU, department of industrial design. As a graphic designer and art director, he worked in advertising companies in Vienna (Chocolate Multimedia Production), Sydney (Mcmann&Tate) and Bratislava (Wiktor Leo Burnett).',
		picture: null,
	},
	{
		id: 'aee131d2-7c6f-4bd7-8ffd-df1cdb41df30',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Lucie Jourdan',
		birthDate: new Date('1983-07-28T12:00:00.000Z'),
		dateOfDeath: null,
		description:
      'Lucie Jourdan is known for Our Father (2022), Taken at Birth (2019) and MSNBC Undercover (2007).',
		picture: null,
	},
	{
		id: '899d0cb7-6172-4113-9dc7-4d557e07afee',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		name: 'Ali Tabrizi',
		birthDate: new Date('1993-10-08T12:00:00.000Z'),
		dateOfDeath: null,
		description:
      'Ali Tabrizi is an investigative documentary filmmaker, conservationist, and director of the renown Netflix Original documentary, Seaspiracy. He is the founder of Disrupt Studios and an inspiring speaker on sustainability, conservation, human and animal rights and the future of food.',
		picture: null,
	},
];

// Movies

const movies: Movie[] = [
	{
		id: '2f32abdb-c5a9-4edc-8603-fa7cbe4fb065',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		title: 'John Wick',
		originalTitle: 'John Wick',
		description:
      'An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.',
		language: 'English',
		directorId: '3cd56c17-8cfb-4310-af53-2a61a5707e58',
		categoryId: actionCategoryId,
		duration: 101,
		cast: 'Keanu Reeves, Michael Nyqvist, Alfie Allen',
		picture: null,
		releaseDate: new Date('2014-09-19T12:00:00.000Z'),
	},
	{
		id: 'a0f5e7d5-612e-4f75-a884-dee8bb5efea5',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		title: 'Skyfall',
		originalTitle: 'Skyfall',
		description:
      'James Bond\'s loyalty to M is tested when her past comes back to haunt her. When MI6 comes under attack, 007 must track down and destroy the threat, no matter how personal the cost.',
		language: 'English',
		directorId: 'a8abcd4c-f137-4543-86d3-f9018c4f4350',
		categoryId: actionCategoryId,
		duration: 143,
		cast: 'Daniel Craig, Javier Bardem, Naomie Harris',
		picture: null,
		releaseDate: new Date('2012-10-23T12:00:00.000Z'),
	},
	{
		id: '6c122b8d-f814-4511-a018-ebf98d8bcd8a',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		title: 'The Man from Toronto',
		originalTitle: 'The Man from Toronto',
		description:
      'The world\'s deadliest assassin and New York\'s biggest screw-up are mistaken for each other at an Airbnb rental.',
		language: 'English',
		directorId: 'a819798e-e2b5-4f27-a303-02bce2a798ca',
		categoryId: actionCategoryId,
		duration: 110,
		cast: 'Kevin Hart, Woody Harrelson, Jasmine Mathews',
		picture: null,
		releaseDate: new Date('2022-06-24T12:00:00.000Z'),
	},
	{
		id: '136f20be-bae0-494a-a997-da85dacf4690',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		title: 'The Gendarme Takes Off',
		originalTitle: 'Le gendarme en balade',
		description:
      'The entire squad of gendarmes from Saint-Tropez has been retired. But there is no such power that could stop them from protecting the law and public order.',
		language: 'English',
		directorId: '29e01142-9196-46ab-92b5-cc2ec90b2f92',
		categoryId: comedyCategoryId,
		duration: 107,
		cast: 'Louis de Funès, Jean Lefebvre, Guy Grosso',
		picture: null,
		releaseDate: new Date('1970-10-28T12:00:00.000Z'),
	},
	{
		id: '22bb6167-8daf-4c21-9972-11ac2ec98d83',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		title: 'Disabled',
		originalTitle: 'Invalid',
		description:
      'The entire squad of gendarmes from Saint-Tropez has been retired. But there is no such power that could stop them from protecting the law and public order.',
		language: 'Slovak',
		directorId: 'b2f4cccc-5aa1-4c1b-9a23-76aedd18e189',
		categoryId: comedyCategoryId,
		duration: 108,
		cast: 'Gregor Holoska, Zdenek Godla, Helena Krajciová',
		picture: null,
		releaseDate: new Date('2023-02-09T12:00:00.000Z'),
	},
	{
		id: 'a9106fd9-24a1-433f-8fda-476889515b8e',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		title: 'Our Father',
		originalTitle: 'Our Father',
		description:
      'After a woman\'s at-home DNA test reveals multiple half-siblings, she discovers a shocking scheme involving donor sperm and a popular fertility doctor.',
		language: 'English',
		directorId: 'aee131d2-7c6f-4bd7-8ffd-df1cdb41df30',
		categoryId: documentaryCategoryId,
		duration: 97,
		cast: 'Jacoba Ballard, Julie Harmon, Matt White',
		picture: null,
		releaseDate: new Date('2022-05-11T12:00:00.000Z'),
	},
	{
		id: '580c8b18-8134-401e-8fe5-f967e9fa7ca2',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		updatedAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		title: 'Seaspiracy',
		originalTitle: 'Seaspiracy',
		description:
      'Passionate about ocean life, a filmmaker sets out to document the harm that humans do to marine species - and uncovers alarming global corruption.',
		language: 'English',
		directorId: '899d0cb7-6172-4113-9dc7-4d557e07afee',
		categoryId: documentaryCategoryId,
		duration: 89,
		cast: 'Ali Tabrizi, Richard O\'Barry, Lucy Tabrizi',
		picture: null,
		releaseDate: new Date('2022-03-24T12:00:00.000Z'),
	},
];

// Reviews
const reviews: Review[] = [
	{
		id: '189cfc04-746e-47a7-9c79-eaf0967d47cb',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		content: 'You will not eat fish after watching this film!',
		movieId: '580c8b18-8134-401e-8fe5-f967e9fa7ca2',
		userId: johnDoeId,
		rating: 5,
	},
	{
		id: '0245c755-773f-442f-b6a1-2b0282637995',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		content: 'This film opened my eyes',
		movieId: '580c8b18-8134-401e-8fe5-f967e9fa7ca2',
		userId: willSmithId,
		rating: 4,
	},
	{
		id: '58f6c26f-0cf5-4b56-a0e3-3209629dc3a7',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		content: 'It was boring...',
		movieId: '580c8b18-8134-401e-8fe5-f967e9fa7ca2',
		userId: alexBlackId,
		rating: 2,
	},
	{
		id: 'efd840b4-f1d8-4c14-85aa-d52e29caa39a',
		createdAt: new Date('2023-06-03T12:00:00.000Z'),
		deletedAt: null,
		content: 'BEST MOVIE EVEEEEEEEEEEEER',
		movieId: '136f20be-bae0-494a-a997-da85dacf4690',
		userId: alexBlackId,
		rating: 5,
	},
];

export default {
	users,
	categories,
	directors,
	movies,
	reviews,
};
