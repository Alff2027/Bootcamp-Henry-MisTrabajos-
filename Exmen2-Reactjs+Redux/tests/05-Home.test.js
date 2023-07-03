import * as actions from '../src/redux/actions';
import * as data from '../db.json';

import HomeConnected, {
   Home,
   mapDispatchToProps,
   mapStateToProps,
} from '../src/components/Home/Home';
import { configure, mount, shallow } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';
import BandCard from '../src/components/BandCard/BandCard';
import { Provider } from 'react-redux';
import React from 'react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import isReact from 'is-react';
import mainImage from '../src/img-cp2/main-image-cp2.jpg';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

// Acá se mockea la action para que el test pueda funcionar correctamente, sin importar si hay un bug en ese archivo
jest.mock('../src/redux/actions/index.js', () => ({
   getAllBands: () => ({
      type: 'GET_ALL_BANDS',
   }),
}));

jest.mock('../src/components/BandCard/BandCard', () => () => <></>);

describe('<Home />', () => {
   let home, store, state, getAllBandsSpy, componentDidMountSpy;
   global.fetch = nodeFetch;
   const mockStore = configureStore([thunk]);
   beforeEach(() => {
      // Se Mockea las request a las api
      const apiMock = nock('http://localhost:3001').persist();

      // "/bands" => Retorna la propiedad bands del archivo data.json
      apiMock.get('/bands').reply(200, data.bands);

      // "/bands/:id" => Retorna un band matcheado por su id
      // "/bands/:id" => Retorna un band matcheado por su id
      let id = null;
      apiMock
         .get((uri) => {
            id = Number(uri.split('/').pop()); // Number('undefined') => NaN
            return !!id;
         })
         .reply(200, (uri, requestBody) => {
            return data.bands.find((band) => band.id === id) || {};
         });
      state = {
         bands: [],
         bandDetail: {},
      };
      store = mockStore(state);
      home = mount(<HomeConnected store={store} />);
      // Si o si vas a tener que usar class component! No van a pasar ninguno de los tests si no lo haces.
      expect(isReact.classComponent(Home)).toBeTruthy();

      store.clearActions();
   });

   afterEach(() => {
      nock.cleanAll();
   });

   it('Debe rederizar un "h1" con el texto "Henry Palooza"', () => {
      expect(home.find('h1').at(0).text()).toEqual('Henry Palooza');
   });

   it('Debe renderizar un tag "img" con la imagen provista en la carpeta "img-cp2"', () => {
      // Tendrías que importar la img a tu archivo "Home.jsx" y luego usarla como source de img.
      // Podés ver como lo hacemos en este mismo archivo en la linea 16!
      expect(home.find('img').at(0).prop('src')).toEqual(mainImage);
   });

   it('La imagen debe tener un atributo "alt" con el texto "henry-palooza-logo"', () => {
      expect(home.find('img').at(0).prop('alt')).toEqual('henry-palooza-logo');
   });

   it('Debe rederizar un "h3" con el texto "Bandas"', () => {
      expect(home.find('h3').at(0).text()).toEqual('Bandas');
   });

   it('Debe rederizar un "h4" con el texto "Checkpoint M2"', () => {
      expect(home.find('h4').at(0).text()).toEqual('Checkpoint M2');
   });

   describe('connect Redux', () => {
      // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS TE DEJAMOS COMENTARIOS PARA CADA USO LEER BIEN!!🚨
      it('Debe traer del estado global de Redux todas las bandas usando mapStateToProps', () => {
         // El estado Debe tener un nombre "bands".
         expect(mapStateToProps(state)).toEqual({ bands: state.bands });
      });

      if (typeof mapDispatchToProps === 'function') {
         // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UNA FUNCIÓN.
         // IMPORTANTE! SI LO HACES DE ESTA FORMA LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA
         // import * as actions from "./../../redux/actions/index";
         it("Debe traer por props la action-creator 'getAllBands' de Redux usando mapDispatchToProps", () => {
            // Acá testeamos que hagas todo el proceso. Utilizas la funcion "mapDispatchToProps",
            // y con ella despachas la accion "getAllBands".
            const getAllBands = jest.spyOn(actions, 'getAllBands');
            const dispatch = jest.fn();
            const props = mapDispatchToProps(dispatch);
            props.getAllBands();
            expect(dispatch).toHaveBeenCalled();
            expect(getAllBands).toHaveBeenCalled();
         });
      } else {
         // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UN OBJETO.
         // IMPORTANTE! SI LO HACES DE ESTA FORMA mapDispatchToProps TIENE QUE SER EL OBJETO
         it("Debe traer por props la action-creator 'getAllBands' de Redux usando mapDispatchToProps", () => {
            // Acá testeamos que hagas todo el proceso. Utilizas connect y el objeto "mapDispatchToProps",
            // traes la acción "getAllBands". Con esto podrás usarla luego en el componente.
            const getAllBands = jest.spyOn(actions, 'getAllBands');
            getAllBands();
            expect(
               mapDispatchToProps.hasOwnProperty('getAllBands')
            ).toBeTruthy();
            expect(getAllBands).toHaveBeenCalled();
         });
      }
   });

   describe('React LifeCycles', () => {
      getAllBandsSpy = jest.fn();
      let instance;
      beforeEach(async () => {
         state = {
            bands: data.bands,
            bandDetail: {},
         };
         store = mockStore(state);
         home = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/home']}>
                  <HomeConnected />
               </MemoryRouter>
            </Provider>
         );
      });

      beforeAll(() => {
         // Ojo acá. Antes que corran los demás tests, chequeamos que estés usando el lifeCycle correspondiente ( componentDidMount )
         // y que en él ejecutas la action creator "getAllBands" para traerte toda esa data.
         // Si no pasan estos tests, no pasan los demás!
         componentDidMountSpy = jest.spyOn(Home.prototype, 'componentDidMount');
         instance = shallow(<Home getAllBands={getAllBandsSpy} />).instance();

         instance.componentDidMount();
         expect(componentDidMountSpy).toHaveBeenCalled();
         expect(getAllBandsSpy).toHaveBeenCalled();
      });

      it('Debe mappear todas las bandas que hay en el estado global, y renderizar una <BandCard /> por cada una', () => {
         // Cuidado acá. Como realizamos una petición al back (código asincrónico), el componente se va a
         // renderizar más rápido. Hay un problema con esto, se va a intentar renderizar algunos datos que
         // no existen todavía, lo que es igual a un fatal error. Debes asegurarte que existen
         // bandas y luego renderizarlas!
         // Pista: Usa un renderizado condicional.
         // IMPORTANTE: revisar el código arriba de este test, el beforeAll.
         // Ahí se está testeando el uso del lifecycle componentDidMount y que en él
         // traigas la data a renderizar.
         expect(home.find(BandCard)).toHaveLength(5);
      });

      it('Debe pasar a cada componente <BandCard /> las propiedades: id, name, image y functionDate de cada banda', () => {
         // No olviden pasar la props KEY en el mapeo para mantener buenas practicas.
         expect(home.find(BandCard).at(0).props().id).toEqual(1);
         expect(home.find(BandCard).at(0).props().name).toEqual('The Beatles');
         expect(home.find(BandCard).at(0).props().image).toEqual(
            'https://media.ambito.com/p/e90015ca4ed155874fcefa55e6ac539c/adjuntos/239/imagenes/039/981/0039981805/the-beatleswebp.png'
         );
         expect(home.find(BandCard).at(0).props().functionDate).toEqual(
            '09-10-2022'
         );

         expect(home.find(BandCard).at(1).props().id).toEqual(2);
         expect(home.find(BandCard).at(1).props().name).toEqual('Queen');
         expect(home.find(BandCard).at(1).props().image).toEqual(
            'https://static.wikia.nocookie.net/queen/images/c/c6/2775afb41ca146300103ce245de04c12.jpg/revision/latest?cb=20180708184856&path-prefix=es'
         );
         expect(home.find(BandCard).at(1).props().functionDate).toEqual(
            '10-10-2022'
         );

         expect(home.find(BandCard).at(2).props().id).toEqual(3);
         expect(home.find(BandCard).at(2).props().name).toEqual('Soda Stereo');
         expect(home.find(BandCard).at(2).props().image).toEqual(
            'https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/UAHNHNLVJVEPPC2HK3JW5IEIV4.jpg'
         );
         expect(home.find(BandCard).at(2).props().functionDate).toEqual(
            '08-10-2022'
         );

         expect(home.find(BandCard).at(3).props().id).toEqual(4);
         expect(home.find(BandCard).at(3).props().name).toEqual(
            'Cuarteto De Nos'
         );
         expect(home.find(BandCard).at(3).props().image).toEqual(
            'https://upload.wikimedia.org/wikipedia/commons/7/72/LaBanda.png'
         );
         expect(home.find(BandCard).at(3).props().functionDate).toEqual(
            '11-10-2022'
         );
      });
   });
});
