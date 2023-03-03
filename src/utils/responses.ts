import { type Response } from 'express'

export const successResponse = (res: Response, data: any): Response => {
  return res.status(200).json({
    message: 'Success',
    data
  })
}

export const failedResponse = (res: Response, err: any): Response => {
  return res.status(400).json({
    message: 'Failed',
    error: err
  })
}

export const notFoundResponse = (res: Response, objectName: string): Response => {
  return res.status(404).json({
    message: `${objectName} not found`
  })
}
