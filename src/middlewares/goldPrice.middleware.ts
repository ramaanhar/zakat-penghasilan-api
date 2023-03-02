import { RecurrenceRule, scheduleJob } from 'node-schedule'
import { deletePriceAfterAWeek, fetchGoldPriceFromAPI, insertGoldPrice } from '../services/goldPrice.service'

export const refreshData = async (): Promise<void> => {
  const rule = new RecurrenceRule(undefined, undefined, undefined, undefined, 0, 0, 0)
  rule.tz = 'Jakarta/Asia'
  scheduleJob('refreshData', rule, async () => {
    const date = new Date()
    await deletePriceAfterAWeek()
    const price = await fetchGoldPriceFromAPI()
    await insertGoldPrice(date, price)
  })
}
