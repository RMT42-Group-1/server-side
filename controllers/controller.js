const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { signToken, verifyToken } = require('../helpers/jwt');
const { User, Score, Card } = require('../models');

class Controller {
	static async register(req, res, next) {
		try {
			const { username, email, password } = req.body;

			const user = await User.create({ username, email, password });
			res.status(201).json({ username: user.username, email: user.email });
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email) {
				throw {
					name: 'BadRequest',
					message: 'Email is required',
				};
			}
			if (!password) {
				throw {
					name: 'BadRequest',
					message: 'Password is required',
				};
			}

			const user = await User.findOne({
				where: { email },
			});
			if (!user) {
				throw {
					name: 'Unauthenticated',
					message: 'Invalid email or password',
				};
			}

			const valid = comparePassword(password, user.password);
			if (!valid) {
				throw {
					name: 'Unauthenticated',
					message: 'Invalid email or password',
				};
			}

			const token = signToken({
				id: user.id,
				username: user.username,
				email: user.email,
			});
			res.status(200).json({ access_token: token });
		} catch (err) {
			next(err);
		}
	}

	static async getCards(req, res, next) {
		try {
			const cards = await Card.findAll();
			res.status(200).json(cards);
		} catch (err) {
			next(err);
		}
	}

	static async getScores(req, res, next) {
		try {
			const scores = await Score.findAll({
				order: [
					['point', 'DESC'],
					['updatedAt', 'ASC'],
				],
			});
			res.status(200).json(scores);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;
