/**
 * Created by xaipo on 3/15/2018.
 */
'use strict'
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

require('dotenv').config();
var authorize = require('./Routes/authorize');

var port = process.env.Port || 3000;
var config = require('./Config/config');
//noinspection BadExpressionStatementJS
mongoose.connect(config.url, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('connect to mongo correct');
    }

});

var app = express();

//routes

var userRoutes = require('./Routes/RoutelUser');
var mdAuth = require('./Middlewares/authenticated');
//middleware
/* app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); */
//body-parser middleware
app.use(bodyParser.urlencoded({ limit: '25mb' }));
app.use(bodyParser.json({ limit: '25mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    //res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.get('/', (req, res) => {

    res.status(200).send('Express run');

});
app.use('/api', userRoutes);
app.use('/authorize', authorize);
app.use('/api', require('./Routes/index'));
app.use('/api', require('./Routes/RouteAbogado'));
app.use('/api', require('./Routes/RouteActividadExtra'));
app.use('/api', require('./Routes/RouteCaso'));
app.use('/api', require('./Routes/RouteCliente'));
app.use('/api', require('./Routes/RouteCobro'));
app.use('/api', require('./Routes/RouteFlujoProceso'));
app.use('/api', require('./Routes/RouteUser'));
app.use('/api', require('./Routes/RouteMail'));
app.use('/api', require('./Routes/RouteLogCambio'));

app.listen(port, () => {
    console.log('Server run on port ' + port + ' XD');
});

//config cabeceras y cors


