'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

//cargar rutas
var project_routes = require('./routes/project');
//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors
app.use(cors());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //en lugar de asteriscos poner permitidos
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas

/*app.get('/', (req, res) =>{
    res.status(200).send(
        "Pagina de inicio"
    );
});

app.get('/test', (req, res) =>{
    res.status(200).send({
        message: "Hola"
    });
});*/

app.use('/api', project_routes);

// exportar
module.exports = app;