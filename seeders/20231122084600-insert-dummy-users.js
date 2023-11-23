'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const users = require('../data/users.json').map((data) => {
			data.createdAt = data.updatedAt = new Date();
			data.password = hashPassword(data.password);
			data.photoUrl = 'https://i.imgur.com/4gaSugI.jpg';
			return data;
		});
		await queryInterface.bulkInsert('Users', users);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
