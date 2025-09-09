import { Schema, ValidationError } from 'joi'
import ClientError from '../exception/clientError'

export async function dtoValidation<T>(
  reqBody: unknown,
  bodySchema: Schema
): Promise<T> {
  try {
    const result = await bodySchema.validateAsync(reqBody)
    return result as T
  } catch (err: any) {
    throw new ClientError(err.message)
  }
}
