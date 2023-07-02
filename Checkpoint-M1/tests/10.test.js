/* eslint-disable no-undef */
const {
  closureTrip
} = require('../checkpoint.js');


xdescribe('EJERCICIO 10: closureTrip', function() {

  let flights = [{origin: 'BUE', destinations: [{city: 'FRANCIA', miles: 500}, {city: 'ITALIA', miles: 200}, {city: 'ALEMANIA', miles: 400}]},
    {origin: 'ITALIA', destinations: [{city: 'FRANCIA', miles: 30}]},
    {origin: 'BUE', destinations: [{city: 'MENDOZA', miles: 30}, {city: 'CORDOBA', miles: 700},
    {city: 'SALTA', miles: 200}]},
    {origin: 'SALTA', destinations: [{city: 'BUE', miles: 500}, {city: 'CORDOBA', miles: 700}, {city: 'SANTA FE', miles: 400}]}];

  let flightClosure = closureTrip(flights);

  let juana = {
    name: 'Juana',
    miles: 450,
    origin: 'BUE'
  };

  let pedro = {
    name: 'Pedro',
    miles: 700,
    origin: 'BUE'
  };

  let maria = {
    name: 'Maria',
    miles: 200,
    origin: 'SALTA'
  };


  it('Debe identificar a que ciudades/paises puede ir Juana', function() {
    expect(flightClosure(juana)).toEqual(['ITALIA', 'ALEMANIA', 'MENDOZA', 'SALTA']);
  });

  it('Debe identificar a que ciudades/paises puede ir Pedro', function() {
    expect(flightClosure(pedro)).toEqual([ 'FRANCIA', 'ITALIA', 'ALEMANIA', 'MENDOZA', 'CORDOBA', 'SALTA' ]);
  });

  it('Debe identificar a que ciudades/paises puede ir Maria', function() {
    expect(flightClosure(maria)).toEqual([]);
  });

});
