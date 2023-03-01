import { type Application, type Router } from 'express'
import ARouter from './a.route'
import BRouter from './b.route'
import APIRouter from './api.route'

const _routes: Array<[string, Router]> = [
  ['/a', ARouter],
  ['/api', APIRouter],
  ['/b', BRouter]
]

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
