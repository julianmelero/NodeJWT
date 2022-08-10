import express, { response } from 'express';
import {success, error} from '../../../network/response.js';
import {ctrl} from './index.js';

const router = express.Router();


router.post('/login', (req,res) => {
    ctrl.login(req.body.username, req.body.password)
    .then(token => {        
        success(req,res,token,200);
    })
    .catch((err) => {
        error(req,res,'Información inválida', 400);
    })
});


export { router };