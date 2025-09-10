import { Router } from 'express'
import auth from '../middlewares/auth'
import authenticateRole from '../middlewares/authenticationRole'
import {
  createJourneyForUser,
  deleteJourney,
  getAllJourneys,
  getUserHistoryJourneys,
  updateJourney
} from '../controller/journeyController'

const router = Router()

router.post('/create', auth, createJourneyForUser)
router.post('/edit/:journey_id', auth, updateJourney)
router.post('/delete/:journey_id', auth, deleteJourney)

router.get(
  '/get-all-journeys',
  auth,
  authenticateRole(['employee', 'admin']),
  getAllJourneys
)
router.get('/get-user-history/:user_id', auth, getUserHistoryJourneys)

export default router
