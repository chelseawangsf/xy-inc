/* eslint-disable import/no-extraneous-dependencies,no-unused-expressions */
import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../server';
import Poi from '../models/poi.model';

chai.config.includeStack = true;

// beforeEach((done) => {
//   function clearDB() {
//     const promises = [
//       Poi.remove().exec(),
//     ];
//
//     Promise.all(promises)
//       .then(() => {
//         done();
//       });
//   }
//
//   return clearDB();
//});

/**
 * root level hooks
 */
after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## POIs API', () => {
  const pois = [
    {
      args: ['Lanchonete', [27, 12]],
      expected: ['Lanchonete', [27, 12]],
    },
    {
      args: ['Posto', [31, 18]],
      expected: ['Posto', [31, 18]],
    },
    {
      args: ['Joalheria', [15, 12]],
      expected: ['Joalheria', [15, 12]],
    },
    {
      args: ['Floricultura', [19, 21]],
      expected: ['Floricultura', [19, 21]],
    },
    {
      args: ['Pub', [27, 12]],
      expected: ['Pub', [27, 12]],
    },
    {
      args: ['Supermercado', [23, 6]],
      expected: ['Supermercado', [23, 6]],
    },
    {
      args: ['Churrascaria', [28, 2]],
      expected: ['Churrascaria', [28, 2]],
    },
  ];

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
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/v1/pois/', () => {
    it('Nenhum POI cadastrado', (done) => {
      request(app)
        .get('/api/v1/pois')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.empty;
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /api/v1/pois', () => {
    it('Cadastrar um POI com coordenadas inválidas', (done) => {
      request(app)
        .post('/api/v1/pois')
        .send(poiInvalidCoordinates)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"coordinates" must be an array');
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /api/v1/pois', () => {
    it('Cadastrar um POI com nome inválido', (done) => {
      request(app)
        .post('/api/v1/pois')
        .send(poiInvalidName)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"name" is not allowed to be empty');
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /api/v1/pois/', () => {
    pois.forEach((test) => {
      const poi = {
        name: test.args[0],
        coordinates: test.args[1],
      };
      it(`Cadastrar POI '${poi.name}' com coordenadas [${poi.coordinates[0]},${poi.coordinates[1]}]`, (done) => {
        request(app)
          .get('/api/v1/pois/')
          .send(poi)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(poi.name);
            expect(res.body.coordinates).to.equal(poi.coordinates);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('# GET /api/v1/pois/near?x=20&y=10&max_distance=10', () => {
    it('Buscar POIs próximos ao ponto [20,10] em até 10 metros', (done) => {
      request(app)
        .get('/api/v1/pois')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.equal([
            { name: 'Pub', coordinates: [12, 8] },
            { name: 'Joalheria', coordinates: [15, 12] },
            { name: 'Supermercado', coordinates: [23, 6] },
            { name: 'Lanchonete', coordinates: [27, 12] }]
          );
          done();
        })
        .catch(done);
    });
  });
});
