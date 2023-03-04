import { type Application, type Request, type Response, type NextFunction } from 'express'
import logger from './utils/logger'
import { createServer } from './utils/server'

import './utils/connectDB'

const app: Application = createServer()
const port: number = 4000

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 200, message: 'Hello world' })
})

app.listen(port, () => {
  logger.info(`Server is running at port ${port}`)
})
