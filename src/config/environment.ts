import 'dotenv/config'

const CONFIG = {
  db: process.env.DB ?? '',
  goldPriceAPIKey: process.env.GOLD_PRICE_API_KEY ?? ''
}

export default CONFIG
