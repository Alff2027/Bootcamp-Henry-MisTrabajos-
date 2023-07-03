const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const controller = require('../controllers/controllers')

describe('DELETE /accessories', function () {
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

  it('Responde con el id del accesorio eliminado', function () {
    controller.testAccessories().push(accessories[0], accessories[1], accessories[2])
    return supertest
      .delete('/accessories')
      .send({ id: 3 })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ message: 'El accesorio con el id 3 fue eliminado correctamente' })
        expect(controller.testAccessories()).to.have.length(2)
      })
  })

  it('Si el accesorio no fue encontrado responde con un error', function () {
    controller.testAccessories().push(accessories[0])
    const id = 2
    return supertest
      .delete('/accessories')
      .send({ id })
      .expect(404)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ error: 'El accesorio con el id ' + id + ' no fue encontrado' })
        expect(controller.testAccessories()).to.have.length(1)
      })
  })
})
