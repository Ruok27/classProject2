module.exports = function(sequelize, DataTypes) {
	let Users = sequelize.define('Users', {
		username: {
			type: DataTypes.TEXT,
			allowNull: true,
			default: "Tom",
			validate: {
				len: [ 1 ]
			}
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: true,
			validate: {
				len: [ 1 ]
			}
		}
	});
	return Users;
};
