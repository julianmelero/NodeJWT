const jwt = require('jsonwebtoken');

const config = require('../config');

function signToken(data) {        
    return jwt.sign(data,config.secret.secret);

}

const check = {
    own: function (req,owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id != owner) {
            throw new Error("Access denied");
        }

    }
}

function verify(token) {    
    return jwt.verify(token, config.secret.secret);
}

function getToken(auth) {
    if(!auth) {
        throw new Error('No token');
    }
    console.log(auth);
    if(auth.indexOf('Bearer ' === -1)) {
        console.log(auth.indexOf('Bearer '));
        throw new Error('Invalid format');
    }

    let token = auth.replace('Bearer ', '');
    console.log(token);
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    signToken,
    check
}