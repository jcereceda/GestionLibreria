const db = require("../models") 
const Tutorial = db.tutorials; // Variable para recuperar la coleccion de la BD sobre la que trabajar
const mongoose = require('mongoose');

// Crear y guardar un nuevo libro
exports.create = (req,res) => {
    // Validar peticion
    if(!req.body.titulo){
        res.status(400).send({message: "Debe de estar el campo completo"})
        return;
    }

    // crear un libro
    const tutorial  = new Tutorial({
        titulo : req.body.titulo,
        autor: req.body.autor,
        isbn: req.body.isbn,
        numPags: req.body.numPags,
        precio: req.body.precio
    });

    // Guardar libro en la BD
    tutorial
        .save(tutorial)
        .then(data =>{
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurrido durante la creacion"
            });
        });
    };

// Devolver libros de la BD

exports.findAll = (req,res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { $regex: new RegExp(titulo), $options: "i"}} : {};  
    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error ocurrido consultando los libros"
            });
        });
};

// buscar un libro por id en la BD
exports.findOne = (req,res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Recurso no encontrado con id " + id});
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error buscando el recurso con id " + id})
        });
};

// Actualizar libro

exports.update = (req,res) => {
    if (!req.body){
        return res.status(400).send({message: "Los datos a actualizar no pueden estar vacios"});
    }


var id = { _id: mongoose.Types.ObjectId(req.params.id)}

Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data){
            res.status(404).send({message: `Libro con id ${id} No encontrado`});
        } else {
            res.send({message: "Actualizado correctamente"})
        }
    })
    .catch(err => {
        res.status(500).send({message: 'Error actualizando libro con id' + id});
    });
};

// Eliminar un libro por isbn

exports.delete = (req,res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({message: "No se puede eliminar porque no existe"});
            } else {
                res.send({message: "Eliminado satisfactoriamente"});
            }
        }).catch(err => {
            res.status(500).send({message: "Error mientras se eliminaba el libro"})
        });
};

// ELiminar todos los libros
exports.deleteAll = (req,res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({message: `${data.deletedCount} Libros eliminados satisfactoriamente`});
        }).catch(err => {
            res.status(500).send({message: "Error mientras se eliminaban los libros"})
        });
};

