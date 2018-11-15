var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET home page. */
router.get('/linkCorreo', function (req, res, next) {
    let parms = { title: 'Home', active: { home: true } };
    console.log('hola 1');
    link = {
        url: authHelper.getAuthUrl()
    }

    parms.signInUrl = authHelper.getAuthUrl();
    parms.debug = parms.signInUrl;
    res.send(link);
    console.log(parms)
});

module.exports = router;