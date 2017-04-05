'use strict';
module.exports = function(app) {
  var poi = require('../controllers/poiController');

  // Points of Interest Routes
  app.route('/pois/')
    .get(poi.list_all_pois)
    .post(poi.create_a_poi);

  app.route('/pois/:x/:y/:max')
    .get(poi.find_near);
};
