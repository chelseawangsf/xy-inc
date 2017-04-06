import express from 'express';
import Joi from 'joi';
import validate from 'express-validation';
import poiController from '../controllers/poi.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/v1/pois - Get list of pois */
  .get(poiController.list)

  /** POST /api/v1/pois - Create a new poi */
  .post(validate({ body: {
    name: Joi.string().required(),
    coordinates: Joi.array().min(2).items(Joi.number().integer().min(-180).max(180)).required(),
  } }), poiController.create);

router.route('/near/')
  /** GET /api/v1/pois/near/ - Find near pois */
  .get(validate({ query: {
    x: Joi.number().integer().min(-180).max(180).required(), // eslint-disable-line
    y: Joi.number().integer().min(-180).max(180).required(), // eslint-disable-line
    max_distance: Joi.number().integer().min(0).required(),
  } }), poiController.near);

export default router;
