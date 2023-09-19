const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemons");
const pokemons = require("./mock-pokemon");
const UserModel = require("../models/user");

let sequelize;
if (process.env.NODE_ENV === 'production') {
   sequelize = new Sequelize(
    "tvfos9ld3ymssbga",
    "ettnbf40nlg16ot1",
    "wxxgha7v6a32z5ac",
    {
      host: "un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: "mariadb",
      dialectOptions: {
        timezone: "Etc/GMT-2",
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
  return sequelize.sync().then((_) => {
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
