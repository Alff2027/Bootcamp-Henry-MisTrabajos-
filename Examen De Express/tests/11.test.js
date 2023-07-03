const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const controller = require('../controllers/controllers')

describe('POST /accessories', function () {
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

  it('Agrega un nuevo accesorio y responde con un mensaje de confirmación', function () {
    return supertest
      .post('/accessories')
      .send({
        id: 5,
        color: 'Yellow',
        type: 'Sweater',
        description: 'Warm Sweater'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ message: 'El accesorio Sweater fue agregado correctamente' })
        expect(controller.testAccessories()).to.have.length(1)
        expect(controller.testAccessories()[0].type).to.eql('Sweater')
      })
  })

  it('Si el accesorio ya existe, no lo agrega y responde con un error', function () {
    controller.testAccessories().push(accessories[2])
    return supertest
      .post('/accessories')
      .send({
        id: 5,
        color: 'Yellow',
        type: 'Sweater',
        description: 'Warm Sweater'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ error: 'El accesorio con el id 5 ya existe' })
        expect(controller.testAccessories()).to.have.length(1)
      })
  })
})
