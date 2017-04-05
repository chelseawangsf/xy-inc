import mongoose from 'mongoose';
import app from './server';
import config from './config/config';

const debug = require('debug')('xy-inc:index');

const mongoUri = `${config.mongo.host}:${config.mongo.port}`;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

// listen on port config.port
app.listen(config.port, () => {
  debug(`server started on port ${config.port} (${config.env})`);
});
