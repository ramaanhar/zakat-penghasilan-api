import { Router } from 'express'
import bController from '../controllers/b.controller'

const BRouter: Router = Router()
BRouter.get('/', bController.findAll)

export default BRouter
