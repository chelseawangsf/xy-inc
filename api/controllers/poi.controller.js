import Poi from '../models/poi.model';

/**
 * Create new poi
 * @property {string} req.body.name - The name of the poi.
 * @property {Array} req.body.coordinates - The coordinates of the poi. [X,Y]
 * @returns {Poi}
 */
function create(req, res, next) {
  const poi = new Poi({
    name: req.body.name,
    coordinates: req.body.coordinates,
  });

  poi.save()
    .then(savedPoi => res.json(savedPoi))
    .catch(e => next(e));
}

/**
 * Get pois list.
 * @returns {Poi[]}
 */
function list(req, res, next) {
  Poi.find({}, 'name coordinates -_id')
    .then(pois => res.json(pois))
    .catch(e => next(e));
}

/**
 * Find all pois near location.
 * @property {number} req.query.x - reference poi x coordinate .
 * @property {number} req.query.y - reference poi y coordinate .
 * @property {number} req.query.max_distance - max distance .
 * @returns {Poi[]}
 */
function near(req, res, next) {
  Poi.find({
    coordinates: {
      $geoWithin: {
        $center: [[req.query.x, req.query.y], req.query.max_distance],
      },
    },
  }, 'name coordinates -_id').exec()
    .then(pois => res.json(pois))
    .catch(e => next(e));
}


export default { create, list, near };
