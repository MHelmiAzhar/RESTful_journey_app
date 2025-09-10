import Journey from '../../models/Journey'

export async function checkJourneyExist(journey_id: number) {
  const journey = await Journey.findOne({ where: { id: journey_id } })
  return journey
}
