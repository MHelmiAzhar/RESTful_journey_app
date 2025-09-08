import { Router } from 'express'
import { login, registerUser } from '../controller/authController'

const router = Router()

router.post('/register', registerUser) // tourist self-register (opsional)
router.post('/login', login)

export default router
