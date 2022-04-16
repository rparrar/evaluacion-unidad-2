const express = require('express')
const CarsController = require('./controllers/CarsController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const carsController = new CarsController(sqlClient)
const pageController = new PageController()

// Routes
router.get('/', carsController.renderHomeWithCars)
router.get('/car/new', carsController.renderCarCreationForm)
router.post('/cars/create', carsController.insertAndRenderCar)
router.get('/cars/:id', carsController.renderSingleCar)
router.get('/cars/:id/update', carsController.renderCarUpdateForm)
router.post('/cars/:id/update', carsController.updateAndRenderCar)
router.post('/cars/:id/delete', carsController.deleteCarAndRenderResponse)
router.get('/about', pageController.renderAbout)
router.get('/about-system', pageController.renderAboutSystem)
router.get('*', pageController.renderNotFound)

module.exports = router
