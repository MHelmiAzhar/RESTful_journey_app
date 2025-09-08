import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing fields' })

    const exists = await User.findOne({ where: { email } })
    if (exists) return res.status(409).json({ message: 'Email already used' })

    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hash,
      role: 'tourist'
    })
    return res
      .status(201)
      .json({ id: user.id, name: user.name, email: user.email })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Missing fields' })

    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const matched = await bcrypt.compare(password, user.password)
    if (!matched)
      return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '6h' }
    )
    return res.json({ token, role: user.role })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}
