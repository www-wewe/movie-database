import expressSession from 'express-session';

// Creates new cookie session
const session = () =>
	expressSession({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: false,
		},
	});

export default session;
