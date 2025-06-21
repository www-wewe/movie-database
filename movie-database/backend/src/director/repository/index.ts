import create from './create';
import read from './read';
import update from './update';
import deleteDirector from './delete';

const directorRepository = {
	create,
	read,
	update,
	delete: deleteDirector,
};

export default directorRepository;
