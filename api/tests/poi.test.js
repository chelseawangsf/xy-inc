/* eslint-disable import/no-extraneous-dependencies,no-unused-expressions */
import mongoose from 'mongoose';
import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import Poi from '../models/poi.model';

chai.config.includeStack = true;

after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

const seeds = [
  {name: "Lanchonete", coordinates: [27, 12]},
  {name: "Posto", coordinates: [31, 18]},
  {name: "Joalheria", coordinates: [15, 12]},
  {name: "Pub", coordinates: [12, 8]},
  {name: "Supermercado", coordinates: [23, 6]},
  {name: "Churrascaria", coordinates: [28, 2]}
]

//run once before all tests
before(function (done) {
    //test if database is populated
    Poi.remove().exec().then(() => {
          done();
    });
    
    Poi.insertMany(seeds);
});

describe('## POIs API', () => {
  
  const poiInvalidCoordinates = {
    name: 'Invalid Coordinates',
    coordinates: '200, 200',
  };
  const poiInvalidName = {
    name: '',
    coordinates: [90, 90],
  };

  describe('# GET /api/v1/invalid/', () => {
    it('Rota inexistente', (done) => {
      request(app)
        .get('/api/v1/invalid')
        .expect(httpStatus.NOT_FOUND)
        .end((err, res) => {
          expect(res.body.message).to.equal('Not Found');
          done(err);
        });
    });
  });

  describe('# GET /api/v1/pois', () => {
    it('Verificar se contém apenas os dados de seed.', (done) => {
      request(app)
        .get('/api/v1/pois')
        .expect(httpStatus.OK)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(6);
          done(err);
        });
    });
  });

  describe('# POST /api/v1/pois', () => {
    it('Cadastrar um POI com coordenadas inválidas', (done) => {
      request(app)
        .post('/api/v1/pois')
        .send(poiInvalidCoordinates)
        .expect(httpStatus.BAD_REQUEST)
        .end((err, res) => {
          expect(res.body.message).to.equal('"coordinates" must be an array');
          done(err);
        });
    });
  });

  describe('# POST /api/v1/pois', () => {
    it('Cadastrar um POI com nome inválido', (done) => {
      request(app)
        .post('/api/v1/pois')
        .send(poiInvalidName)
        .expect(httpStatus.BAD_REQUEST)
        .end((err, res) => {
          expect(res.body.message).to.equal('"name" is not allowed to be empty');
          done(err);
        });
    });
  });

  describe('# GET /api/v1/pois/near?x=20&y=10&max_distance=10', () => {
    it('Buscar POIs próximos ao ponto [20,10] em até 10 metros', (done) => {
      request(app)
        .get('/api/v1/pois/near?x=20&y=10&max_distance=10')
        .expect(httpStatus.OK)
        .end((err, res) => {
          expect(JSON.stringify(res.body)).to.be.equal(JSON.stringify([
            { name: 'Pub', coordinates: [12, 8] },
            { name: 'Joalheria', coordinates: [15, 12] },
            { name: 'Supermercado', coordinates: [23, 6] },
            { name: 'Lanchonete', coordinates: [27, 12] }]
          ));
          done(err);
        });
    });
  });

  const newPoi = {
    name: "Sorveteria",
    coordinates: [180,-180]
  };
  
  describe('# POST /api/v1/pois', () => {
    it(`Cadastrar POI '${newPoi.name}' com coordenadas [${newPoi.coordinates[0]}, ${newPoi.coordinates[1]}]`, (done) => {
      request(app)
        .post('/api/v1/pois')
        .send(newPoi)
        .expect(httpStatus.OK)
        .end((err, res) => {
          expect(res.body.name).to.equal(newPoi.name);
          done(err);
        });
    });
  });
  
});
