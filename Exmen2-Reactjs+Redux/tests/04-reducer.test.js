import rootReducer from '../src/redux/reducer';
import {
   createBands,
   deleteBands,
   GET_ALL_BANDS,
   GET_BAND_DETAILS,
} from '../src/redux/actions';
import * as data from '../db.json';

// Acá se mockean las actions para que el test pueda funcionar correctamente, sin importar si hay un bug en ese archivo
jest.mock('../src/redux/actions', () => ({
   __esmodules: true,
   GET_ALL_BANDS: 'GET_ALL_BANDS',
   DELETE_BANDS: 'DELETE_BANDS',
   GET_BAND_DETAILS: 'GET_BANDS_DETAILS',
   CREATE_BANDS: 'CREATE_BANDS',
   createBands: (payload) => ({
      type: 'CREATE_BANDS',
      payload,
   }),
   deleteBands: (payload) => ({
      type: 'DELETE_BANDS',
      payload,
   }),
   getBandDetail: (payload) => ({
      type: 'GET_BAND_DETAILS',
      payload,
   }),
}));

describe('Reducer', () => {
   const state = {
      bands: [],
      bandDetail: {},
   };

   it('Si no hay un action-type válido, debe retornar el estado inicial', () => {
      expect(rootReducer(undefined, [])).toEqual({
         bands: [],
         bandDetail: {},
      });
   });

   it('Cuando la action-type es "GET_ALL_BANDS" debe guardar, en la propiedad "bands", las bandas obtenidas en nuestro llamado al Back-End', () => {
      const result = rootReducer(state, {
         type: GET_ALL_BANDS,
         payload: data.bands,
      });
      // Acuerdense que el state inicial no tiene que mutar!
      expect(result).not.toEqual(state);
      expect(result).toEqual({
         bands: data.bands, // Cuando ejecutes los tests, vas a ver bien lo que espera que le llegue a nuestro estado!
         bandDetail: {},
      });
   });

   it('Cuando la action-type es "GET_BAND_DETAILS" debe guardar, en la propiedad "bandDetail", la banda obtenida en nuestro llamado al Back-End', () => {
      const result = rootReducer(state, {
         type: GET_BAND_DETAILS,
         payload: data.bands[0],
      });
      // Acuerdense que el state inicial no tiene que mutar!
      expect(result).not.toEqual(state);
      expect(result).toEqual({
         bands: [],
         bandDetail: data.bands[0],
      });
   });

   it('Cuando la action-type es "CREATE_BANDS" debe agregar una nueva banda  en la propiedad "bands"', () => {
      const state = {
         bands: data.bands,
         bandsDetail: {},
      };

      const payload1 = {
         id: 6,
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
         id: 7,
         name: 'Metallica',
         origin: 'Los Angeles, California, United States',
         functionDate: '12-09-2023',
         description: `Metallica is an American heavy metal band that developed the subgenre of speed metal in the early and mid-1980s. The band released their first album, Kill 'Em All, in 1983, followed by Ride the Lightning in 1984`,
         members: [
            'James Hetfield',
            'Lars Ulrich',
            'Kirk Hammett',
            'Robert Trujillo',
         ],
         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Metallica_logo.png/800px-Metallica_logo.png',
         tickets: 5500,
      };

      const allBandsType1 = [
         ...data.bands,
         {
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
      ];
      const allBandsType2 = [
         ...allBandsType1,
         {
            id: 7,
            name: 'Metallica',
            origin: 'Los Angeles, California, United States',
            functionDate: '12-09-2023',
            description: `Metallica is an American heavy metal band that developed the subgenre of speed metal in the early and mid-1980s. The band released their first album, Kill 'Em All, in 1983, followed by Ride the Lightning in 1984`,
            members: [
               'James Hetfield',
               'Lars Ulrich',
               'Kirk Hammett',
               'Robert Trujillo',
            ],
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Metallica_logo.png/800px-Metallica_logo.png',
            tickets: 5500,
         },
      ];
      const firstBand = rootReducer(state, createBands(payload1));
      const secondBand = rootReducer(
         { ...state, bands: allBandsType1 },
         createBands(payload2)
      );

      // Acuerdense que el state inicial no tiene que mutar!
      expect(firstBand).not.toEqual(state);
      expect(secondBand).not.toEqual(state);

      expect(firstBand).toEqual({
         bandsDetail: {},
         bands: allBandsType1,
      });
      expect(secondBand).toEqual({
         bandsDetail: {},
         bands: allBandsType2,
      });
   });

   it('Cuando la action-type es "DELETE_BANDS" debe eliminar la banda con el ID recibido de la propiedad "bands"', () => {
      // Caso 1
      const payload = 1;
      const state = {
         bands: [
            {
               id: 1,
               name: 'The Beatles',
               origin: 'Liverpool, Reino Unido',
               functionDate: '09-10-2022',
               description:
                  'The Beatles, also known in the Hispanic world as los Beatles, was a British rock band formed in Liverpool during the 1960s.',
               members: [
                  'John Lennon',
                  'Paul McCartney',
                  'George Harrison',
                  'Ringo Starr',
               ],
               image: 'https://media.ambito.com/p/e90015ca4ed155874fcefa55e6ac539c/adjuntos/239/imagenes/039/981/0039981805/the-beatleswebp.png',
               tickets: 40000,
            },
         ],
         bandDetail: {},
      };

      expect(rootReducer(state, deleteBands(payload))).toEqual({
         bands: [],
         bandDetail: {},
      });

      //Caso 2
      const payload2 = 6;
      const state2 = {
         bands: [
            {
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
            {
               id: 7,
               name: 'Metallica',
               origin: 'Los Angeles, California, United States',
               functionDate: '12-09-2023',
               description: `Metallica is an American heavy metal band that developed the subgenre of speed metal in the early and mid-1980s. The band released their first album, Kill 'Em All, in 1983, followed by Ride the Lightning in 1984`,
               members: [
                  'James Hetfield',
                  'Lars Ulrich',
                  'Kirk Hammett',
                  'Robert Trujillo',
               ],
               image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Metallica_logo.png/800px-Metallica_logo.png',
               tickets: 5500,
            },
         ],
         bandDetail: {},
      };

      expect(rootReducer(state2, deleteBands(payload2))).toEqual({
         bands: [
            {
               id: 7,
               name: 'Metallica',
               origin: 'Los Angeles, California, United States',
               functionDate: '12-09-2023',
               description: `Metallica is an American heavy metal band that developed the subgenre of speed metal in the early and mid-1980s. The band released their first album, Kill 'Em All, in 1983, followed by Ride the Lightning in 1984`,
               members: [
                  'James Hetfield',
                  'Lars Ulrich',
                  'Kirk Hammett',
                  'Robert Trujillo',
               ],
               image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Metallica_logo.png/800px-Metallica_logo.png',
               tickets: 5500,
            },
         ],
         bandDetail: {},
      });
   });
});
