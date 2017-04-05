'use strict';

var mongoose = require('mongoose'),
  Poi = mongoose.model('Pois');

exports.list_all_pois = function(req, res) {
  Poi.find({}, function(err, pois) {
    if (err) {
      res.send(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
    res.json(pois);
  });
};

exports.create_a_poi = function(req, res) {
  var new_poi = new Poi(req.body);
  new_poi.save(function(err, poi) {
    if (err) {
      res.send(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
    res.json(poi);
  });
};

exports.find_near = function(req, res) {
  var x = req.params.x;
  var y = req.params.y;
  var max = req.params.max;
  var Query = Poi.find({ 
    'coordinates': { 
      $near : { 
        $geometry: { 
          type: "Point", 
          coordinates: [ 
            x, 
            y 
          ] 
        }, 
        $maxDistance: max 
      } 
    } 
  }); 
  Query.exec(function(err, pois) {
    if (err) {
      res.send(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
    res.json(pois);
  });
};

//query.where('loc').near({ center: [10, 10], maxDistance: 5, spherical: true });

