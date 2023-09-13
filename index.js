'use strict'

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-north-1', // Reemplaza con tu región de DynamoDB
  accessKeyId: 'AKIAYNILH2AIE3CJMGF2',
  secretAccessKey: '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'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'proyectos', // Reemplaza con el nombre de tu tabla
};

dynamodb.scan(params, (error, data) => {
  if (error) {
    console.error('Error al escanear la tabla:', error);
  } else {
    console.log('Elementos en la tabla:');
    data.Items.forEach(item => {
      console.log(item);
    });
  }
});

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/portafolio')
        .then(() => {
            console.log("Conexion a la Base de Datos establecida.");

            //Creacion del servidor
            app.listen(port, () =>{
                console.log("Servidor corriendo correctamente.");
            });

        })
        .catch(err => console.log(err));
