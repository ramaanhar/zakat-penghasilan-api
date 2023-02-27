import { type Request, type Response } from 'express'

class AController {
  findAll = (req: Request, res: Response): Response => {
    return res.status(200).json({ message: 'Ini huruf A' })
  }

  enter = (req: Request, res: Response): Response => {
    const { input }: { input: string } = req.body
    return res.status(200).json({ message: `Kamu baru saja memasukkan kata '${input}'` })
  }
}

export default new AController()
