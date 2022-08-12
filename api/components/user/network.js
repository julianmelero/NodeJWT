const express = require('express');
const {success, error } = require('../../../network/response');
const  ctrl = require('./index.js');

const secure = require('./secure');

const router = express.Router();

router.get('/', (req,res) => {
    const list = ctrl.list()
    .then((list) => {
        success(req,res,list, 200);
    })
    .catch((err) => {
        error(req,res,err.message, 500);
    })
    
});


router.get('/:id', (req,res) => {
    const user = ctrl.get(req.params.id)
    .then((user) => {
        success(req,res,user, 200);
    })
    .catch((err) => {
        error(req,res,err.message, 500);
    });
    
});

router.post('/', (req,res) => {
    ctrl.upsert(req.body)
    .then((data) => {
        success(req,res,data, 200);
    })
    .catch((err) => {
        error(req,res,err.message, 500);
    });
});

router.put('/', secure('update'), (req,res) => {
    ctrl.upsert(req.body)
    .then((data) => {
        success(req,res,data, 200);
    })
    .catch((err) => {
        error(req,res,err.message, 500);
    });
});


module.exports = router;
