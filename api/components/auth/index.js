const {all} = require('./controller.js');
const store = require('../../../store/dummy.js');

const ctrl = all(store);

module.exports = ctrl;