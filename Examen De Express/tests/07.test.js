const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const controller = require('../controllers/controllers')

describe('/cats', function () {
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


  it('GET responde con un array con todos los gatos agregados', function () {
    controller.testCats().push(ats[0], ats[1])
    return supertest
      .get('/cats')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql(controller.testCats())
      })
      .expect(200)
  })

  it('GET responde con un array de todos los gatos que tengan 1 año recibido por query params', function () {
    controller.testCats().push(ats[4], ats[5], ats[3])
    return supertest
      .get('/cats?age=1 year')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql(controller.testCats().slice(0, 2))
      })
      .expect(200)
  })
  it('GET responde con un status 400 y un mensaje El gato o gata tiene una edad diferente', function () {
    controller.testCats().push(ats[2], ats[3])
    return supertest
      .get('/cats?age=4 years')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({error: "El gato o gata tiene una edad diferente"})
      })
      .expect(400)
  })
})
