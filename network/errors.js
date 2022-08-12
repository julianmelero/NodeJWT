const response = require('./response');

function errors(err,req,res,next) {
    console.error('[error]', err);
    const messsage = err.message || 'Internal Error';
    const status = err.statusCode || 500;
    response.error(req,res,messsage, status);
}

module.exports = {
    errors
};