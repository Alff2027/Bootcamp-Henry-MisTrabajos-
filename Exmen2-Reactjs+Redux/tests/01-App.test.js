import * as data from '../db.json';

import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '../src/App';
import BandCard from '../src/components/BandCard/BandCard';
import BandDetail from '../src/components/BandDetail/BandDetail';
import CreateBand from '../src/components/CreateBand/CreateBand';
import Home from '../src/components/Home/Home';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../src/components/Nav/Nav';
import { Provider } from 'react-redux';
import React from 'react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

// Mocks de los componentes, acá se pueden hardcodear para que funcionen SI o SI
// De esa manera sin importar si hay errores en alguno de ellos, nos fijamos de que sean montados en app.js
jest.mock('../src/components/BandDetail/BandDetail', () => () => <></>);
jest.mock('../src/components/BandCard/BandCard', () => () => <></>);
jest.mock('../src/components/Nav/Nav', () => () => <></>);
jest.mock('../src/components/CreateBand/CreateBand', () => () => <></>);
jest.mock('../src/components/Home/Home', () => () => <></>);

describe('<App />', () => {
   global.fetch = nodeFetch;

   let store;
   const routes = ['/', '/band/1', '/band/create'];
   const mockStore = configureStore([thunk]);
   const state = {
      bands: data.bands,
      BandDetail: data.bands[0],
   };

   beforeEach(async () => {
      // Se Mockea las request a las api
      const apiMock = nock('http://localhost:3001').persist();

      // "/bands" => Retorna la propiedad bands del archivo data.json
      apiMock.get('/bands').reply(200, data.bands);

      // "/band/:id" => Retorna una banda matcheado por su id
      let id = null;
      apiMock
         .get((uri) => {
            id = Number(uri.split('/').pop()); // Number('undefined') => NaN
            return !!id;
         })
         .reply(200, (uri, requestBody) => {
            return data.bands.find((band) => band.id === id) || {};
         });
   });

   store = mockStore(state);

   const componentToUse = (route) => {
      return (
         <Provider store={store}>
            <MemoryRouter initialEntries={[route]}>
               <App />
            </MemoryRouter>
         </Provider>
      );
   };
   describe('Nav:', () => {
      it('Debe ser renderizado en la ruta "/"', () => {
         const app = mount(componentToUse(routes[0]));
         expect(app.find(Nav)).toHaveLength(1);
      });

      it('Debe ser renderizado en la ruta "/band/:id"', () => {
         const app = mount(componentToUse(routes[1]));
         expect(app.find(Nav)).toHaveLength(1);
      });
      it('Debe ser renderizado en la ruta "/band/create"', () => {
         const app = mount(componentToUse(routes[2]));
         expect(app.find(Nav)).toHaveLength(1);
      });
   });

   describe('Home:', () => {
      it('El componente "Home" Debe ser renderizado solamente en la ruta "/"', () => {
         const app = mount(componentToUse(routes[0]));
         expect(app.find(BandDetail)).toHaveLength(0);
         expect(app.find(CreateBand)).toHaveLength(0);
         expect(app.find(Home)).toHaveLength(1);
      });
      it('El componente "Home" no debería mostrarse en ninguna otra ruta', () => {
         const app = mount(componentToUse(routes[0]));
         expect(app.find(Home)).toHaveLength(1);

         const app2 = mount(componentToUse(routes[1]));
         expect(app2.find(Home)).toHaveLength(0);

         const app3 = mount(componentToUse(routes[2]));
         expect(app3.find(Home)).toHaveLength(0);
      });
   });

   describe('BandDetail:', () => {
      it('La ruta "/band/:id" debería mostrar sólo el componente BandDetail', () => {
         const app = mount(componentToUse(routes[1]));
         expect(app.find(Home)).toHaveLength(0);
         expect(app.find(BandCard)).toHaveLength(0);
         expect(app.find(BandDetail)).toHaveLength(1);
      });
   });

   describe('CreateBand:', () => {
      it('La ruta "/band/create" debería mostrar sólo el componente CreateBand', () => {
         const app = mount(componentToUse(routes[2]));
         expect(app.find(CreateBand)).toHaveLength(1);
         expect(app.find(BandCard)).toHaveLength(0);
         expect(app.find(Nav)).toHaveLength(1);
         expect(app.find(Home)).toHaveLength(0);
      });
   });
});
