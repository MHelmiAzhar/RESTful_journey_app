import User from '../../models/User'

export async function getAllUsers(params: {
  where: { [key: string]: any }
  limit: number
  offset: number
}) {
  const { where, limit, offset } = params
  const result = await User.findAndCountAll({
    where,
    limit,
    offset
  })
  return result
}
