import { Request, Response } from 'express'
import User from '../models/User'
import { dtoValidation } from '../common/helper/dtoValidation'
import Joi from 'joi'
import {
  resErrorHandler,
  resSuccessHandler
} from '../common/exception/resHandler'
import {
  createTouristService,
  deleteTouristService,
  listEmployeesService,
  listTouristsService,
  updateTouristService
} from '../service/userService'
import { getLoggedInUser } from '../common/helper/getLoggedInUser'
import AuthorizationError from '../common/exception/authorizationError'

export const createTourist = async (req: Request, res: Response) => {
  try {
    //Validate request body
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
    const result = await createTouristService({
      name,
      email,
      password,
      address,
      phone_number
    })
    return resSuccessHandler(res, result, 'Tourist created successfully', 201)
  } catch (err) {
    console.error(err)
    return resErrorHandler(res, err)
  }
}

export const updateTourist = async (req: Request, res: Response) => {
  try {
    //Validate param & body
    const { id } = await dtoValidation<{
      id: number
    }>(
      req.params,
      Joi.object({
        id: Joi.number().required()
      })
    )
    const { name, email, address, phone_number } = await dtoValidation<{
      name: string
      email: string
      address: string
      phone_number: string
    }>(
      req.body,
      Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        address: Joi.string().optional(),
        phone_number: Joi.string().optional()
      })
    )

    const user = getLoggedInUser(req)
    if (user.role === 'tourist' && user.id !== Number(id)) {
      throw new AuthorizationError(
        'Forbidden: You can only edit your own data.'
      )
    }
    await updateTouristService({
      id,
      name,
      email,
      address,
      phone_number
    })
    return resSuccessHandler(res, null, 'Tourist updated successfully')
  } catch (err) {
    return resErrorHandler(res, err)
  }
}

export const deleteTourist = async (req: Request, res: Response) => {
  try {
    //Validate param & body
    const { id } = await dtoValidation<{
      id: number
    }>(
      req.params,
      Joi.object({
        id: Joi.number().required()
      })
    )
    const user = getLoggedInUser(req)
    if (user.role === 'tourist' && user.id !== Number(id)) {
      throw new AuthorizationError(
        'Forbidden: You can only delete your own data.'
      )
    }
    await deleteTouristService(id)
    return resSuccessHandler(res, null, 'Tourist deleted successfully', 200)
  } catch (err) {
    console.error(err)
    return resErrorHandler(res, err)
  }
}

export const listTourists = async (req: Request, res: Response) => {
  try {
    //Validate query params
    const { page, size, search } = await dtoValidation<{
      page: number
      size: number
      search: string
    }>(
      req.query,
      Joi.object({
        page: Joi.number().min(1).default(1),
        size: Joi.number().min(1).default(10),
        search: Joi.string().allow('')
      })
    )
    const result = await listTouristsService({ page, size, search })
    return resSuccessHandler(res, result, 'Tourist list fetched successfully')
  } catch (error) {
    return resErrorHandler(res, error)
  }
}

export const listEmployees = async (req: Request, res: Response) => {
  try {
    const { page, size, search } = await dtoValidation<{
      page: number
      size: number
      search: string
    }>(
      req.query,
      Joi.object({
        page: Joi.number().min(1).default(1),
        size: Joi.number().min(1).default(10),
        search: Joi.string().allow('')
      })
    )
    const result = await listEmployeesService({ page, size, search })
    return resSuccessHandler(res, result, 'Employee list fetched successfully')
  } catch (error) {
    return resErrorHandler(res, error)
  }
}
