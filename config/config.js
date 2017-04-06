import Joi from 'joi';

// load .env vars in process.env
require('dotenv').config();

// define validation for all the .env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().allow(['development', 'production', 'test']).default('development'),
  PORT: Joi.number().default(4040),
  JWT_SECRET: Joi.string().required().description('JWT Secret required to sign.'),
  MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),
  MONGO_DB: Joi.string().default('pois'),
}).unknown().required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    db: envVars.MONGO_DB,
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
};

export default config;
