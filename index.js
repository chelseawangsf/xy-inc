import mongoose from 'mongoose';
import app from './server';
import config from './config/config';

const mongoUri = `${config.mongo.host}:${config.mongo.port}`;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${config.mongo.db}`);
});

// listen on port config.port
app.listen(config.port, () => {
  process.stdout.write(`Server started on port ${config.port} (${config.env})`);
});
