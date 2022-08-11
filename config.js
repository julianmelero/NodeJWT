const api = {
    port: process.env.API_PORT || 3000
};

const secret = {
    secret: process.env.JWT_SECRET || 'secret'
};


module.exports = {
    api,
    secret
}
