var express = require('express');
var router = express.Router();
var mail = require('../Models/ModeloMail')

/* GET /authorize. */
router.post('/sendMail',  function (req, res, next) {
    // Get auth code
   mail.sendMail(req.body, function (resp){
       console.log(resp);
       if(resp){

           res.send('true');
       }else{
           res.send('false');
       }

   });


});

module.exports = router;