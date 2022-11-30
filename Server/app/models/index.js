const dbConfig = require("../config/db.config.js"); // Ruta de la BD
const mongoose = require("mongoose"); // Para facilitar las conexiones de la BD

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose); // recupera la coleccion (será llamado por el controlador)

module.exports = db;