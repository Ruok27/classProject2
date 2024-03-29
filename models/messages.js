module.exports = function(sequelize, DataTypes) {
	let Messages = sequelize.define('Messages', {
        message_encrypt: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [ 1 ]
			}
		},
		message_decrpyt: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [ 1 ]
			}
		}
	});
	return Messages;
};