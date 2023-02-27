import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import routes from './routes'
import logger from './utils/logger'
import cors from 'cors'

const app: Application = express()
const port: number = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 200, message: 'Hello world' })
})

app.listen(port, () => {
  logger.info(`Server is running at port ${port}`)
})
