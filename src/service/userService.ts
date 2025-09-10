import { where } from 'sequelize'
import ClientError from '../common/exception/clientError'
import User from '../models/User'
import { checkEmailExist } from '../repository/user/checkEmailExistRepository'
import { checkUserExist } from '../repository/user/checkUserExistRepository'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import { getAllUsersRepository } from '../repository/user/getAllUserRepository'

export async function createTouristService(params: {
  name: string
  email: string
  password: string
  address: string
  phone_number: string
}) {
  const { name, email, password, address, phone_number } = params
  //check if email exists
  const exists = await checkEmailExist(email)
  if (exists) {
    throw new ClientError('Email already used')
  }

  //create user & tourist
  const user = await User.create({
    name,
    email,
    password,
    address,
    phone_number,
    role: 'tourist'
  })
  return { user }
}

export async function updateTouristService(params: {
  id: number
  name?: string
  email?: string
  address?: string
  phone_number?: string
}) {
  const { id, name, email, address, phone_number } = params
  //find user
  const user = await checkUserExist(id)
  if (!user) {
    throw new ClientError('Tourist not found', 404)
  }

  //check if email exists
  if (email && email !== user.email) {
    const exists = await checkEmailExist(email)
    if (exists) {
      throw new ClientError('Email already used')
    }
  }

  //update user
  await User.update(
    {
      name,
      email,
      address,
      phone_number
    },
    { where: { id } }
  )
  return
}

export async function deleteTouristService(id: number) {
  //find user
  const user = await checkUserExist(id)
  if (!user) {
    throw new ClientError('Tourist not found', 404)
  }

  //delete user & tourist
  await User.destroy({ where: { id } })
  return
}

export async function listTouristsService(params: {
  page: number
  size: number
  search?: string
}) {
  const { page, size, search } = params
  const whereClause: { [key: string]: any } = {
    role: 'tourist'
  }
  if (search) {
    whereClause.name = {
      [Op.like]: `%${search}%`
    }
  }
  const parameters = {
    where: whereClause,
    limit: size,
    offset: (page - 1) * size
  }
  const result = await getAllUsersRepository(parameters)
  const totalData = result.count
  const totalPage = Math.ceil(totalData / size)

  return {
    users: result.rows,
    pagination: {
      totalData,
      totalPage,
      currentPage: page,
      perPage: size
    }
  }
}

export async function listEmployeesService(params: {
  page: number
  size: number
  search?: string
}) {
  const { page, size, search } = params
  const whereClause: { [key: string]: any } = {
    role: 'employee'
  }
  if (search) {
    whereClause.name = {
      [Op.like]: `%${search}%`
    }
  }
  const parameters = {
    where: whereClause,
    limit: size,
    offset: (page - 1) * size
  }
  const result = await getAllUsersRepository(parameters)
  const totalData = result.count
  const totalPage = Math.ceil(totalData / size)

  return {
    users: result.rows,
    pagination: {
      totalData,
      totalPage,
      currentPage: page,
      perPage: size
    }
  }
}
