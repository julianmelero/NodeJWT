import express from 'express';

import { api } from '../config.js';

import { router as user } from './components/user/network.js';
import {router as auth } from './components/auth/network.js';

import {setup, serve} from 'swagger-ui-express';

import { readFile } from 'fs/promises';

const json = JSON.parse(
    await readFile(
      new URL('../api/swagger.json', import.meta.url)
    )
  );

const app = express();

app.use(express.json());

//import * as swaggerDoc from '../api/swagger.json' assert {type: "json"};






// ROUTES
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/docs',serve, setup(json));
app.listen(api.port, () => {
    console.log("API is listening in port " + api.port);
})