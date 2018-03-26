/**
 * Created by xaipo on 3/16/2018.
 */
'use strict'
var jwt = require('jwt-simple');
var moment= require('moment');
var secret= require('../Config/config');


exports.ensureAut=function (req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({message:"peticion sin cabecera de authnticacion"});
    }
  //  console.log(req.headers.authorization.replace(/['"]+/g,''));
    var token = req.headers.authorization.replace(/['"]+/g,'');
        try{

            var payload= jwt.decode(token,secret.key);
            if( payload.exp<= moment().unix()){
                return res.status(401).send({message:'token expirado'})

            }
        }
        catch(ex){
            return res.status(404).send({message:'token no valido'})
        }

    req.user= payload;
    next();
}