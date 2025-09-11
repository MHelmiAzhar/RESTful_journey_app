import AuthorizationError from '../common/exception/authorizationError'
import ClientError from '../common/exception/clientError'
import NotFoundError from '../common/exception/notFoundErrors'
import Journey from '../models/Journey'
import { checkJourneyExist } from '../repository/journey/checkJourneyExistRepository'
import { getAllJourneyRepository } from '../repository/journey/getAllJourneyRepository'
import { checkUserExist } from '../repository/user/checkUserExistRepository'

export async function createJourneyService(params: {
  user_id: number
  start_date: Date
  end_date: Date
  destination: string
}) {
  const { user_id, start_date, end_date, destination } = params

  //Check if user exists
  const user = await checkUserExist(user_id)
  if (!user) {
    throw new NotFoundError('User not found')
  }
  if (user.role !== 'tourist') {
    throw new ClientError('Target must be tourist')
  }

  const journey = await Journey.create({
    user_id: user.id,
    start_date: new Date(start_date),
    end_date: new Date(end_date),
    destination
  })
  return journey
}

export async function updateJourneyService(params: {
  journey_id: number
  start_date?: Date
  end_date?: Date
  destination?: string
  loggedInUser: { id: number; role: string }
}) {
  const { journey_id, start_date, end_date, destination, loggedInUser } = params

  //Check if journey exists
  const journey = await checkJourneyExist(journey_id)
  if (!journey) {
    throw new NotFoundError('Journey not found')
  }

  //Verify authorization
  if (loggedInUser.role === 'tourist' && loggedInUser.id !== journey.user_id) {
    throw new AuthorizationError(
      'You are not authorized to update this journey'
    )
  }

  await Journey.update(
    {
      start_date: start_date ? new Date(start_date) : undefined,
      end_date: end_date ? new Date(end_date) : undefined,
      destination: destination || undefined
    },
    {
      where: { id: journey_id }
    }
  )
  return
}

export async function deleteJourneyService(params: {
  journey_id: number
  loggedInUser: { id: number; role: string }
}) {
  const { journey_id, loggedInUser } = params

  //Check if journey exists
  const journey = await checkJourneyExist(journey_id)
  if (!journey) {
    throw new NotFoundError('Journey not found')
  }

  //Verify authorization
  if (loggedInUser.role === 'tourist' && loggedInUser.id !== journey.user_id) {
    throw new AuthorizationError(
      'You are not authorized to delete this journey'
    )
  }

  await Journey.destroy({
    where: { id: journey_id }
  })
  return
}

type JourneyWithUserName = {
  user_name: string
  [key: string]: any
}

export async function getAllJourneyService(params: {
  page: number
  size: number
  search: string
}) {
  const { page, size, search } = params

  const journeysResult = await getAllJourneyRepository({ page, size, search })
  const { journeys, pagination } = journeysResult

  // Grouping by name
  const grouped: Record<string, JourneyWithUserName[]> = {}
  for (const journey of journeys as JourneyWithUserName[]) {
    const name = journey.user_name
    if (!grouped[name]) grouped[name] = []
    grouped[name].push(journey)
  }

  // Remove user_name from each journey object
  const result = Object.entries(grouped).map(([nama_user, data_jurney]) => ({
    [nama_user]: data_jurney.map(({ user_name, ...rest }) => rest)
  }))

  return {
    data: result,
    pagination
  }
}

export async function getUserJourneyHistoryService(params: {
  user_id: number
  page: number
  size: number
  search: string
}) {
  const { user_id, page, size, search } = params
  //Check if user exists
  const user = await checkUserExist(user_id)
  if (!user) {
    throw new NotFoundError('User not found')
  }

  const journeys = await getAllJourneyRepository({
    page,
    size,
    search,
    user_id
  })
  return journeys
}
