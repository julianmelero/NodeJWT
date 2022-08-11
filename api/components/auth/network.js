const express = require('express');
const response = require('../../../network/response');

const ctrl = require('./index.js');

const router = express.Router();


router.post('/login', (req,res) => {
    ctrl.login(req.body.username, req.body.password)
    .then(token => {        
        response.success(req,res,token,200);
    })
    .catch((err) => {
        response.error(req,res,'Información inválida', 400);
    })
});


module.exports = router;