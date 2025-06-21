import create from './create';
import read from './read';
import update from './update';
import deleteCategory from './delete';

export default {
	create,
	read,
	update,
	delete: deleteCategory,
};
