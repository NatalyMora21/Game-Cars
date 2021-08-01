const express = require("express");
const cors= require("cors");
const app = express();

//Import Routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//Indicar que todas las rutas 
app.use('/',require('./routes/players'));




module.exports = app;

