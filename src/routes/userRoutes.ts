import { Router } from 'express'
import auth from '../middlewares/auth'
import authenticateRole from '../middlewares/authenticationRole'
import {
  createTourist,
  deleteTourist,
  listEmployees,
  listTourists,
  updateTourist
} from '../controller/userController'

const router = Router()

router.post(
  '/create',
  auth,
  authenticateRole(['employee', 'admin']),
  createTourist
)
router.post('/edit/:id', auth, updateTourist)
router.post('/delete/:id', auth, deleteTourist)

router.get(
  '/get-tourists',
  auth,
  authenticateRole(['employee', 'admin']),
  listTourists
)
router.get('/get-employees', auth, authenticateRole(['admin']), listEmployees)

export default router
