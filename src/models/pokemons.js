const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déja pris",
        },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas etre vide " },
          notNull: { msg: "Le nom est une propriété requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utiliser uniquement des nombres entiers pour les points de vie",
          },
          notNull: { msg: "Les points de vie sont une propriété requise" },
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égales à 0.",
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent être inférieurs ou égales à 999.",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utiliser uniquement des nombres entiers pour les points d'attaque",
          },
          notNull: { msg: "Les points d'attaque sont une propriété requise" },
          min: {
            args: [0],
            msg: "Les points de dégat doivent être supérieurs ou égales à 0.",
          },
          max: {
            args: [99],
            msg: "Les points de dégat doivent être inférieurs ou égales à 99.",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Utiliser uniquement des url valide pour les images" },
          notNull: { msg: "les images sont une propriété requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        // Getter : Base de données => API Rest
        get() {
          return this.getDataValue("types").split(",");
        },
        // Setter : API Rest => Base de données
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypeValid(value) {
            if (!value) {
              throw new Error("Un pokémon doit au mois avoir un type");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Un pokémon ne peux pas avoir plus de trois types"
              );
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste suivant : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
