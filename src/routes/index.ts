import { type Application, type Router } from 'express'
import APIRouter from './api.route'

const _routes: Array<[string, Router]> = [['/api', APIRouter]]

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
