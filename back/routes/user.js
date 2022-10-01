const express = require("express");
const router = express.Router();//création du router

const userCtrl = require("../controllers/user");//controlleur pr assurer les fonctions aux différentes routes

router.post("/signup", userCtrl.signup);//route post car le front va envoyer également des infos
router.post("/login", userCtrl.login);

module.exports = router;//export du router pour l'exporter dans app.js

