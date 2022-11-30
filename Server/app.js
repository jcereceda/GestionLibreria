const express = require("express"); // Facilita las tareas
const cors = require("cors"); //te permite aceptar peticiones de una web otra

const app = express();

// de donde recibirá peticiones (app de angular)
var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");
// Conexión a la BD
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conected to the database");
    }) 
    .catch(err => {
        console.log("Cannot conect to the database");
        process.exit();
    });

    // envio de mensaje al cliente (modo web) al conectarse
    app.get("/", (req,res) => {
        res.json({ message: "welcome to the app" });
    });

    require("./app/routes/tutorial.routes")(app);


    const PORT = process.env.PORT || 8080;
    // Levantar el servidor en el puerto 8080
    app.listen(PORT, () => {
        console.log("server running on port " + PORT);
    })