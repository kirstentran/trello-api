/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required! (Kirstentran)',
      'string.empty': 'Title must not be empty! (Kirstentran)',
      'string.min': 'Title must have at least 3 characters! (Kirstentran)',
      'string.max': 'Title must have at most 50 characters! (Kirstentran)',
      'string.trim': 'Title must not have a leading space or a trailing whitespace! (Kirstentran)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log('REQ.Body:', req.body)
    //Set abortEarly: false để trả về tất cả các lỗi không chỉ lỗi đầu tiên
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    //next()
    res.status(StatusCodes.CREATED).json({ message: 'POST from validation: API create new board' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}