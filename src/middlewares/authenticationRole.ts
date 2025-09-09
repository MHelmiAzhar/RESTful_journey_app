import { Request, Response, NextFunction } from 'express'

export default function authenticateRole(
  requiredRole: 'employee' | 'tourist' | 'admin'
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    if (!user) return res.status(401).json({ message: 'No user in request' })
    if (user.role !== requiredRole)
      return res.status(403).json({ message: 'Forbidden' })
    next()
  }
}
