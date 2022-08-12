const express = require('express');

const {api} = require('../config.js');


const user = require('./components/user/network.js');
const auth = require('./components/auth/network.js');

const errors = require('../network/errors');

const {setup, serve} = require('swagger-ui-express');

const fs = require('fs/promises');

const json = require('./swagger.json');

/*const json = JSON.parse(
    await fs.readFile(
      new URL('../api/swagger.json', import.meta.url)
    )
  );
*/
const app = express();

app.use(express.json());

//import * as swaggerDoc from '../api/swagger.json' assert {type: "json"};






// ROUTES
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/docs',serve, setup(json));

app.use(errors.errors);

app.listen(api.port, () => {
    console.log("API is listening in port " + api.port);
})