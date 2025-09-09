import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import ClientError from '../common/exception/clientError'
import Tourist from '../models/Tourist'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

export async function registerEmployeeService({
  name,
  email,
  password
}: {
  name: string
  email: string
  password: string
}) {
  const exists = await User.findOne({ where: { email } })
  if (exists) {
    throw new ClientError('Email already used')
  }
  const hash = await bcrypt.hash(password, 10)
  const employee = await User.create({
    name,
    email,
    password: hash,
    role: 'employee'
  })
  return employee
}

export async function loginService({
  email,
  password
}: {
  email: string
  password: string
}) {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new Error('Invalid credentials')
  }
  const matched = await bcrypt.compare(password, user.password)
  if (!matched) {
    throw new Error('Invalid credentials')
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '6h' }
  )
  return { token, role: user.role }
}
