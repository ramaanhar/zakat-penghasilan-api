import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { createServer } from '../utils/server'
import { deleteGoldPricesInADay, insertGoldPrice } from '../services/goldPrice.service'

const app = createServer()

const goldPriceTodayPayload = {
  date: new Date(),
  price: 1000000
}
const goldPriceOldPayload = {
  date: new Date('2023-01-01'),
  price: 999000
}
const countInputBelowNisabPayload = {
  salary: 1000000,
  anotherIncome: 1000000
}
const countInputAboveNisabPayload = {
  salary: 10000000,
  anotherIncome: 50000000
}

describe('api', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })
  describe('count zakat mal', () => {
    describe('gold price exist', () => {
      describe('wrong input', () => {
        it('should return 400, salary should not be empty', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          await supertest(app).post('/api/count').send({ anotherIncome: 1000000 }).expect(400)
          await deleteGoldPricesInADay(date)
        })
        it('should return 400, salary should not be pure string', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          await supertest(app).post('/api/count').send({ salary: 'qwertyuiop', anotherIncome: 1000000 }).expect(400)
          await deleteGoldPricesInADay(date)
        })
        it('should return 200, salary could be integer string', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          await supertest(app).post('/api/count').send({ salary: '1000000', anotherIncome: 1000000 }).expect(200)
          await deleteGoldPricesInADay(date)
        })
        it('should return 400, salary should not be negative number', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          await supertest(app).post('/api/count').send({ salary: -1000000, anotherIncome: 1000000 }).expect(400)
          await deleteGoldPricesInADay(date)
        })
        it('should return 200, another income could be empty', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          await supertest(app).post('/api/count').send({ salary: '1000000' }).expect(200)
          await deleteGoldPricesInADay(date)
        })
        it('should return 400, salary should not be pure string', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          await supertest(app).post('/api/count').send({ salary: 1000000, anotherIncome: 'asdfghjkl' }).expect(400)
          await deleteGoldPricesInADay(date)
        })
        it('should return 200, salary could be integer string', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          await supertest(app).post('/api/count').send({ salary: 1000000, anotherIncome: '1000000' }).expect(200)
          await deleteGoldPricesInADay(date)
        })
        it('should return 400, salary should not be negative number', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          await supertest(app).post('/api/count').send({ salary: 1000000, anotherIncome: -1000000 }).expect(400)
          await deleteGoldPricesInADay(date)
        })
        it('should return 200, user should not pay the zakat if his total annual income is less than the nisab', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          const { body, statusCode } = await supertest(app).post('/api/count').send(countInputBelowNisabPayload)
          const { wajibZakat, perYear, perMonth } = body.data
          expect(statusCode).toBe(200)
          expect(wajibZakat).toBe(false)
          expect(perYear).toBe(0)
          expect(perMonth).toBe(0)
          await deleteGoldPricesInADay(date)
        })
        it('should return 200, user should pay the zakat if his total annual income is more than the nisab', async () => {
          const { date, price } = goldPriceTodayPayload
          await insertGoldPrice(date, price)
          const { body, statusCode } = await supertest(app).post('/api/count').send(countInputAboveNisabPayload)
          const { wajibZakat, perYear, perMonth } = body.data
          expect(statusCode).toBe(200)
          expect(wajibZakat).toBe(true)
          expect(perYear).toBeGreaterThan(0)
          expect(perMonth).toBeGreaterThan(0)
          await deleteGoldPricesInADay(date)
        })
      })
    })
    describe('gold price does not exist', () => {
      it('should return 404', async () => {
        const { date, price } = goldPriceOldPayload
        await insertGoldPrice(date, price)
        const { body, statusCode } = await supertest(app).post('/api/count').send(countInputBelowNisabPayload)
        expect(statusCode).toBe(404)
        expect(body.message).toBe('Gold price not found')
        await deleteGoldPricesInADay(date)
      })
    })
  })
})
