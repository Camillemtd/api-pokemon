const { ValidationError, UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');
const { User } = require('../db/sequelize');

module.exports = (app) => {
  app.post('/api/newuser', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => { 
      if (err) {
        return res.status(500).json({ message: "Erreur lors du hachage du mot de passe", data: err });
      }

      User.create({ username, password: hash })
        .then(user => {
          const message = `Le user ${username} a bien été créé.`;
          res.json({ message, data: user });
        })
        .catch(error => {
          if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error });
          }
          if (error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message, data: error });
          }
          const message = "Le user n'a pas pu être ajouté. Réessayez dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    });
  });
};
