const jwt = require('jsonwebtoken');

const config = require('../config');


function signToken(data) {        
    return jwt.sign(data,config.secret.secret);

}

const check = {
    own: function (req,owner) {

    }
}

function verify(token) {    
    return jwt.verify(token, config.secret.secret);
}

function getToken(auth) {
    if(!auth) {
        throw new Error('No token');
    }

    if(auth.indexOf('Barer ' === -1)) {
        throw new Error('Invalid format');
    }

    let token = auth.replace('Barer ', '');

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
}