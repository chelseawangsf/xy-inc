'use strict';


var mongoose = require('mongoose'),
  Poi = mongoose.model('Pois');

exports.list_all_pois = function(req, res) {
  Poi.find({}, function(err, poi) {
    if (err) {
      res.send(err);
    }
    res.json(poi);
  });
};

exports.create_a_poi = function(req, res) {
  var new_poi = new Poi(req.body);
  new_poi.save(function(err, poi) {
    if (err) {
      res.send(err);
    }
    res.json(poi);
  });
};

exports.read_a_poi = function(req, res) {
  Poi.findById(req.params.poiId, function(err, poi) {
    if (err) {
      res.send(err);
    }
    res.json(poi);
  });
};

exports.update_a_poi = function(req, res) {
  Poi.findOneAndUpdate(req.params.poiId, req.body, {new: true}, function(err, poi) {
    if (err) {
      res.send(err);
    }
    res.json(poi);
  });
};

exports.delete_a_poi = function(req, res) {
  Poi.remove({_id: req.params.poiId}, function(err, poi) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Poi successfully deleted' });
  });
};