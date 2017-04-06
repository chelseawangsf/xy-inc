import mongoose from 'mongoose';
import app from './server';
import config from './config/config';

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

const mongoUri = `${config.mongo.host}:${config.mongo.port}`;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${config.mongo.db}`);
});

// listen on port config.port
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`Server started on port ${config.port} (${config.env})`);
  });
}

export default app;