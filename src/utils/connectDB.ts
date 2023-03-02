import mongoose from 'mongoose'
import CONFIG from '../config/environment'
import logger from './logger'

mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    logger.info('Successfully connected to MongoDB')
  })
  .catch((err) => {
    logger.info('Connection to MongoDB failed')
    logger.error(err)
    process.exit(1)
  })
