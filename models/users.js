module.exports = function(sequelize, DataTypes) {
	let Users = sequelize.define('Users', {
		username: {
			type: DataTypes.TEXT,
			allowNull: false,
			default: "Tom",
			validate: {
				len: [ 1 ]
			}
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [ 1 ]
			}
		}
	});
	Users.associate = function(models) {
		Users.hasMany(models.Scores, {
			onDelete: "cascade"
		})
	};
	return Users;
};
