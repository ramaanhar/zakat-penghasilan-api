import logger from '../utils/logger'
import goldPriceModel from '../models/goldPrice.model'
import axios from 'axios'
import CONFIG from '../config/environment'

export const getAllGoldPrices = async (): Promise<any> => {
  const goldPrices = await goldPriceModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot retrieve data')
      logger.error(err)
    })
  return goldPrices
}
export const getTodayGoldPrice = async (): Promise<any> => {
  const now: Date = new Date()
  const startDate = new Date(now).setHours(0, 0, 0, 0)
  const endDate = new Date(now).setHours(23, 59, 59, 999)
  const goldPrice = await goldPriceModel
    .findOne({ date: { $gte: startDate, $lte: endDate } })
    .sort({ date: -1 })
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot retrieve data')
      logger.error(err)
    })
  return goldPrice
}
export const fetchGoldPriceFromAPI = async (): Promise<any> => {
  try {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    const year = `${date.getFullYear()}`
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    const url = `https://api.metalpriceapi.com/v1/convert?api_key=${CONFIG.goldPriceAPIKey}&from=XAU&to=IDR&amount=1&date=${year}-${month}-${day}`
    // ditampilkan di API harga per troy ounce
    const pricePerTroyOunce = await axios
      .get(url)
      .then((data) => {
        return data.data.result
      })
      .catch((err) => {
        logger.info('Error while run axios')
        logger.error(err)
      })
    // 1 troy ounce = 31,1 gram
    return pricePerTroyOunce / 31.1
  } catch (err) {
    logger.info('Error while run fetchGoldPriceFromAPI')
    logger.error(err)
  }
}
export const insertGoldPrice = async (date: Date, price: number): Promise<any> => {
  const goldPrice = await goldPriceModel
    .create({ date, price })
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('Cannot retrieve data')
      logger.error(err)
    })
  return goldPrice
}
export const deletePriceAfterAWeek = async (): Promise<any> => {
  const now = new Date()
  const aWeekAgo = new Date(new Date(now)).setDate(now.getDate() - 7)
  await goldPriceModel.deleteMany({ date: { $lte: aWeekAgo } })
}
