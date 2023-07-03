const expect = require('chai').expect

const controller = require('../controllers/controllers')

describe('---------- `listCats` ----------', function () {
  beforeEach(function () {
    controller.reset()
  })
  const ats = [{
    name: "name",
    age: '1 year',
    color: [],
    accessories: []
  },
  {
    name: "lala",
    age: '1 year',
    color: [],
    accessories: []
  },
  {
    name: "Mate",
    age: '2 year',
    color: [],
    accessories: []
  },
  {
    name: "Mora",
    age: '3 year',
    color: [],
    accessories: []
  },{
    name: "Nico",
    age: '1 year',
    color: [],
    accessories: []
  },
  {
    name: "Fede",
    age: '1 year',
    color: [],
    accessories: []
  }]
  it('Debe tener la propiedad <age> inicialmente en 1 year', function () {
    controller.testCats().push(ats[0], ats[1])
    expect(controller.listCats('1 year')).to.deep.eql([{
      name: "name",
      age: '1 year',
      color: [],
      accessories: []
    },
    {
      name: "lala",
      age: '1 year',
      color: [],
      accessories: []
    }])

})
it('Debe retornar todos los gatos si no recibe parametro age', function () {
  controller.testCats().push(ats[4], ats[5])
  expect(controller.listCats()).to.eql([ats[4], ats[5]])

})
  it(`En caso de recibir un parámetro diferente a <1 year>, arroja un error`, function () {
    controller.testCats().push(ats[2], ats[3])
    expect(() => controller.listCats('5 years')).to.throw("El gato o gata tiene una edad diferente")
    expect(() => controller.listCats('2 years')).to.throw("El gato o gata tiene una edad diferente")
  })
})
