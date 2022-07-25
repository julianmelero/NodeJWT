import express from 'express';
import {success, error} from '../../../network/response.js';
import {ctrl} from './index.js';

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


export { router };
