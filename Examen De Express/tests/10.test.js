const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const controller = require('../controllers/controllers')

describe('PUT /accessories', function () {
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


  it('Responde con el accesorio modificado', function () {
    controller.testAccessories().push(accessories[0])
    return supertest
      .put('/accessories')
      .send({
        id: 8,
        type: 'Bracelet',
        color: 'Gold',
        description: 'Golden Bracelet'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ id: 8, type: 'Bracelet', color: 'Gold', description: 'Golden Bracelet', popularity: 'low' })
        expect(controller.testAccessories()).to.have.length(1)
      })
  })

  it('Si req.body viene vacio, no modifica el accesorio', function () {
    controller.testAccessories().push(accessories[0])
    return supertest
      .put('/accessories')
      .send({})
      .expect(404)
      .expect('Content-type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ error: 'No se detectaron cambios a aplicar' })
      })
  })

  it('Si el accesorio no es encontrado, responde con un error 404', function () {
    controller.testAccessories().push(accessories[0])
    return supertest
      .put('/accessories')
      .send({
        id: 6,
        type: 'Bracelet',
        color: 'Gold',
        description: 'Golden Bracelet'
      })
      .expect(404)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ error: 'Accesorio no encontrado' })
      })
  })
})
