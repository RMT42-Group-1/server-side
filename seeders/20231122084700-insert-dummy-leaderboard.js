'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const leaderboard = require('../data/leaderboard.json').map((data) => {
			data.createdAt = data.updatedAt = new Date();
			return data;
		});
		await queryInterface.bulkInsert('Scores', leaderboard);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Scores', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
