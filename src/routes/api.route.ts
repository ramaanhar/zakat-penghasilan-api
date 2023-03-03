import { Router } from 'express'
import apiController from '../controllers/api.controller'
import validate from '../middlewares/validation.middleware'
import countInputValidation from '../validations/countInput.validation'

const APIRouter: Router = Router()

APIRouter.post('/count', validate(countInputValidation), apiController.count)
APIRouter.get('/nisab', apiController.getNisab)
APIRouter.get('/gold-price', apiController.getGoldPrice)
APIRouter.get('/prices', apiController.findAllPrices)
export default APIRouter
