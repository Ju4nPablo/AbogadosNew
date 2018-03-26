/**
 * Created by xaipo on 3/15/2018.
 */
'use strict'
var mongoose = require('mongoose');
var express= require('express');
var bodyParser= require('body-parser');
var port= process.env.Port|| 3001;
var config=require('./Config/config');
//noinspection BadExpressionStatementJS
mongoose.connect(config.url, (err, res)=>{
    if(err){
        throw err;
    }else{
        console.log('connect to mongo correct');

    }

});


var app = express();


//routes

var userRoutes=require('./Routes/RoutelUser');
var mdAuth=require('./Middlewares/authenticated');
//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{

    res.status(200).send('Express run');

});

app.use('/api', userRoutes);




app.listen(port, ()=>{
    console.log('Server run on port '+port);
});

//config cabeceras y cors


