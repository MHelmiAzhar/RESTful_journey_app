import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import ClientError from '../common/exception/clientError'
import { checkEmailExist } from '../repository/user/checkEmailExistRepository'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

export async function registerTouristService({
  name,
  email,
  password,
  address,
  phone_number
}: {
  name: string
  email: string
  password: string
  address: string
  phone_number: string
}) {
  const exists = await checkEmailExist(email)
  if (exists) {
    throw new ClientError('Email already used')
  }
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email,
    address,
    phone_number,
    password: hash,
    role: 'tourist'
  })

  return user
}

export async function registerEmployeeService({
  name,
  email,
  password,
  address,
  phone_number
}: {
  name: string
  email: string
  password: string
  address: string
  phone_number: string
}) {
  const exists = await checkEmailExist(email)
  if (exists) {
    throw new ClientError('Email already used')
  }
  const hash = await bcrypt.hash(password, 10)
  const employee = await User.create({
    name,
    email,
    password: hash,
    role: 'employee',
    address,
    phone_number
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
    throw new ClientError('Invalid credentials')
  }
  const matched = await bcrypt.compare(password, user.password)
  if (!matched) {
    throw new ClientError('Invalid credentials')
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '6h' }
  )
  return { token, role: user.role }
}
