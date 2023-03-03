import { scheduleJob, scheduledJobs } from 'node-schedule'
import { deletePriceAfterAWeek, fetchGoldPriceFromAPI, insertGoldPrice } from '../services/goldPrice.service'

export const refreshData = async (): Promise<void> => {
  try {
    // const rule = new RecurrenceRule()
    // rule.hour = 0
    // rule.minute = 0
    // rule.second = 0
    // rule.tz = 'Jakarta/Asia'
    // console.log(rule)
    scheduleJob('refreshData', '0 0 0 * * *', async () => {
      console.log('scheduleJob is running')
      const date = new Date()
      await deletePriceAfterAWeek()
      const price = await fetchGoldPriceFromAPI()
      await insertGoldPrice(date, price)
    })
    // eslint-disable-next-line @typescript-eslint/dot-notation
    console.log('refreshData will be running at', scheduledJobs['refreshData'].nextInvocation())
  } catch (err: any) {
    console.log('Error at:', err.message)
  }
}
