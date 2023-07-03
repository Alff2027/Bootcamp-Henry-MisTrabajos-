const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const controller = require('../controllers/controllers')

describe('/cat', function () {
  beforeEach(function () {
    controller.reset()
  })
  const cats = [{
    name: 'Franco'
  }]
  it('POST agrega un nuevo gato, responde con un mensaje de confirmación y su status correspondiente', function () {
    return supertest
      .post('/cat')
      .send({ name: 'Franco' })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ cat: { accessories: [], age: '1 year', color: [], name: 'Franco' } })
        expect(controller.testCats()).to.have.length(1)
      })
  })

  it('POST si el gato ya existe, responde con un error con su status correspondiente', function () {
    controller.testCats().push(cats[0])
    return supertest
      .post('/cat')
      .send({
        name: 'Franco'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ error: 'El gato o gata ya existe' })
        expect(controller.testCats()).to.have.length(1)
      })
  })
})
