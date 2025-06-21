import create from './create';
import read from './read';
import deleteUser from './delete';
import update from './update';
import login from './login';
import logout from './logout';
import getAuthInfo from './getAuthInfo';
import addMovie from './addMovie';
import removeMovie from './removeMovie';

export default {
	create,
	read,
	getAuthInfo,
	update,
	delete: deleteUser,
	login,
	logout,
	addMovie,
	removeMovie,
};
