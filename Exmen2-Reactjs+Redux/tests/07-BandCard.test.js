import * as actions from '../src/redux/actions/index';
import * as data from '../db.json';

import { Link, MemoryRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BandCardConnected from '../src/components/BandCard/BandCard';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

jest.mock('../src/redux/actions/index', () => ({
   deleteBands: () => ({
      type: 'DELETE_BANDS',
   }),
}));

describe('<BandCard />', () => {
   let bandCard, state, store;
   const mockStore = configureStore([thunk]);
   let bands = data.bands;
   state = {
      bands: [],
      bandDetail: {},
   };
   store = mockStore(state);
   beforeEach(() => {
      bandCard = (band) =>
         mount(
            <Provider store={store}>
               <MemoryRouter>
                  <BandCardConnected
                     id={band.id}
                     name={band.name}
                     functionDate={band.functionDate}
                     image={band.image}
                  />
               </MemoryRouter>
            </Provider>
         );
   });

   afterEach(() => jest.restoreAllMocks());

   describe('Estructura', () => {
      it('Debe renderizar un botón con el texto "x"', () => {
         const wrapper = bandCard(bands[0]);
         expect(wrapper.find('button').text()).toBe('x');
      });

      it('Debe renderizar un "h3" que muestre la propiedad "name" de cada banda', () => {
         expect(bandCard(bands[0]).find('h3').at(0).text()).toBe('The Beatles');
         expect(bandCard(bands[1]).find('h3').at(0).text()).toBe('Queen');
         expect(bandCard(bands[2]).find('h3').at(0).text()).toBe('Soda Stereo');
      });

      it('Debe renderizar la imágen de cada banda y un atributo "alt" con el nombre de la banda', () => {
         expect(bandCard(bands[0]).find('img').prop('src')).toBe(
            bands[0].image
         );
         expect(bandCard(bands[0]).find('img').prop('alt')).toBe(bands[0].name);
         expect(bandCard(bands[1]).find('img').prop('src')).toBe(
            bands[1].image
         );
         expect(bandCard(bands[1]).find('img').prop('alt')).toBe(bands[1].name);
      });

      it('Debe renderizar un <p> que contenga el texto "FunctionDate: " seguido de la prop "functionDate" de cada banda', () => {
         expect(bandCard(bands[0]).find('p').at(0).text()).toBe(
            'FunctionDate: 09-10-2022'
         );
         expect(bandCard(bands[1]).find('p').at(0).text()).toBe(
            'FunctionDate: 10-10-2022'
         );
         expect(bandCard(bands[2]).find('p').at(0).text()).toBe(
            'FunctionDate: 08-10-2022'
         );
         expect(bandCard(bands[3]).find('p').at(0).text()).toBe(
            'FunctionDate: 11-10-2022'
         );
      });

      it('Debe asociar una etiqueta <Link> con el "name" de cada banda y redirigir a "/band/:id"', () => {
         // El valor de "id" lo tenes que sacar de las props, recuerda que les estas pasando una propiedad "id".
         expect(bandCard(bands[0]).find(Link)).toHaveLength(1);
         expect(bandCard(bands[0]).find(Link).at(0).prop('to')).toEqual(
            '/band/1'
         );
      });
   });

   describe('Dispatch to store', () => {
      // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
      // import * as actions from "./../../redux/actions/index";

      it('Debe hacer un dispatch al estado global utilizando la action "deleteBand" al hacer click en el botón "x". Debe pasarle el Id de la band', () => {
         const deleteBandSpy = jest.spyOn(actions, 'deleteBands');
         const bandCard = mount(
            <Provider store={store}>
               <MemoryRouter>
                  <BandCardConnected
                     id={bands[0].id}
                     name={bands[0].name}
                     functionDate={bands[0].functionDate}
                     image={bands[0].image}
                  />
               </MemoryRouter>
            </Provider>
         );
         bandCard.find('button').simulate('click');
         expect(deleteBandSpy).toHaveBeenCalled();
         expect(deleteBandSpy).toHaveBeenCalledWith(bands[0].id);

         const bandCard2 = mount(
            <Provider store={store}>
               <MemoryRouter>
                  <BandCardConnected
                    id={bands[1].id}
                    name={bands[1].name}
                    functionDate={bands[1].functionDate}
                    image={bands[1].image}
                  />
               </MemoryRouter>
            </Provider>
         );
         bandCard2.find('button').simulate('click');
         expect(deleteBandSpy).toHaveBeenCalled();
         expect(deleteBandSpy).toHaveBeenCalledWith(bands[1].id);
      });
   });
});
