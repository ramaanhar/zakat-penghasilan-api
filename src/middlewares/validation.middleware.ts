import { type Request, type Response, type NextFunction } from 'express'
import { type Schema } from 'joi'
import { failedResponse } from '../utils/responses'

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error == null) next()
    else {
      const { details } = error
      failedResponse(res, details[0].message)
    }
  }
}

export default validate
