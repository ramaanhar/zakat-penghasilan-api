import { type Request, type Response } from 'express'

interface countInput {
  salary: number
  anotherIncome: number
}

class APIController {
  private readonly goldPricePerGramInIDR = 1000000

  count = (req: Request, res: Response): Response => {
    const { salary, anotherIncome }: countInput = req.body
    const totalIncome = salary * 12 + anotherIncome
    let perYear = 0
    let wajibZakat = false
    if (totalIncome >= this.goldPricePerGramInIDR * 85) {
      perYear = totalIncome * 0.025
      wajibZakat = true
    }
    const perMonth = perYear / 12
    return res.status(200).json({
      message: 'Success',
      data: {
        wajibZakat,
        perYear,
        perMonth
      }
    })
  }

  getNisab = (req: Request, res: Response): Response => {
    return res.status(200).json({
      message: 'Success',
      data: {
        amount: this.goldPricePerGramInIDR * 85
      }
    })
  }

  getGoldPrice = (req: Request, res: Response): Response => {
    return res.status(200).json({
      message: 'Success',
      data: {
        amount: this.goldPricePerGramInIDR
      }
    })
  }
}

export default new APIController()
