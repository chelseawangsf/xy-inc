'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoiSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number], 
    index: '2dsphere',
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pois', PoiSchema);