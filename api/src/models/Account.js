const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("account", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
		},

		mail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		fullname: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		dni: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		ubication: {
			type: DataTypes.STRING,
		},

		birth_date: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		balance: {
			type: DataTypes.FLOAT,
			defaultValue: 0,
		},

		cvu: {
			type: DataTypes.STRING,
		},

		photo: {
			type: DataTypes.TEXT,
		},

		admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},

		card: {
			type: DataTypes.JSON,
		},

		activated: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		faceDescriptor: {
			// una manera que encontre en stackoverflow de declarar array de objetos
			type: DataTypes.STRING(35000),
			get: function () {
				return JSON.parse(this.getDataValue("faceDescriptor"));
			},
			set: function (value) {
				return this.setDataValue(
					"faceDescriptor",
					JSON.stringify(value)
				);
			},
		},
	});
};
