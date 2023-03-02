import mongoose from 'mongoose'

const goldPriceSchema = new mongoose.Schema(
  {
    date: {
      type: Date
    },
    price: {
      type: Number
    }
  },
  { timestamps: true }
)

const goldPriceModel = mongoose.model('goldPrice', goldPriceSchema)
export default goldPriceModel
