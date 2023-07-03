import {expect} from 'chai';
import sinon from 'sinon';

import {groupBy, flowRight} from '../../server/flatline';

describe('▒▒▒ JavaScript tests ▒▒▒', function () {
    /*  Estos estan basados en métodos de lodash. 
        Referencia la documentación de loadash para clarificar el proposito de cada método 
    */
    describe('flatline', () => {

        describe('groupBy function', () => {

            /*********************************
             *
             *   _.groupBy
             *
             *   en lodash: https://lodash.com/docs#groupBy
             *
             *   IMPORTANTE nota: los siguientes specs no componen TODAS las características del groupBy de loadsh:
             *   por ejemplo: tomar un objeto como un parametro.
             * 
             *   Dado una colección puesta a través de una función iteradora, va a retornar un objeto, con
             *   las propiedades relacionadas con el valor retornado por la función iteradora por cada elemento,
             *   y el valor un arreglo de los elementos que retornaron el mismo valor.
             *
             *   e.g.
             *
             *      la colección nombres `profesores` ['Santi', 'Solano', 'Toni', 'Facu']
             *
             *      la función iteradora: function(profesor) {
             *          return profesor[0]; // la primera letra del nombre
             *      }
             *
             *      _.groupBy(staff, iterator) retorna
             *
             *     {
             *       'S': ['Santi', 'Solano'],
             *       'T': ['Toni'],
             *       'F': ['Facu']
             *     }
             *
             *
             *********************************/

            let users;
            beforeEach(() => {
                users = [
                    { name: 'Greg', age: 12, state: 'NJ' },
                    { name: 'Julie', age: 18, state: 'NY' },
                    { name: 'Bobby', age: 24, state: 'NJ' },
                    { name: 'Mark', age: 56, state: 'TX' },
                    { name: 'Nicole', age: 21, state: 'NV' },
                    { name: 'Joe', age: 13, state: 'NY' },
                    { name: 'Emily', age: 56, state: 'MA' },
                    { name: 'Katherine', age: 21, state: 'NJ' },
                    { name: 'John', age: 6, state: 'TX' }
                ];
            });

            xit('retorna un object', () => {
                const returnValue = groupBy(users, user => user.age > 13);
                expect(returnValue).to.be.an('object');
            });

            describe('el objeto retornado', () => {

                xit('tiene llaves que coinciden con los valores retornados del iterador y el valor de cada propiedad es un arreglo de los elementos que fueron el parametro cuando la llave fue retornada', () => {

                    const returnValue = groupBy(users, user => {
                        if (user.age > 13) {
                            return 'sobre13';
                        } else {
                            return 'debajoOExactamente13';
                        }
                    });

                    expect(returnValue.debajoOExactamente13).to.be.an('array');
                    expect(returnValue.debajoOExactamente13).to.have.length(3);
                    expect(returnValue.sobre13).to.have.length(users.length - 3);

                    const nombreDeLosJovenes = returnValue.debajoOExactamente13.map(user => user.name);

                    expect(nombreDeLosJovenes).to.be.deep.equal(['Greg', 'Joe', 'John']);

                });

                xit('toma y agrupa por una propiedad específica si un string es provisto en vez de una función', () => {

                    const returnValue = groupBy(users, 'state');

                    expect(Object.keys(returnValue)).to.be.deep.equal([
                        'NJ',
                        'NY',
                        'TX',
                        'NV',
                        'MA'
                    ]);

                    expect(returnValue.NJ).to.have.length(3);

                    const namesFromNewJersey = returnValue.NJ.map(user => user.name);

                    expect(namesFromNewJersey).to.be.deep.equal(['Greg', 'Bobby', 'Katherine']);

                });

            });

        });

        describe('función flowRight (compose)', () => {

            /*********************************
             *
             *   flowRight (antes conocida como _.compose)
             *
             *   en lodash: https://lodash.com/docs#flowRight
             *
             *   Toma una cantidad arbitrara de funciones y retorna una nueva función que usa sus argumentos
             *   y llama las funciones provistas de derecha a izquiera (última a primera). El argumento de cada
             *   función (exceptuando el primero) es determinado por el valor retornado por la función a su derecha.
             *   El llamado a la función retornada por flowRight evalua al valor retornado de la función más
             *   a la izquierda.
             *
             *   e.g.
             *
             *   sayHello = function (name) {
             *      return 'Hello, ' + name;
             *   }
             *
             *   addExclamation = function (s) {
             *      return s + '!';
             *   }
             *
             *   smallTalk = function (s) {
             *      return s + ' Nice weather we are having, eh?';
             *   }
             *
             *   greetEnthusiastically = flowRight(addExclamation, sayHello)
             *
             *   greetEnthusiastically('Guille')
             *   --> returns 'Hello, Guille!'
             *
             *   (sayHello es llamado con 'Guille', addExclamation es llamado con 'Hello, Guille')
             *
             *
             *
             *   greetEnthusiasticallyAndTalkAboutWeather = flowRight(smallTalk, greetEnthusiastically)
             *
             *   greetEnthusiasticallyAndTalkAboutWeather('Toni')
             *   --> returns 'Hello, Toni! Nice weather we are having, eh?'
             *
             *   (greetEnthusiastically es llamado con 'Toni', smallTalk es llamado con 'Hello, Toni!')
             *
             *********************************/

            let add2;
            let add1;
            let multiply3;
            let divide2;
            beforeEach(() => {

                add2 = sinon.spy(n => n + 2);

                add1 = sinon.spy(n => n + 1);

                multiply3 = sinon.spy(n => n * 3);

                divide2 = sinon.spy(n => n / 2);

            });

            let mathMaxSpy;

            beforeEach(() => {
                mathMaxSpy = sinon.spy(Math, 'max');
            });

            afterEach(() => {
                Math.max.restore();
            });

            xit(`retorna una nueva función que llama la función provista de derecha a izquierda
                con el valor retornado de la función anterior, y finalmente evalua 
                al valor retornado de función más a la izquierda`, () => {

                const add3 = flowRight(add2, add1);

                const returnValue = add3(0);

                expect(add1.calledWith(0)).to.be.equal(true);
                expect(add2.calledWith(1)).to.be.equal(true);
                expect(returnValue).to.be.equal(3);

            });

            xit('toma una cantidad arbitraria de funciones para componer', () => {
                const add1ThenMultiplyBy3ThenDivideBy2 = flowRight(divide2, multiply3, add1);

                const returnValue1 = add1ThenMultiplyBy3ThenDivideBy2(1);

                expect(add1.calledWith(1)).to.be.equal(true);
                expect(multiply3.calledWith(2)).to.be.equal(true);
                expect(divide2.calledWith(6)).to.be.equal(true);
                expect(returnValue1).to.be.equal(3);

                const add10 = flowRight(add2, add2, add2, add2, add2);

                const returnValue2 = add10(5);

                expect(add2.callCount).to.be.equal(5);
                expect(returnValue2).to.be.equal(15);

            });

            xit('llama a la función más a la aderecha con el argumento dado', () => {

                const multiplyMaxBy3 = flowRight(multiply3, mathMaxSpy);

                const returnValue = multiplyMaxBy3(6, 5, 1, 3, 5, 10, 2, 3);

                expect(mathMaxSpy.calledWithExactly(6, 5, 1, 3, 5, 10, 2, 3)).to.be.equal(true);
                expect(multiply3.calledWith(10)).to.be.equal(true);
                expect(returnValue).to.be.equal(30);

            });

        });

    });

});
