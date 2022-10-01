const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");//sert a importer le package de unik validateur

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },//unique true sert a ce que un mail puisse s'inscrire qu'une fois
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
