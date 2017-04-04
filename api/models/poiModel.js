'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoiSchema = new Schema({
  name: {
    type: String,
    Required: 'Deve ser informado um nome para o ponto de interesse.'
  },
  x_coord: {
    type: { type: Number, min: [0, "Coordenada X deve ser um valor inteiro positivo."]},
    Required: 'Deve ser informado a coordenada X para o ponto de interesse.'
  },
  y_coord: {
    type: { type: Number, min: [0, "Coordenada Y deve ser um valor inteiro positivo."]},
    Required: 'Deve ser informado a coordenada Y para o ponto de interesse.'
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