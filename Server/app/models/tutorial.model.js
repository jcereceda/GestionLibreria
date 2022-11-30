
module.exports = mongoose => {
    // Esquema de Cómo serán los objetos recuperados por la BD
    var schema = mongoose.Schema(
    {
        titulo: String,
        isbn: String,
        autor: String,
        numPags: Number,
        precio: Number 
    },
    {
        timestamps: true
    });


    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    // Libros es el nombre de la coleccion, con la estructura que le estamos creando con mongoose
    const Tutorial = mongoose.model("libros",schema);
    return Tutorial;
};