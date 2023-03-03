// import { scheduleJob, scheduledJobs } from 'node-schedule'
import { scheduleJob } from 'node-schedule'
import { deletePriceAfterAWeek, fetchGoldPriceFromAPI, insertGoldPrice } from '../services/goldPrice.service'

export const refreshData = async (): Promise<void> => {
  try {
    scheduleJob('refreshData', { hour: 0, minute: 0, second: 0, tz: 'Asia/Jakarta' }, async () => {
      console.log('scheduleJob is running')
      const date = new Date()
      await deletePriceAfterAWeek()
      const price = await fetchGoldPriceFromAPI()
      await insertGoldPrice(date, price)
    })
    // eslint-disable-next-line @typescript-eslint/dot-notation
    // console.log('refreshData will be running at', scheduledJobs['refreshData'].nextInvocation())
  } catch (err: any) {
    console.log('Error at:', err.message)
  }
}
