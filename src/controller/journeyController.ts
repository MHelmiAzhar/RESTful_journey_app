import { Request, Response } from 'express'
import { dtoValidation } from '../common/helper/dtoValidation'
import Joi from 'joi'
import { get } from 'http'
import { getLoggedInUser } from '../common/helper/getLoggedInUser'
import {
  resErrorHandler,
  resSuccessHandler
} from '../common/exception/resHandler'
import {
  createJourneyService,
  deleteJourneyService,
  getAllJourneyService,
  getUserJourneyHistoryService,
  updateJourneyService
} from '../service/journeyService'
import AuthorizationError from '../common/exception/authorizationError'
import ClientError from '../common/exception/clientError'

export const createJourneyForUser = async (req: Request, res: Response) => {
  try {
    //Validate request body
    let { user_id, start_date, end_date, destination } = await dtoValidation<{
      user_id: number
      start_date: Date
      end_date: Date
      destination: string
    }>(
      req.body,
      Joi.object({
        user_id: Joi.number().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        destination: Joi.string().required()
      })
    )

    if (start_date >= end_date) {
      throw new ClientError('start_date must be less than end_date')
    }

    // If the logged-in user is a tourist, override the user_id to ensure they can only create journeys for themselves
    const loggedInUser = getLoggedInUser(req)
    if (loggedInUser.role == 'tourist' && loggedInUser.id !== Number(user_id)) {
      throw new AuthorizationError('You only can create journey for yourself')
    }

    //Create journey
    const journey = await createJourneyService({
      user_id,
      start_date,
      end_date,
      destination
    })

    return resSuccessHandler(res, journey, 'Journey created successfully', 201)
  } catch (err) {
    console.error(err)
    return resErrorHandler(res, err)
  }
}

export const updateJourney = async (req: Request, res: Response) => {
  try {
    //Validate param & body
    let { start_date, end_date, destination } = await dtoValidation<{
      start_date: Date
      end_date: Date
      destination: string
    }>(
      req.body,
      Joi.object({
        start_date: Joi.date().optional(),
        end_date: Joi.date().optional(),
        destination: Joi.string().optional()
      })
    )
    let { journey_id } = await dtoValidation<{
      journey_id: number
    }>(
      req.params,
      Joi.object({
        journey_id: Joi.number().required()
      })
    )

    if (start_date >= end_date) {
      throw new ClientError('start_date must be less than end_date')
    }
    // Get logged in user
    const loggedInUser = getLoggedInUser(req)

    //Update journey
    await updateJourneyService({
      journey_id,
      start_date,
      end_date,
      destination,
      loggedInUser
    })

    return resSuccessHandler(res, null, 'Journey updated successfully')
  } catch (err) {
    return resErrorHandler(res, err)
  }
}

export const deleteJourney = async (req: Request, res: Response) => {
  try {
    //Validate param
    let { journey_id } = await dtoValidation<{
      journey_id: number
    }>(
      req.params,
      Joi.object({
        journey_id: Joi.number().required()
      })
    )

    // Get logged in user
    const loggedInUser = getLoggedInUser(req)

    //Delete journey
    await deleteJourneyService({ journey_id, loggedInUser })

    return resSuccessHandler(res, null, 'Journey deleted successfully')
  } catch (err) {
    console.error(err)
    return resErrorHandler(res, err)
  }
}

export const getAllJourneys = async (req: Request, res: Response) => {
  try {
    //Validate query params
    const { search, page, size } = await dtoValidation<{
      search: string
      page: number
      size: number
    }>(
      req.query,
      Joi.object({
        search: Joi.string().allow('').optional(),
        page: Joi.number().min(1).optional(),
        size: Joi.number().min(1).max(100).optional()
      })
    )

    //Get Data Journey
    const journeys = await getAllJourneyService({
      search,
      page,
      size
    })

    return resSuccessHandler(
      res,
      journeys,
      'Journey list fetched successfully',
      200
    )
  } catch (err) {
    console.error(err)
    return resErrorHandler(res, err)
  }
}
export const getUserHistoryJourneys = async (req: Request, res: Response) => {
  try {
    //Validate query params
    const { search, page, size } = await dtoValidation<{
      search: string
      page: number
      size: number
    }>(
      req.query,
      Joi.object({
        search: Joi.string().allow('').optional(),
        page: Joi.number().min(1).optional(),
        size: Joi.number().min(1).max(100).optional()
      })
    )

    const { user_id } = await dtoValidation<{
      user_id: number
    }>(
      req.params,
      Joi.object({
        user_id: Joi.number().required()
      })
    )

    //Get logged in user
    const loggedInUser = getLoggedInUser(req)
    if (loggedInUser.role == 'tourist' && loggedInUser.id !== Number(user_id)) {
      throw new AuthorizationError('You only can view your own journey history')
    }

    //Get Data Journey
    const journeys = await getUserJourneyHistoryService({
      search,
      page,
      size,
      user_id
    })
    return resSuccessHandler(
      res,
      journeys,
      'Journey list fetched successfully',
      200
    )
  } catch (err) {
    console.error(err)
    return resErrorHandler(res, err)
  }
}
