import { type Request, type Response } from 'express'
import { fetchGoldPriceFromAPI, getAllGoldPrices } from '../services/goldPrice.service'

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

  getGoldPrice = async (req: Request, res: Response): Promise<Response> => {
    try {
      // const price = await getTodayGoldPrice()
      // if (price.length === 0) {
      //   return res.status(404).json({
      //     message: 'Not Found'
      //   })
      // }
      const currentPrice = await fetchGoldPriceFromAPI()
      return res.status(200).json({
        message: 'Success',
        data: currentPrice
      })
    } catch (err: any) {
      return res.status(400).json({
        message: 'Error',
        error: err.message
      })
    }
  }

  findAllPrices = async (req: Request, res: Response): Promise<Response> => {
    try {
      const prices = await getAllGoldPrices()
      return res.status(200).json({
        message: 'Success',
        data: prices
      })
    } catch (err) {
      return res.status(400).json({
        message: 'Error',
        error: err
      })
    }
  }
}

export default new APIController()
