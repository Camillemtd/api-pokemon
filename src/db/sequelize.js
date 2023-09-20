const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemons");
const pokemons = require("./mock-pokemon");
const UserModel = require("../models/user");
require('dotenv').config();


let sequelize;
if (process.env.NODE_ENV === 'production') {
   sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: process.env.DATABASE_DIALECT,
      dialectOptions: {
        timezone: process.env.DATABASE_TIMEZONE,
      },
      logging: true,
    }
  );
} else {
  sequelize = new Sequelize("pokedex", "root", "", {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: false,
  });
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true}).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
