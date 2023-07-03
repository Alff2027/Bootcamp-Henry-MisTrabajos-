import * as actions from '../src/redux/actions';
import * as data from '../db.json';

import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import isReact from 'is-react';
import thunk from 'redux-thunk';
import CreateBand from '../src/components/CreateBand/CreateBand';

configure({ adapter: new Adapter() });

jest.mock('../src/redux/actions/index', () => ({
   CREATE_BANDS: 'CREATE_BANDS',
   createBands: (payload) => ({
      type: 'CREATE_BANDS',
      payload: {
         ...payload,
         id: 6,
      },
   }),
}));

describe('<CreateBand/>', () => {
   const state = { band: data.bands };
   const mockStore = configureStore([thunk]);
   const { CREATE_BANDS } = actions;

   beforeAll(() => expect(isReact.classComponent(CreateBand)).toBeFalsy());

   // RECUERDEN USAR FUNCTIONAL COMPONENT EN LUGAR DE CLASS COMPONENT
   describe('Formulario de Creación de Bandas', () => {
      let createBand;
      let store = mockStore(state);
      beforeEach(() => {
         createBand = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/band/create']}>
                  <CreateBand />
               </MemoryRouter>
            </Provider>
         );
      });

      it('Debe renderizar un formulario', () => {
         expect(createBand.find('form').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Name: "', () => {
         expect(createBand.find('label').at(0).text()).toEqual('Name: ');
      });

      it('Debe renderizar un input de tipo text con el atributo "name" igual a "name"', () => {
         expect(createBand.find('input[name="name"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Origin: "', () => {
         expect(createBand.find('label').at(1).text()).toBe('Origin: ');
      });

      it('Debe renderizar un input de tipo text con el atributo "name" igual a "origin"', () => {
         expect(createBand.find('input[name="origin"]').length).toBe(1);
      });
      it('Debe renderizar un label con el texto "Description: "', () => {
         expect(createBand.find('label').at(2).text()).toBe('Description: ');
      });
      it('Debe renderizar un textarea con el atributo name igual a "description"', () => {
         expect(createBand.find('textarea[name="description"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Tickets: "', () => {
         expect(createBand.find('label').at(3).text()).toEqual('Tickets: ');
      });
      it('Debe renderizar un input de tipo number con el atributo "name" igual a "tickets"', () => {
         expect(createBand.find('input[name="tickets"]').length).toBe(1);
         expect(createBand.find('input[type="number"]').length).toBe(1);
      });

      it('Debe renderizar un button de tipo submit con el texto "Create Band"', () => {
         expect(createBand.find('button[type="submit"]').length).toBe(1);
         expect(createBand.find('button[type="submit"]').text()).toBe(
            'Create Band'
         );
      });
   });

   describe('Manejo de estados locales', () => {
      let useState, useStateSpy, createBand;
      let store = mockStore(state);
      beforeEach(() => {
         useState = jest.fn();
         useStateSpy = jest.spyOn(React, 'useState');
         useStateSpy.mockImplementation((initialState) => [
            initialState,
            useState,
         ]);

         createBand = mount(
            <Provider store={store}>
               <CreateBand />
            </Provider>
         );
      });

      // Revisen bien que tipo de dato utilizamos en cada propiedad.
      it('Debe inicializar el estado local con las propiedades: "name", "origin", "description" y "tickets"', () => {
         expect(useStateSpy).toHaveBeenCalledWith({
            name: '',
            origin: '',
            description: '',
            tickets: 0,
         });
      });

      describe('Name input', () => {
         it('Debe reconocer cuando hay un cambio en el valor del input "name"', () => {
            createBand.find('input[name="name"]').simulate('change', {
               target: { name: 'name', value: 'Gorillaz' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: 'Gorillaz',
               origin: '',
               description: '',
               tickets: 0,
            });

            createBand.find('input[name="name"]').simulate('change', {
               target: { name: 'name', value: 'Arctic Monkeys' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: 'Arctic Monkeys',
               origin: '',
               description: '',
               tickets: 0,
            });
         });
      });

      describe('Origin input', () => {
         it('Debe reconocer cuando hay un cambio en el valor del input "origin"', () => {
            createBand.find('input[name="origin"]').simulate('change', {
               target: { name: 'origin', value: 'Londres, Reino Unido' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               origin: 'Londres, Reino Unido',
               description: '',
               tickets: 0,
            });

            createBand.find('input[name="origin"]').simulate('change', {
               target: { name: 'origin', value: 'Sheffield, Reino Unido' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               origin: 'Sheffield, Reino Unido',
               description: '',
               tickets: 0,
            });
         });
      });

      describe('Description input', () => {
         it('Debe reconocer cuando hay un cambio en el valor del input "description"', () => {
            createBand.find('textarea[name="description"]').simulate('change', {
               target: { name: 'description', value: 'Descripcion' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               origin: '',
               description: 'Descripcion',
               tickets: 0,
            });

            createBand.find('textarea[name="description"]').simulate('change', {
               target: { name: 'description', value: 'Descripcion 2' },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               origin: '',
               description: 'Descripcion 2',
               tickets: 0,
            });
         });
      });

      describe('Tickets input', () => {
         it('Debe reconocer cuando hay un cambio en el valor del input "tickets"', () => {
            createBand.find('input[name="tickets"]').simulate('change', {
               target: { name: 'tickets', value: 100 },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               origin: '',
               description: '',
               tickets: 100,
            });

            createBand.find('input[name="tickets"]').simulate('change', {
               target: { name: 'tickets', value: 300 },
            });
            expect(useState).toHaveBeenCalledWith({
               name: '',
               origin: '',
               description: '',
               tickets: 300,
            });
         });
      });
   });

   describe('Dispatch al store', () => {
      // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
      // import * as actions from "./../../redux/actions/index";

      let createBand, useState, useStateSpy;
      let store = mockStore(state);

      beforeEach(() => {
         useState = jest.fn();
         useStateSpy = jest.spyOn(React, 'useState');
         useStateSpy.mockImplementation((initialState) => [
            initialState,
            useState,
         ]);
         store = mockStore(state, actions.createBand);
         store.clearActions();
         createBand = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/band/create']}>
                  <CreateBand />
               </MemoryRouter>
            </Provider>
         );
      });

      afterEach(() => jest.restoreAllMocks());

      it('Debe despachar la action "createBand" con los datos del estado local cuando se haga submit del form.', () => {
         const createBandFn = jest.spyOn(actions, 'createBands');
         createBand.find('form').simulate('submit');
         expect(store.getActions()).toEqual([
            {
               type: CREATE_BANDS,
               payload: {
                  name: '',
                  origin: '',
                  description: '',
                  tickets: 0,
                  id: 6,
               },
            },
         ]);
         expect(CreateBand.toString().includes('useDispatch')).toBe(true);
         expect(createBandFn).toHaveBeenCalled();
      });

      it('Debe evitar que se refresque la página luego de hacer submit con el uso del evento "preventDefault"', () => {
         const event = { preventDefault: () => {} };
         jest.spyOn(event, 'preventDefault');
         createBand.find('form').simulate('submit', event);
         expect(event.preventDefault).toBeCalled();
      });
   });
   describe('Manejo de errores', () => {
      let createBand;
      let store = mockStore(state);
      beforeEach(() => {
         createBand = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/band/create']}>
                  <CreateBand />
               </MemoryRouter>
            </Provider>
         );
      });

      it('Al ingresar un name o un origin con una longitud mayor a 30 caracteres, debe renderizar un <p> indicando el error', () => {
         // Pueden implementar la lógica de validación de errores de la forma que mejor prefieran!
         // Los test verifican principalmente que muestres lo errores en la interfaz CORRECTAMENTE.
         jest.restoreAllMocks();
         expect(createBand.find('p').length).toEqual(0);
         createBand.find('input[name="name"]').simulate('change', {
            target: {
               name: 'name',
               value: 'Una banda que salio del comedor de su casa',
            },
         });
         expect(createBand.find('p').at(0).text()).toEqual(
            'Nombre u Origen demasiado largo'
         );
         // Al insertar un valor correcto en el input, el "p" deberia desaparecer
         createBand.find('input[name="name"]').simulate('change', {
            target: { name: 'name', value: "Guns N' Roses" },
         });
         expect(createBand.find('p').length).toEqual(0);
         createBand.find('input[name="origin"]').simulate('change', {
            target: {
               name: 'origin',
               value: 'Algún recoveco perdido en el mundo',
            },
         });
         expect(createBand.find('p').at(0).text()).toEqual(
            'Nombre u Origen demasiado largo'
         );
         createBand.find('input[name="origin"]').simulate('change', {
            target: { name: 'origin', value: 'Los Angeles, California' },
         });
         expect(createBand.find('p').length).toEqual(0);
      });

      it('Al ingresar una cantidad de tickets menores a 0, debe renderizar un <p> indicando el error', () => {
         jest.restoreAllMocks();
         createBand.find('input[name="tickets"]').simulate('change', {
            target: { name: 'tickets', value: -123 },
         });
         expect(createBand.find('p').text()).toEqual(
            'Los tickets deben ser un numero positivo'
         );
         // Al insertar un valor correcto en el input, el "p" deberia desaparecer
         createBand.find('input[name="tickets"]').simulate('change', {
            target: { name: 'tickets', value: 500 },
         });
         expect(createBand.find('p').length).toEqual(0);
      });
      it("Si hay errores, no deberia despachar la action", () => {
        const dispatchSpy = jest.spyOn(actions, 'createBands');
        // Corrobora varias veces de que si hay algun error, no se despache la action
        createBand.find('input[name="origin"]').simulate('change', {
          target: { name: "origin", value: "Algún recoveco perdido en el mundo" }
        });
        createBand.find('button').simulate('submit');
        expect(dispatchSpy).not.toHaveBeenCalled();
       createBand.find('input[name="name"]').simulate('change', {
          target: { name: "name", value: "Cuarenta y tres mil quinientos veinte" }
        });
        expect(dispatchSpy).not.toHaveBeenCalled();
        createBand.find('button').simulate('submit');
        createBand.find('input[name="tickets"]').simulate('change', {
          target: { name: "tickets", value: -32 }
        });
        createBand.find('button').simulate('submit');
        expect(dispatchSpy).not.toHaveBeenCalled();
      });
   });
});
