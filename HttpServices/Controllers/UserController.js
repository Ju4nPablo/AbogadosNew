/**
 * Created by xaipo on 3/15/2018.
 */
'use strict'

function test(req, res) {
    res.status(200).send({
        message:'Test Controller'
    });
}

module.exports={
    test
};