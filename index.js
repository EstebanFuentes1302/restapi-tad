const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

const users = require('./src/modules/users/routes')

//Variables
app.set('port', process.env.PORT || 3000); //Valida si la variable PORT existe, sino es 3000

//Middlewares
app.use(morgan('dev')); //Para imprimir las solicitudes en consola - formato "dev"
app.use(express.urlencoded({extended: false})); //Soporta datos sencillos - para formularios
app.use(express.json()); //Soportar datos jkson


//Routes
app.use('/api/users', users)
app.use('/test', (req, res) => {
    const data = {
        "name": "Esteban",
        "role": 1,
        "env": process.env.PORT
    }
    res.json(data);
})

//Starting Server
app.listen(app.get('port'), () => {
    console.log(`Console on port: ${app.get('port')}`)
})

