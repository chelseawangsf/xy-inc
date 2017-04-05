import Joi from 'joi';

// load .env vars in process.env
require('dotenv').config();

// define validation for all the .env vars
const envVarsSchema = Joi.object({
  APP_ENV: Joi.string().allow(['development', 'production', 'test']).default('development'),
  APP_PORT: Joi.number().default(4040),
  JWT_SECRET: Joi.string().required().description('JWT Secret required to sign.'),
  MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),
}).unknown().required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const config = {
  env: envVars.APP_ENV,
  port: envVars.APP_PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
};

export default config;
