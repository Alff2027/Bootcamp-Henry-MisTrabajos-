const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const controller = require('../controllers/controllers')
describe('PUT /accessories/update-popularity', function () {
  beforeEach(function () {
    controller.reset()
  })

  const accessories = [{
    id: 8,
    type: 'Bracelet',
    color: 'White',
    description: 'White Bracelet',
    popularity: 'low'
  },
  {
    id: 3,
    type: 'Necklace',
    color: 'Green',
    description: 'Green Necklace',
    popularity: 'low'
  }, {
    id: 5,
    type: 'Bracelet',
    color: 'Gray',
    description: 'Silver Bracelet',
    popularity: 'low'
  }]

  const cats = [{
    name: 'Fex',
    age: '1 year',
    color: [],
    accessories: []
  }, {
    name: 'Pip',
    age: '1 year',
    color: [],
    accessories: []
  }, {
    name: 'Bubbles',
    age: '1 year',
    color: [],
    accessories: []
  }]

  it('Modifica la popularidad de un accesorio y responde con un mensaje', function () {
   controller.testCats().push(cats[0], cats[1], cats[2])
    controller.testAccessories().push(accessories[0])
    controller.testCats()[0].accessories.push(accessories[0])
    controller.testCats()[1].accessories.push(accessories[0])
    controller.testCats()[2].accessories.push(accessories[0])
    return supertest
      .put('/accessories/update-popularity')
      .send({
        id: 8
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ message: 'La popularidad del accesorio White Bracelet fue actualizada a high' })
        expect(controller.getAccessories()[0].popularity).to.eql('high')
      })
  })

  it('Si la popularidad no fue actualizada, responde con un mensaje', function () {
    controller.testAccessories().push(accessories[1])
    controller.testCats().push(cats[0])
    controller.testCats()[0].accessories.push(accessories[1])
    return supertest
      .put('/accessories/update-popularity')
      .send({
        id: 3
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ message: 'No hubieron cambios en la popularidad del accesorio Green Necklace' })
        expect(controller.getAccessories()[0].popularity).to.eql('low')
      })
  })

  it('Si el accesorio no existe responde con un error', function () {
    return supertest
      .put('/accessories/update-popularity')
      .send({
        id: 5
      })
      .expect(404)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ error: 'accesorio no encontrado' })
      })
  })
})
