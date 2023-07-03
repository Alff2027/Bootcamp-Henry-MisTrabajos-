const expect = require('chai').expect

const controller = require('../controllers/controllers')

describe('---------- `addAccessory` y `getAccesories` ----------', function () {
  beforeEach(function () {
    controller.reset()
  })
  
  it('Agrega accesorios al arreglo', function () {
    const obj = {
      id: 7,
      type: 'Shoes',
      color: 'Black',
      description: 'Black warm cat shoes'
    }
    expect(controller.addAccessory(obj)).to.eql("El accesorio Shoes fue agregado correctamente");
    expect(controller.testAccessories()).to.have.length(1)
  })
  
  it('Asigna un id correctamente', function () {
    const objs = [{
      id: 8, type: 'Necklace', color: 'Red', description: 'Golden Necklace'}, {
      id: 2, type: 'Bun', color: 'Blue', description: 'Ocean blue bun' }, {
      id: 16, type: 'Bracelet', color: 'Red', description: 'Red bracelet'
    }]
    controller.addAccessory(objs[0])
    expect(controller.testAccessories()).to.have.length(1)
    expect(controller.testAccessories()[0].id).to.eql(8)
    controller.addAccessory(objs[1])
    expect(controller.testAccessories()).to.have.length(2)
    expect(controller.testAccessories()[1].id).to.eql(2)
    controller.addAccessory(objs[2])
    expect(controller.testAccessories()).to.have.length(3)
    expect(controller.testAccessories()[2].id).to.eql(16)
  })

  it('Su propiedad <popularity> será inicialmente "low"', function () {
    const obj = { id: 9, color: 'Red', type: 'Necklace', description: 'Golden Necklace' }
    controller.addAccessory(obj)
    expect(controller.testAccessories()).to.have.length(1)
    expect(controller.testAccessories()[0].popularity).to.eql('low')
  })
  
  it('Si el accesorio ya existe, no la agrega y arrojar un error', function () {
    const obj = { id: 8, color: 'Red', type: 'Necklace', description: 'Golden Necklace' }
    controller.addAccessory(obj)
    expect(controller.testAccessories()).to.have.length(1)
    expect(() => controller.addAccessory(obj)).to.throw('El accesorio con el id 8 ya existe')
    expect(controller.testAccessories()).to.have.length(1)
  })

  it('Inicialmente devuelve un arreglo vacío', function () {
    expect(controller.getAccessories()).to.eql([])
  })

  it('En caso de recibir un parámetro (type, color o ambos), devuelve sólo los accesorios correspondientes', function () {
    const objs = [{
      id: 8, type: 'Necklace', color: 'Red', description: 'Golden Necklace'}, {
      id: 2, type: 'Bun', color: 'Blue', description: 'Ocean blue bun' }, {
      id: 16, type: 'Bracelet', color: 'Red', description: 'Red bracelet' }, {
      id: 19, color: 'White', type: 'Bracelet', description: 'Cloud white bracelet'
    }]
    controller.addAccessory(objs[0])
    controller.addAccessory(objs[1])
    controller.addAccessory(objs[2])
    controller.addAccessory(objs[3])
    expect(controller.getAccessories('Bracelet')).to.have.length(2)
    expect(controller.getAccessories(null, 'Blue')).to.have.length(1)
    expect(controller.getAccessories('Bracelet', 'Blue')).to.have.length(3)
  })

})
