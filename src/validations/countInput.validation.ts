import Joi from 'joi'

const countInputValidation = Joi.object({
  salary: Joi.number().required().greater(-1).messages({
    'number.base': 'Salary is invalid',
    'any.required': 'Salary should not empty',
    'number.greater': 'Salary should not negative'
  }),
  anotherIncome: Joi.number()
    .greater(-1)
    .messages({ 'number.base': 'Another Income is invalid', 'number.greater': 'Another Income should not negative' })
})

export default countInputValidation
