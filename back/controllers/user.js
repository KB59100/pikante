const bcrypt = require('bcrypt');//package de cryptage
const User = require('../models/User');
const jwt = require("jsonwebtoken");//package des token

//Pour l'enregistrement de nvo utilisateurs
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)//hash sert a crypter le mdp afin de ne pas le stocker
    .then((hash) => {
      const user = new User({//enregistrement dans la base de donné avec new user
        email: req.body.email,
        password: hash,
      });
      user
        .save()//enregistrement base de données
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


//pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              //chaîne secrète de développement temporaire
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
