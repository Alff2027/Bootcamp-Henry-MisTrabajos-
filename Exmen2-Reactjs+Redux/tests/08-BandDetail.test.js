import * as ReactRedux from 'react-redux';
import * as actions from '../src/redux/actions';
import * as data from '../db.json';

import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BandDetail from '../src/components/BandDetail/BandDetail';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import isReact from 'is-react';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

jest.mock('../src/redux/actions/index', () => ({
   getBandDetail: () => ({
      type: 'GET_BAND_DETAIL',
   }),
}));

describe('<BandDetail />', () => {
   global.fetch = nodeFetch;
   let bandDetail, useSelectorStub, useSelectorFn, useEffect;
   const noProd = {
      id: 1,
      name: 'Salamanca',
      description:
         "A brand new band coming to the Buenos Aires' Stadiums for great concerts",
      origin: 'Buenos Aires, Argentina',
      image: 'https://rockandfilms.es/wp-content/uploads/2020/01/111111-2.jpg',
      functionDate: "11-11-2011",
   };

   const match = (id) => ({
      params: { id },
      isExact: true,
      path: '/band/:id',
      url: `/band/${id}`,
   });
   const mockStore = configureStore([thunk]);

   const store = (id) => {
      let state = {
         bands: data.bands.concat(noProd),
         bandDetail: id !== 10 ? data.bands[id - 1] : data.bands.concat(noProd),
      };
      return mockStore(state);
   };
   // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
   // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
   // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
   // cuando se hace destructuring de estos métodos === test no corren.
   beforeAll(() => expect(isReact.classComponent(BandDetail)).toBeFalsy());
   const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

   beforeEach(() => {
      // Se Mockea las request a las api
      const apiMock = nock('http://localhost:3001').persist();

      // "/bands" => Retorna la propiedad bands del archivo data.json
      apiMock.get('/bands').reply(200, data.bands);

      // "/band/:id" => Retorna una band matcheada por su id

      let id = null;
      apiMock
         .get((uri) => {
            id = Number(uri.split('/').pop()); // Number('undefined') => NaN
            return !!id;
         })
         .reply(200, (uri, requestBody) => {
            return data.bands.find((band) => band.id === id) || {};
         });
      useSelectorStub = jest.spyOn(ReactRedux, 'useSelector');
      useSelectorFn = (id) =>
         useSelectorStub.mockReturnValue(store(id).getState().bandDetail);
      useEffect = jest.spyOn(React, 'useEffect');
      bandDetail = (id) =>
         mount(
            <ReactRedux.Provider store={store(id)}>
               <MemoryRouter initialEntries={[`/band/${id}`]}>
                  <BandDetail match={match(id)} />
               </MemoryRouter>
            </ReactRedux.Provider>
         );
      mockUseEffect();
      mockUseEffect();
   });

   afterEach(() => jest.restoreAllMocks());

   // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
   // import * as actions from "./../../redux/actions/index";

   it('Debe usar un React.useEffect en el que se despache la acción "getBandDetail", pasándole como argumento el ID de la banda', async () => {
      // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getBandDetail".
      const useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
      const getBandDetail = jest.spyOn(actions, 'getBandDetail');
      bandDetail(1);
      expect(useEffect).toHaveBeenCalled();
      expect(useDispatch).toHaveBeenCalled();
      expect(getBandDetail).toHaveBeenCalled();

      bandDetail(2);
      expect(useEffect).toHaveBeenCalled();
      expect(useDispatch).toHaveBeenCalled();
      expect(getBandDetail).toHaveBeenCalled();
   });

   describe('Debe recibir por props el objeto "match". Utilizar el "id" de "params" para despachar la action "getBandDetail" y renderizar los detalles de la banda', () => {
      const band = data.bands[0];

      // Fijate que para traerte los datos desde Redux, vas a tener que usar el hook de Redux "useSelector"
      // para que los tests pasen!
      // Lo que se esta testeando aca, es que el componente renderice los detalles del todo correctamente,
      // no la estructura del componente asi que eres libre de diseñar la estructura, siempre y cuando se muestren los datos del todo.
      // Verificar la llegada de datos en el objeto "match.params", puede romper en el caso que no exista nada.
      it("Debe renderizar un tag h1 que muestre el name de cada 'banda'", () => {
         useSelectorFn(1);
         expect(bandDetail(1).text().includes(band.name)).toEqual(true);
         expect(bandDetail(1).find("h1").at(0).text()).toBe(band.name);
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
       });
   
       it("Debe renderizar una etiqueta img donde su prop src sea la imagen de la banda y la prop alt el nombre de la banda.", () => {
         useSelectorFn(1);
         expect(bandDetail(1).find("img").prop("src")).toBe(
           band.image
         );
         expect(bandDetail(1).find("img").prop("alt")).toBe(band.name);
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
       });
   
       it("Debe renderizar una etiqueta h5 que contenga el siguiente texto: Entradas disponibles: y el stock de las entradas.", () => {
         useSelectorFn(1);
         expect(bandDetail(1).text().includes(band.tickets)).toEqual(true);
         expect(bandDetail(1).find("h5").at(0).text()).toBe("Entradas disponibles: " + band.tickets);
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
       });
       it("Debe renderizar una etiqueta h5 que contenga el siguiente texto: Fecha del evento: y la fecha del evento.", () => {
         useSelectorFn(1);
         expect(bandDetail(1).text().includes(band.functionDate)).toEqual(true);
         expect(bandDetail(1).find("h5").at(1).text()).toBe("Fecha del evento: " + band.functionDate);      expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
       });
   
   
       it("Debe renderizar una etiqueta h5 que contenga el siguiente texto: Origen de la banda: y el origen de la misma.", () => {
         useSelectorFn(1);
         expect(bandDetail(1).text().includes(band.origin)).toEqual(true);
         expect(bandDetail(1).find("h5").at(2).text()).toBe("Origen de la banda: " + band.origin);      expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
       });
       
       it("Debe renderizar una etiqueta h5 que contenga el siguiente texto: Integrantes: y los integrantes de la banda.", () => {
         useSelectorFn(1);
         // expect(bandDetail(1).text().includes(band.members)).toEqual(true);
         expect(bandDetail(1).find("h5").at(3).text()).toBe(`Integrantes: ${band.members.join(" ")} `);
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
       });
       
       it("Debe renderizar una etiqueta h3 con la descripción de la banda.", () => {
         useSelectorFn(1);
         expect(bandDetail(1).text().includes(band.description)).toEqual(true);
         expect(bandDetail(1).find("h3").at(0).text()).toBe(band.description);
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
       });
   });
});
