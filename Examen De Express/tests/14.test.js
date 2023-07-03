const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const controller = require('../controllers/controllers')

describe('/cats/add-accessory', function () {
  beforeEach(function () {
    controller.reset()
  })

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

  
  it('PUT, agrega un accesorio al gato', function () {
    controller.testCats().push(cats[1])
    controller.testAccessories().push(accessories[0])
    const body = {
      catName: 'Pip',
      catAccessory: accessories[0]
    }
    return supertest
      .put('/cats/add-accessory')
      .send(body)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ message: 'El accesorio Bun fue agregado a Pip con exito' })
        expect(controller.testAccessories()[0].toJSON).to.eql(body.toJSON)
      })
  })

  it('PUT tiene que devolver un 400 si el accesorio ya se encuentra en el gato', function () {
    controller.testCats().push(cats[2])
    controller.testAccessories().push(accessories[1])
    controller.testCats()[0].accessories.push(accessories[1])
    return supertest
      .put('/cats/add-accessory')
      .send({
        catName: 'Bubbles',
        catAccessory: accessories[1]
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ error: 'El gato Bubbles ya tiene el accesorio puesto' })
      })
  })

  it('PUT si no encuentra el gato, responde con un error', function () {
    controller.testAccessories().push(accessories[2])
    return supertest
      .put('/cats/add-accessory')
      .send({
        catName: 'Mati',
        catAccessory: accessories[2]
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ error: 'El gato Mati no existe' })
      })
  })
})
