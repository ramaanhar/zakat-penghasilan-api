import { type Request, type Response } from 'express'

class BController {
  findAll = (req: Request, res: Response): Response => {
    return res.status(200).json({ message: 'Ini huruf B' })
  }
}

export default new BController()
