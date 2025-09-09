import { Response } from 'express'
import ClientError from './clientError'

export function resErrorHandler(res: Response, error: any): Response {
  if (error?.code === 'ECONNREFUSED') {
    console.log(error)
    return res
      .status(500)
      .json({ status: false, message: 'service unavailable' })
  }

  if (error instanceof ClientError) {
    const response = {
      status: false,
      message: error.message,
      error: error.errors
    }
    return res.status(error.statusCode).json(response)
  }

  if (error?.response) {
    return res.status(error.response.status).json(error.response.data)
  }

  // Server ERROR!
  console.log(error)
  console.log(error?.message)
  const response = {
    status: false,
    message: 'Maaf, terjadi kegagalan pada server kami.',
    dev: error
  }
  return res.status(500).json(response)
}

export function resSuccessHandler<T>(
  res: Response,
  data: T,
  message: string,
  code = 200
): Response {
  const response = {
    status: true,
    data,
    message,
    code
  }
  return res.status(code).send(response)
}
