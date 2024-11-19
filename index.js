const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors()); // Middleware para permitir peticiones desde cualquier origen

app.use(express.json()); // Middleware para parsear JSON

app.listen(5000, console.log("¡Servidor encendido!"));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  })


app.get("/canciones", (req, res) => {   
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"))
    res.json(canciones)
})


app.post("/canciones", (req, res) => {
    // 1 toma la cancion del body
    const cancion = req.body;
    // 2 lee las canciones del archivo
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    // 3 agrega la cancion al array
    canciones.push(cancion);
    // 4 escribe el archivo
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    // 5 responde al cliente
    res.send("Cancion agregada con éxito");
})


app.put("/canciones/:id", (req, res) => {
    // 1 toma el id de la cancion a modificar
    const id = req.params.id;
    // 2 lee las canciones del archivo
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    // 3 busca la cancion a modificar
    const cancion = canciones.find(cancion => cancion.id == id);
    // 4 modifica la cancion
    cancion.titulo = req.body.titulo;
    cancion.artista = req.body.artista;
    cancion.tono = req.body.tono;
    // 5 escribe el archivo
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    // 6 responde al cliente
    res.send("Cancion modificada con éxito");
})


app.delete("/canciones/:id", (req, res) => {
    // 1 toma el id de la cancion a eliminar
    const id = req.params.id;
    // 2 lee las canciones del archivo
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    // 3 filtra las canciones para eliminar la deseada
    const nuevasCanciones = canciones.filter(cancion => cancion.id != id);
    // 4 escribe el archivo
    fs.writeFileSync("repertorio.json", JSON.stringify(nuevasCanciones));
    // 5 responde al cliente
    res.send("Cancion eliminada con éxito");
})