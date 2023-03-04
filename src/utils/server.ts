import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import { refreshData } from '../middlewares/goldPrice.middleware'
import routes from '../routes'

export const createServer = (): Application => {
  const app: Application = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(cors())
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    await refreshData()
    next()
  })

  routes(app)
  return app
}
