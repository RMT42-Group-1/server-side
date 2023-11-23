function errorHandler(err, req, res, next) {
	console.log(err);
	let status, message;

	switch (err.name) {
		case 'BadRequest':
		case 'SequelizeUniqueConstraintError':
			status = 400;
			message = err.message;
			break;

		case 'SequelizeValidationError':
			status = 400;
			message = err.errors[0].message;
			break;

		case 'JsonWebTokenError':
			status = 401;
			message = 'Invalid token';
			break;

		case 'Unauthenticated':
			status = 401;
			message = err.message ?? 'Unauthenticated';
			break;

		default:
			status = 500;
			message = 'Internal server error';
	}

	res.status(status).json({ message });
}

module.exports = errorHandler;
