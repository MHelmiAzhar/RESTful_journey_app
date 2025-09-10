import { Request } from 'express'

export function getLoggedInUser(req: Request) {
  return (req as any).user
}
