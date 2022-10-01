const express = require("express");
const mongoose = require("mongoose");
const path = require("path");//donne accès au chemin
require("dotenv").config();


const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");


//ce qui permet d'implémenter mongoose
mongoose
 .connect(
    process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(express.json()); //intercepte tte les requêtes qui contiennent du json



//ajout des en tête a notre navigateur-middleware général qui sera effectué a ttes les routes
//pour que tout le monde puisse se connecter'*' et éviter les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

//Gestion des routes principales
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
