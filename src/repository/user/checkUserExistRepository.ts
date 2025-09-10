import User from '../../models/User'

export async function checkUserExist(id: number) {
  const user = await User.findOne({ where: { id } })
  return user
}
