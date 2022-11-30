// RUTAS - Aquí recibiremos las peticiones del cliente y enviaremos al controlador las tareas a realizar sobre la BD

module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller.js');
    var router = require("express").Router();

    // Nuevo libro
    router.post("/",tutorials.create);

    // Devolver libros
    router.get("/",tutorials.findAll);

    // Devolver un libro por isbn
    router.get("/:id",tutorials.findOne);

    // Actualizar un libro por isbn
    router.put("/:id",tutorials.update);

    // Eliminar un libro por isbn
    router.delete("/:id",tutorials.delete);

    // eliminar todos
    router.delete("/",tutorials.deleteAll);

    app.use("/api/tutorials",router);
};