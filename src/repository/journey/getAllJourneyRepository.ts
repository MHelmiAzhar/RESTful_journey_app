import { QueryTypes } from 'sequelize'
import sequelize from '../../config/database'

export async function getAllJourneyRepository({
  search = '',
  page = 1,
  size = 10,
  user_id
}: {
  search?: string
  page?: number
  size?: number
  user_id?: number
}) {
  const offset = (page - 1) * size

  // Query data
  const journeys = await sequelize.query(
    `
    SELECT j.*
    ${!user_id ? ', u.name as user_name' : ''}
    FROM journeys j
    JOIN users u ON j.user_id = u.id
    WHERE j.destination LIKE :search OR u.name LIKE :search
    ${user_id ? 'AND j.user_id = :user_id' : ''}
    ORDER BY j.createdAt DESC
    LIMIT :size OFFSET :offset
    `,
    {
      replacements: {
        search: `%${search}%`,
        size,
        offset,
        user_id
      },
      type: QueryTypes.SELECT
    }
  )

  // Query count
  const countResult = (await sequelize.query(
    `
    SELECT COUNT(*) as total
    FROM journeys j
    JOIN users u ON j.user_id = u.id
    WHERE j.destination LIKE :search OR u.name LIKE :search
    ${user_id ? 'AND j.user_id = :user_id' : ''}
    `,
    {
      replacements: { search: `%${search}%`, user_id },
      type: QueryTypes.SELECT
    }
  )) as { total: number }[]
  const total = countResult[0]?.total ?? 0

  const totalData = Number(countResult[0]?.total ?? 0)
  const totalPage = Math.ceil(totalData / size)

  return {
    journeys,
    pagination: {
      totalData,
      totalPage,
      currentPage: page,
      perPage: size
    }
  }
}
