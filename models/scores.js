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
	Scores.associate = function(models) {
		Scores.belongsTo(models.Users, {
			foreignKey: {
				allowNull: false
			}
		})
	};
	return Scores;
};