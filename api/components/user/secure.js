//import { sign  } from '../../../auth/index';

export default function checkAuth(action) {


    function middleware(req,res,next) {
        switch(action) {
            case 'update':
                const owner = req.body.id;
                checkAuth.own(req,owner);
                break;

            default:
                next();
        }
    }

    return middleware;
}

