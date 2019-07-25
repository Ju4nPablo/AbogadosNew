var express = require('express');
var router = express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/ModelUser'); //copiar el modelo de la tabla

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){
 res.send("ingresa api");
 });*/


routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/user'); //nombre ruta para acceder por web

router.post('/getUser', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("user").find({ 'user_name': req.body.user_name });
        // var casos = dbo.collection("casos").find({ 'data.abogado.cedula': req.body.cedula, 'data.estado.id': '1' });

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// </editor-fold>

//Return route
module.exports = router;