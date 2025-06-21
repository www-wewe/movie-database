import create from './create';
import read from './read';
import update from './update';
import deleteUser from './delete';
import addMovie from './addMovie';
import removeMovie from './removeMovie';

const userRepository = {
	create: create,
	read,
	update,
	delete: deleteUser,
	addMovie,
	removeMovie,
};

export default userRepository;
