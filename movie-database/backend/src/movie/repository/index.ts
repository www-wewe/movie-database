import create from './create';
import read from './read';
import update from './update';
import deleteMovie from './delete';

const movieRepository = {
	create,
	read,
	update,
	delete: deleteMovie,
};

export default movieRepository;
