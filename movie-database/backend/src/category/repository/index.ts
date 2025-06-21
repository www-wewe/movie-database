import create from './create';
import read from './read';
import update from './update';
import deleteCategory from './delete';

const categoryRepository = {
	create,
	read,
	update,
	delete: deleteCategory,
};

export default categoryRepository;
