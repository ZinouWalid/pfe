import { hash, compare, genSalt} from 'bcryptjs'


const salt = genSalt(10)
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 10)
  return hashedPassword
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword)
  return isValid
}
