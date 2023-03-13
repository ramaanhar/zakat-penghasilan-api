import { type Request, type Response } from 'express'
import { getAllGoldPrices, getTodayGoldPrice } from '../services/goldPrice.service'
import { failedResponse, notFoundResponse, successResponse } from '../utils/responses'
import type countInput from '../interfaces/countInput.interface'

class APIController {
  // private readonly goldPricePerGramInIDR = 1000000

  count = async (req: Request, res: Response): Promise<Response> => {
    try {
      const goldPrice = await getTodayGoldPrice()
      if (!goldPrice) return notFoundResponse(res, 'Gold price')
      const { salary, anotherIncome }: countInput = req.body
      const totalIncome = salary * 12 + anotherIncome
      let perYear = 0
      let wajibZakat = false
      if (totalIncome >= goldPrice.price * 85) {
        perYear = totalIncome * 0.025
        wajibZakat = true
      }
      const perMonth = perYear / 12
      return successResponse(res, { wajibZakat, perYear, perMonth })
    } catch (err: any) {
      return failedResponse(res, err.message)
    }
  }

  getNisab = async (req: Request, res: Response): Promise<Response> => {
    try {
      const price = await getTodayGoldPrice()
      if (!price) return notFoundResponse(res, 'Gold price')
      return successResponse(res, price.price * 85)
    } catch (err: any) {
      return failedResponse(res, err.message)
    }
  }

  getGoldPrice = async (req: Request, res: Response): Promise<Response> => {
    try {
      const price = await getTodayGoldPrice()
      if (!price) return notFoundResponse(res, 'Gold price')
      const priceValue = price.price
      return successResponse(res, { price: priceValue })
    } catch (err: any) {
      return failedResponse(res, err.message)
    }
  }

  findAllPrices = async (req: Request, res: Response): Promise<Response> => {
    try {
      const prices = await getAllGoldPrices()
      return successResponse(res, prices)
    } catch (err: any) {
      return failedResponse(res, err.message)
    }
  }
}

export default new APIController()
