import { Request, Response, NextFunction } from 'express'

export default function authenticateRole(
  requiredRoles: Array<'employee' | 'tourist' | 'admin'>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    if (!user) return res.status(401).json({ message: 'No user in request' })
    if (!requiredRoles.includes(user.role))
      return res.status(403).json({ message: 'Forbidden' })
    next()
  }
}
