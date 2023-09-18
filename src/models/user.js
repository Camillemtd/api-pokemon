module.exports = (sequelize, DataTypes) => {
	return sequelize.define('User', {
	  id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	  },
	  username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: {
			msg:'Le nom est déja pris.'
		},
		validate: {
			notEmpty: { msg: "L'username ne peut pas etre vide " },
			notNull: { msg: "L'username est une propriété requise" },
		  },
	  },
	  password: {
		type: DataTypes.STRING
	  }
	})
  }