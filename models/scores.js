module.exports = function(sequelize, DataTypes) {
	let Scores = sequelize.define('Scores', {
		game_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
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