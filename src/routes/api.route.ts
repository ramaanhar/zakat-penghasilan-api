import { Router } from 'express'
import apiController from '../controllers/api.controller'

const APIRouter: Router = Router()

APIRouter.post('/count', apiController.count)
APIRouter.get('/nisab', apiController.getNisab)
APIRouter.get('/gold-price', apiController.getGoldPrice)
export default APIRouter
