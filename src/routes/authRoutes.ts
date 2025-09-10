import { Router } from 'express'
import {
  login,
  registerEmployee,
  registerTourist
} from '../controller/authController'
import auth from '../middlewares/auth'
import authenticateRole from '../middlewares/authenticationRole'

const router = Router()

router.post('/register-tourist', registerTourist)
router.post(
  '/register-employee',
  auth,
  authenticateRole(['admin']),
  registerEmployee
)
router.post('/login', login)

export default router
