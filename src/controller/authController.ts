import { Request, Response } from 'express'
import {
  loginService,
  registerEmployeeService,
  registerTouristService
} from '../service/authService'
import Joi from 'joi'
import {
  resErrorHandler,
  resSuccessHandler
} from '../common/exception/resHandler'
import { dtoValidation } from '../common/helper/dtoValidation'

export const registerTourist = async (req: Request, res: Response) => {
  try {
    const { name, email, password, address, phone_number } =
      await dtoValidation<{
        name: string
        email: string
        password: string
        address: string
        phone_number: string
      }>(
        req.body,
        Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          address: Joi.string().required(),
          phone_number: Joi.string().required()
        })
      )
    const result = await registerTouristService({
      name,
      email,
      password,
      address,
      phone_number
    })
    return resSuccessHandler(
      res,
      result,
      'Tourist registered successfully',
      201
    )
  } catch (err: any) {
    return resErrorHandler(res, err)
  }
}

export const registerEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, password, address, phone_number } =
      await dtoValidation<{
        name: string
        email: string
        password: string
        address: string
        phone_number: string
      }>(
        req.body,
        Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          address: Joi.string().required(),
          phone_number: Joi.string().required()
        })
      )
    const result = await registerEmployeeService({
      name,
      email,
      password,
      address,
      phone_number
    })
    return resSuccessHandler(
      res,
      result,
      'Employee registered successfully',
      201
    )
  } catch (err: any) {
    return resErrorHandler(res, err)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = await dtoValidation<{
      email: string
      password: string
    }>(
      req.body,
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
    )
    const result = await loginService({ email, password })
    return resSuccessHandler(res, result, 'Login successful', 200)
  } catch (err: any) {
    return resErrorHandler(res, err)
  }
}
