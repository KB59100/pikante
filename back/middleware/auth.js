const jwt = require("jsonwebtoken");//package token 

module.exports = (req, res, next) => {
  try {//on récupère le token dans autorisation
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");//verifie le token avec la clé secrète
    const userId = decodedToken.userId;//récupère le userId
    req.auth = { userId }; //seul le propriétaire de la sauce peut la supprimer
    if (req.body.userId && req.body.userId !== userId) {//si jamais ya userId différent
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
