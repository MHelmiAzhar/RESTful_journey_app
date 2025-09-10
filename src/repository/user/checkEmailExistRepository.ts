import User from '../../models/User'

export async function checkEmailExist(email: string) {
  const user = await User.findOne({ where: { email } })
  return user
}
