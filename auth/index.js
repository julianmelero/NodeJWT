import  jwt from 'jsonwebtoken';

function sign(data) {
    return jwt.sign(data,'secret')    
}

export { sign };