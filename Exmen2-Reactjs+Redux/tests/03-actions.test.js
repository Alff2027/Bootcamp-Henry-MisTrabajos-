/* eslint-disable jest/no-conditional-expect */

import * as data from '../db.json';

import {
   CREATE_BANDS,
   DELETE_BANDS,
   GET_ALL_BANDS,
   GET_BAND_DETAILS,
   createBands,
   deleteBands,
   getAllBands,
   getBandDetail,
} from '../src/redux/actions';

import axios from 'axios';
import configureStore from 'redux-mock-store';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Actions', () => {
   const mockStore = configureStore([thunk]);
   const store = mockStore({ bands: [] });
   global.fetch = nodeFetch;
   beforeEach(() => {
      store.clearActions();

      // Se Mockea las request a las api
      const apiMock = nock('http://localhost:3001').persist();

      // "/bands" => Retorna la propiedad bands del archivo data.json
      apiMock.get('/bands').reply(200, data.bands);

      // "/bands/:id" => Retorna una banda matcheado por su id
      let id = null;
      apiMock
         .get((uri) => {
            id = Number(uri.split('/').pop()); // Number('undefined') => NaN
            return !!id;
         })
         .reply(200, (uri, requestBody) => {
            return data.bands.find((bands) => bands.id === id) || {};
         });
   });

   afterEach(() => {
      nock.cleanAll();
   });

   describe('getAllBands', () => {
      it('Debe hacer un dispatch con las propiedades type GET_ALL_BANDS y, como payload, el resultado de la petición al End-Point provisto', async () => {
         return store
            .dispatch(getAllBands())
            .then(() => {
               const actions = store.getActions();
               expect(actions[0].payload.length).toBe(5);
               expect(actions[0]).toEqual({
                  type: GET_ALL_BANDS,
                  payload: data.bands,
               });
            })
            .catch((err) => {
               // En caso de que haya un error al mandar la petición al back, el error entrara aquí. Podrás visualizarlo en la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });
   });

   describe('getBandDetail', () => {
      it('Debe hacer un dispatch con las propiedades type GET_BAND_DETAILS y, como payload, el resultado de la petición al End-Point provisto', async () => {
         const payload = data.bands[0];
         return store
            .dispatch(getBandDetail(payload.id))
            .then(() => {
               const actions = store.getActions();
               expect(actions[0]).toStrictEqual({
                  type: GET_BAND_DETAILS,
                  payload: { ...payload },
               });
            })
            .catch((err) => {
               // El catch lo utilizamos para "agarrar" cualquier tipo de errores a la hora de hacer la petición al back. Solo va a entrar si el test no sale como es pedido.
               // Para ver que está pasando debes revisar la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });

      it('Debe traer una banda distinta si el ID requerido es otro (evitar hardcodeos)', async () => {
         const payload = data.bands[1];
         return store
            .dispatch(getBandDetail(payload.id))
            .then(() => {
               const actions = store.getActions();
               expect(actions[0]).toStrictEqual({
                  type: GET_BAND_DETAILS,
                  payload: { ...payload },
               });
            })
            .catch((err) => {
               // El catch lo utilizamos para "agarrar" cualquier tipo de errores a la hora de hacer la petición al back. Solo va a entrar si el test no sale como es pedido.
               // Para ver que está pasando Debes revisar la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });
   });

   describe('createBands', () => {
      it('Debe retornar una action con las propiedades type CREATE_BANDS y, como payload, contener los values recibidos como argumento y un ID incremental', () => {
         // Para que este test pase, deberan declarar una variable id que su valor inicialice en 6. Lo hacemos para que no haya conflicto entre los id's que nosotros ya tenemos.
         // Si revisan el archivo db.json verán la lista de bandas.
         const payload1 = {
            name: 'Eminem',
            origin: 'Saint Joseph, Missouri, United States',
            functionDate: '26-10-2022',
            description:
               'Eminem, byname of Marshall Bruce Mathers III, (born October 17, 1972, St. Joseph, Missouri, U.S.), American rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century. Mathers had a turbulent childhood, marked by poverty and allegations of abuse.',
            members: ['Marshall Bruce Mathers III'],
            image: 'https://sites.google.com/site/tiposdemusicaes/_/rsrc/1470786772862/emi/rap_god_by_fiddy90d6t2g3f.jpg?height=225&width=400',
            tickets: 12500,
         };
         const payload2 = {
            name: 'Soda Stereo',
            origin: 'Buenos Aires, Argentina',
            functionDate: '12-09-2023',
            description: `Soda Stereo is an Argentinian rock band formed in Buenos Aires in 1982 by Gustavo Cerati (lead vocals, guitar), Héctor "Zeta" Bosio (bass) and Carlos Alberto Ficicchia "Charly Alberti" (drums).`,
            members: ['Zeta Bosio', 'Charly Alberti'],
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/CeratiAlbertiBosio.jpg/500px-CeratiAlbertiBosio.jpg',
            tickets: 5500,
         };

         expect(createBands(payload1)).toEqual({
            type: CREATE_BANDS,
            payload: {
               id: 6,
               name: 'Eminem',
               origin: 'Saint Joseph, Missouri, United States',
               functionDate: '26-10-2022',
               description:
                  'Eminem, byname of Marshall Bruce Mathers III, (born October 17, 1972, St. Joseph, Missouri, U.S.), American rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century. Mathers had a turbulent childhood, marked by poverty and allegations of abuse.',
               members: ['Marshall Bruce Mathers III'],
               image: 'https://sites.google.com/site/tiposdemusicaes/_/rsrc/1470786772862/emi/rap_god_by_fiddy90d6t2g3f.jpg?height=225&width=400',
               tickets: 12500,
            },
         });

         expect(createBands(payload2)).toEqual({
            type: 'CREATE_BANDS',
            payload: {
               id: 7,
               name: 'Soda Stereo',
               origin: 'Buenos Aires, Argentina',
               functionDate: '12-09-2023',
               description: `Soda Stereo is an Argentinian rock band formed in Buenos Aires in 1982 by Gustavo Cerati (lead vocals, guitar), Héctor "Zeta" Bosio (bass) and Carlos Alberto Ficicchia "Charly Alberti" (drums).`,
               members: ['Zeta Bosio', 'Charly Alberti'],
               image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/CeratiAlbertiBosio.jpg/500px-CeratiAlbertiBosio.jpg',
               tickets: 5500,
            },
         });
      });
   });

   describe('deleteBands', () => {
      it('Debe retornar una action con las propiedades type DELETE_BANDS, y como payload, el ID de la banda a eliminar. Recibe el ID por argumento', () => {
         expect(deleteBands(1)).toEqual({ type: DELETE_BANDS, payload: 1 });
         expect(deleteBands(2)).toEqual({ type: DELETE_BANDS, payload: 2 });
      });
   });
});
