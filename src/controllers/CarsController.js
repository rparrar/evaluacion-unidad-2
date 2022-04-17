const CarsDAO = require('../models/dao/CarsDAO')

class CarsController {
  constructor (db) {
    this.carsDao = new CarsDAO(db)
    this.renderHomeWithCars = this.renderHomeWithCars.bind(this)
    this.renderSingleCar = this.renderSingleCar.bind(this)
    this.renderCarCreationForm = this.renderCarCreationForm.bind(this)
    this.renderCarUpdateForm = this.renderCarUpdateForm.bind(this)
    this.insertAndRenderCar = this.insertAndRenderCar.bind(this)
    this.updateAndRenderCar = this.updateAndRenderCar.bind(this)
    this.deleteCarAndRenderResponse = this.deleteCarAndRenderResponse.bind(this)
  }

  async renderHomeWithCars (req, res) {
    const cars = await this.carsDao.getAll()
    const totalvehicles = cars.length
    res.render('home', {
      cars,
      title: 'INICIO',
      totalvehicles,
      activehome: 1
    })
  }

  async renderSingleCar (req, res) {
    const id = req.params.id
    try {
      const car = await this.carsDao.getById(id)
      if (!car) {
        res.status(404).render('404')
        return
      }

      res.render('car', {
        title: 'VISTA INDIVIDUAL',
        id,
        image: car.image,
        model: car.model,
        brand: car.brand,
        price: car.price,
        stock: car.stock
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500', {
        title: 'ERROR EN EL SERVIDOR'
      })
    }
  }

  renderCarCreationForm (req, res) {
    res.render('car-form', {
      title: 'AGREGANDO NUEVO VEHICULO',
      activeadd: 1
    })
  }

  async renderCarUpdateForm (req, res) {
    const id = req.params.id

    try {
      const car = await this.carsDao.getById(id)

      if (!car) {
        res.status(404).render('404')
        return
      }

      res.render('car-form', {
        id,
        image: car.image,
        brand: car.brand,
        model: car.model,
        price: car.price,
        stock: car.stock,
        title: 'ACTUALIZANDO VEHICULO'
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500', {
        title: 'ERROR EN EL SERVIDOR'
      })
    }
  }

  async insertAndRenderCar (req, res) {
    const image = req.body.image
    const brand = req.body.brand
    const model = req.body.model
    const price = req.body.price
    const stock = req.body.stock

    const car = { image, brand, model, price, stock }
    try {
      const id = await this.carsDao.create(car)

      res.redirect(`/cars/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500', {
        title: 'ERROR EN EL SERVIDOR'
      })
    }
  }

  async updateAndRenderCar (req, res) {
    const id = req.params.id
    const image = req.body.image
    const brand = req.body.brand
    const model = req.body.model
    const price = req.body.price
    const stock = req.body.stock

    try {
      const car = { id, image, brand, model, price, stock }
      await this.carsDao.update(car)
      res.redirect(`/cars/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500', {
        title: 'ERROR EN EL SERVIDOR'
      })
    }
  }

  async deleteCarAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const car = await this.carsDao.getById(id)

      if (!car) {
        res.status(404).render('404')
        return
      }

      await this.carsDao.delete(id)

      res.render('car-deleted', {
        title: 'VEHICULO ELIMINADO',
        id: car.id,
        brand: car.brand,
        model: car.model
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500', {
        title: 'ERROR EN EL SERVIDOR'
      })
    }
  }
}

module.exports = CarsController
