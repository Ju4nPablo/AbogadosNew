/**
 * Created by xaipo on 3/15/2018.
 */
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var config= require('../Config/config');


exports.createToken= function (user){
    var payload= {
        sub: user._id,
        name: user.user_name,
        tipo: user.tipo,
        iat:moment().unix(),
        exp:moment().add(30,'days').unix// tiempo para que el token expire
    };
    return jwt.encode(payload,config.key);
};