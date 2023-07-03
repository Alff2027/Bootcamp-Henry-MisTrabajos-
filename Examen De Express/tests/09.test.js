const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const controller = require('../controllers/controllers')

describe('GET /accessories', function () {
  beforeEach(function () {
    controller.reset()
  })

  const accessories = [{
    id: 8,
    type: 'Bun',
    color: 'Black',
    description: 'Black Bun',
    popularity: 'low'
  },
  {
    id: 3,
    type: 'Necklace',
    color: 'Red',
    description: 'Red Necklace',
    popularity: 'low'
  }, {
    id: 5,
    type: 'Bracelet',
    color: 'Gray',
    description: 'Silver Bracelet',
    popularity: 'low'
  }]

  it('GET inicialmente responde con un array vacío', function () {
    return supertest
      .get('/accessories')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql([])
      })
      .expect(200)
  })

  it('GET responde con un array de todos los acccesorios', function () {
    controller.testAccessories().push(accessories[0], accessories[1], accessories[2])
    return supertest
      .get('/accessories')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql(controller.testAccessories())
      })
      .expect(200)
  })
  it('GET responde un array filtrado por tipo', function () {
    controller.testAccessories().push(accessories[0], accessories[1], accessories[2])
    return supertest
      .get('/accessories')
      .query({
        type: 'Bun'
      })
      .query({
        color: 'null'
      })
      .expect('Content-type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql([controller.testAccessories()[0]])
      })
      .expect(200)
  })

  it('GET responde un array filtrado por color', function () {
    controller.testAccessories().push(accessories[0], accessories[1], accessories[2])
    return supertest
      .get('/accessories')
      .query({
        type: null,
        color: 'Black'
      })
      .expect('Content-type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql([controller.testAccessories()[0]])
      })
      .expect(200)
  })

  it('GET responde un array filtrado por tipo y color', function () {
    controller.testAccessories().push(accessories[0], accessories[1], accessories[2])
    return supertest
      .get('/accessories')
      .query({
        type: 'Bracelet'
      })
      .query({
        color: 'Red'
      })
      .expect('Content-type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql([controller.testAccessories()[1], controller.testAccessories()[2]])
      })
      .expect(200)
  })
})
