module.exports = function(sequelize, DataTypes) {
	let Scores = sequelize.define('Scores', {
		score: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
				len: [ 1 ]
			}
		}
	});
	return Scores;
};