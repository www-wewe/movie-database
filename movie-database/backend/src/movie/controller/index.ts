import create from './create';
import read from './read';
import update from './update';
import deleteMovie from './delete';

export default {
	create,
	read,
	update,
	delete: deleteMovie,
};
