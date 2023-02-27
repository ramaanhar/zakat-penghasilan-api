import { Router } from 'express'
import aController from '../controllers/a.controller'

const ARouter: Router = Router()
ARouter.get('/', aController.findAll)
ARouter.post('/enter', aController.enter)

export default ARouter
