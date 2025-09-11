import {
  createTouristService,
  updateTouristService,
  deleteTouristService,
  listTouristsService,
  listEmployeesService
} from '../../src/service/userService'
import ClientError from '../../src/common/exception/clientError'
import User from '../../src/models/User'
import { checkEmailExist } from '../../src/repository/user/checkEmailExistRepository'
import { checkUserExist } from '../../src/repository/user/checkUserExistRepository'
import { getAllUsersRepository } from '../../src/repository/user/getAllUserRepository'
import bcrypt from 'bcrypt'

// Mock all external dependencies
jest.mock('../../src/models/User')
jest.mock('../../src/repository/user/checkEmailExistRepository')
jest.mock('../../src/repository/user/checkUserExistRepository')
jest.mock('../../src/repository/user/getAllUserRepository')
jest.mock('bcrypt')

const mockUser = User as jest.Mocked<typeof User>
const mockCheckEmailExist = checkEmailExist as jest.MockedFunction<
  typeof checkEmailExist
>
const mockCheckUserExist = checkUserExist as jest.MockedFunction<
  typeof checkUserExist
>
const mockGetAllUsersRepository = getAllUsersRepository as jest.MockedFunction<
  typeof getAllUsersRepository
>
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createTouristService', () => {
    const validParams = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      address: 'Jalan Merdeka No.1',
      phone_number: '081234567890'
    }

    it('should create a tourist successfully when email does not exist', async () => {
      // Arrange
      const hashedPassword = 'hashedPassword123'
      const createdUser = {
        id: 1,
        ...validParams,
        password: hashedPassword,
        role: 'tourist'
      }

      mockCheckEmailExist.mockResolvedValue(null)
      ;(mockBcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword)
      mockUser.create.mockResolvedValue(createdUser as any)

      // Act
      const result = await createTouristService(validParams)

      // Assert
      expect(mockCheckEmailExist).toHaveBeenCalledWith(validParams.email)
      expect(mockBcrypt.hash).toHaveBeenCalledWith(validParams.password, 10)
      expect(mockUser.create).toHaveBeenCalledWith({
        name: validParams.name,
        email: validParams.email,
        password: hashedPassword,
        address: validParams.address,
        phone_number: validParams.phone_number,
        role: 'tourist'
      })
      expect(result).toEqual({ user: createdUser })
    })

    it('should throw ClientError when email already exists', async () => {
      // Arrange
      const existingUser = { id: 1, email: validParams.email }
      mockCheckEmailExist.mockResolvedValue(existingUser as any)

      // Act & Assert
      await expect(createTouristService(validParams)).rejects.toThrow(
        new ClientError('Email already used')
      )
      expect(mockCheckEmailExist).toHaveBeenCalledWith(validParams.email)
      expect(mockBcrypt.hash).not.toHaveBeenCalled()
      expect(mockUser.create).not.toHaveBeenCalled()
    })

    it('should handle bcrypt hashing errors', async () => {
      // Arrange
      mockCheckEmailExist.mockResolvedValue(null)
      ;(mockBcrypt.hash as jest.Mock).mockRejectedValue(
        new Error('Hashing failed')
      )

      // Act & Assert
      await expect(createTouristService(validParams)).rejects.toThrow(
        'Hashing failed'
      )
      expect(mockUser.create).not.toHaveBeenCalled()
    })
  })

  describe('updateTouristService', () => {
    const userId = 1
    const existingUser = {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone_number: '+1234567890',
      role: 'tourist'
    }

    it('should update tourist successfully without email change', async () => {
      // Arrange
      const updateParams = {
        id: userId,
        name: 'John Updated',
        address: '456 New St'
      }

      mockCheckUserExist.mockResolvedValue(existingUser as any)
      mockUser.update.mockResolvedValue([1] as any)

      // Act
      const result = await updateTouristService(updateParams)

      // Assert
      expect(mockCheckUserExist).toHaveBeenCalledWith(userId)
      expect(mockCheckEmailExist).not.toHaveBeenCalled()
      expect(mockUser.update).toHaveBeenCalledWith(
        {
          name: updateParams.name,
          email: undefined,
          address: updateParams.address,
          phone_number: undefined
        },
        { where: { id: userId } }
      )
      expect(result).toBeUndefined()
    })

    it('should update tourist with new email when email is available', async () => {
      // Arrange
      const updateParams = {
        id: userId,
        email: 'newemail@example.com'
      }

      mockCheckUserExist.mockResolvedValue(existingUser as any)
      mockCheckEmailExist.mockResolvedValue(null)
      mockUser.update.mockResolvedValue([1] as any)

      // Act
      await updateTouristService(updateParams)

      // Assert
      expect(mockCheckUserExist).toHaveBeenCalledWith(userId)
      expect(mockCheckEmailExist).toHaveBeenCalledWith(updateParams.email)
      expect(mockUser.update).toHaveBeenCalledWith(
        {
          name: undefined,
          email: updateParams.email,
          address: undefined,
          phone_number: undefined
        },
        { where: { id: userId } }
      )
    })

    it('should not check email when email is same as current', async () => {
      // Arrange
      const updateParams = {
        id: userId,
        email: existingUser.email, // Same email
        name: 'Updated Name'
      }

      mockCheckUserExist.mockResolvedValue(existingUser as any)
      mockUser.update.mockResolvedValue([1] as any)

      // Act
      await updateTouristService(updateParams)

      // Assert
      expect(mockCheckUserExist).toHaveBeenCalledWith(userId)
      expect(mockCheckEmailExist).not.toHaveBeenCalled()
      expect(mockUser.update).toHaveBeenCalled()
    })

    it('should throw ClientError when user not found', async () => {
      // Arrange
      mockCheckUserExist.mockResolvedValue(null)

      // Act & Assert
      await expect(updateTouristService({ id: 999 })).rejects.toThrow(
        new ClientError('Tourist not found', 404)
      )
      expect(mockCheckEmailExist).not.toHaveBeenCalled()
      expect(mockUser.update).not.toHaveBeenCalled()
    })

    it('should throw ClientError when new email already exists', async () => {
      // Arrange
      const updateParams = {
        id: userId,
        email: 'existing@example.com'
      }

      mockCheckUserExist.mockResolvedValue(existingUser as any)
      mockCheckEmailExist.mockResolvedValue({
        id: 2,
        email: 'existing@example.com'
      } as any)

      // Act & Assert
      await expect(updateTouristService(updateParams)).rejects.toThrow(
        new ClientError('Email already used')
      )
      expect(mockUser.update).not.toHaveBeenCalled()
    })
  })

  describe('deleteTouristService', () => {
    it('should delete tourist successfully when user exists', async () => {
      // Arrange
      const userId = 1
      const existingUser = { id: userId, role: 'tourist' }

      mockCheckUserExist.mockResolvedValue(existingUser as any)
      mockUser.destroy.mockResolvedValue(1 as any)

      // Act
      const result = await deleteTouristService(userId)

      // Assert
      expect(mockCheckUserExist).toHaveBeenCalledWith(userId)
      expect(mockUser.destroy).toHaveBeenCalledWith({ where: { id: userId } })
      expect(result).toBeUndefined()
    })

    it('should throw ClientError when user not found', async () => {
      // Arrange
      const userId = 999
      mockCheckUserExist.mockResolvedValue(null)

      // Act & Assert
      await expect(deleteTouristService(userId)).rejects.toThrow(
        new ClientError('Tourist not found', 404)
      )
      expect(mockUser.destroy).not.toHaveBeenCalled()
    })
  })

  describe('listTouristsService', () => {
    const mockTourists = [
      { id: 1, name: 'Tourist 1', role: 'tourist' },
      { id: 2, name: 'Tourist 2', role: 'tourist' }
    ]

    it('should list tourists without search filter', async () => {
      // Arrange
      const params = { page: 1, size: 10 }
      const mockResult = { count: 2, rows: mockTourists }

      mockGetAllUsersRepository.mockResolvedValue(mockResult as any)

      // Act
      const result = await listTouristsService(params)

      // Assert
      expect(mockGetAllUsersRepository).toHaveBeenCalledWith({
        where: { role: 'tourist' },
        limit: 10,
        offset: 0
      })
      expect(result).toEqual({
        users: mockTourists,
        pagination: {
          totalData: 2,
          totalPage: 1,
          currentPage: 1,
          perPage: 10
        }
      })
    })

    it('should list tourists with search filter', async () => {
      // Arrange
      const params = { page: 1, size: 5, search: 'John' }
      const mockResult = { count: 1, rows: [mockTourists[0]] }

      mockGetAllUsersRepository.mockResolvedValue(mockResult as any)

      // Act
      const result = await listTouristsService(params)

      // Assert
      expect(mockGetAllUsersRepository).toHaveBeenCalledWith({
        where: {
          role: 'tourist',
          name: { [Symbol.for('like')]: '%John%' }
        },
        limit: 5,
        offset: 0
      })
      expect(result.users).toEqual([mockTourists[0]])
      expect(result.pagination.totalData).toBe(1)
    })

    it('should handle pagination correctly', async () => {
      // Arrange
      const params = { page: 2, size: 1 }
      const mockResult = { count: 3, rows: [mockTourists[1]] }

      mockGetAllUsersRepository.mockResolvedValue(mockResult as any)

      // Act
      const result = await listTouristsService(params)

      // Assert
      expect(mockGetAllUsersRepository).toHaveBeenCalledWith({
        where: { role: 'tourist' },
        limit: 1,
        offset: 1
      })
      expect(result.pagination).toEqual({
        totalData: 3,
        totalPage: 3,
        currentPage: 2,
        perPage: 1
      })
    })
  })

  describe('listEmployeesService', () => {
    const mockEmployees = [
      { id: 1, name: 'Employee 1', role: 'employee' },
      { id: 2, name: 'Employee 2', role: 'employee' }
    ]

    it('should list employees without search filter', async () => {
      // Arrange
      const params = { page: 1, size: 10 }
      const mockResult = { count: 2, rows: mockEmployees }

      mockGetAllUsersRepository.mockResolvedValue(mockResult as any)

      // Act
      const result = await listEmployeesService(params)

      // Assert
      expect(mockGetAllUsersRepository).toHaveBeenCalledWith({
        where: { role: 'employee' },
        limit: 10,
        offset: 0
      })
      expect(result).toEqual({
        users: mockEmployees,
        pagination: {
          totalData: 2,
          totalPage: 1,
          currentPage: 1,
          perPage: 10
        }
      })
    })

    it('should list employees with search filter', async () => {
      // Arrange
      const params = { page: 1, size: 5, search: 'Admin' }
      const mockResult = { count: 1, rows: [mockEmployees[0]] }

      mockGetAllUsersRepository.mockResolvedValue(mockResult as any)

      // Act
      const result = await listEmployeesService(params)

      // Assert
      expect(mockGetAllUsersRepository).toHaveBeenCalledWith({
        where: {
          role: 'employee',
          name: { [Symbol.for('like')]: '%Admin%' }
        },
        limit: 5,
        offset: 0
      })
      expect(result.users).toEqual([mockEmployees[0]])
    })

    it('should calculate total pages correctly with fractional results', async () => {
      // Arrange
      const params = { page: 1, size: 3 }
      const mockResult = { count: 10, rows: mockEmployees }

      mockGetAllUsersRepository.mockResolvedValue(mockResult as any)

      // Act
      const result = await listEmployeesService(params)

      // Assert
      expect(result.pagination.totalPage).toBe(4) // Math.ceil(10/3) = 4
      expect(result.pagination.totalData).toBe(10)
    })
  })

  describe('Error handling', () => {
    it('should handle database errors in createTouristService', async () => {
      // Arrange
      const validParams = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        address: '123 Main St',
        phone_number: '+1234567890'
      }

      mockCheckEmailExist.mockResolvedValue(null)
      ;(mockBcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword')
      mockUser.create.mockRejectedValue(new Error('Database error'))

      // Act & Assert
      await expect(createTouristService(validParams)).rejects.toThrow(
        'Database error'
      )
    })

    it('should handle database errors in updateTouristService', async () => {
      // Arrange
      const existingUser = { id: 1, email: 'old@example.com' }
      mockCheckUserExist.mockResolvedValue(existingUser as any)
      mockUser.update.mockRejectedValue(new Error('Update failed'))

      // Act & Assert
      await expect(
        updateTouristService({ id: 1, name: 'New Name' })
      ).rejects.toThrow('Update failed')
    })

    it('should handle database errors in deleteTouristService', async () => {
      // Arrange
      const existingUser = { id: 1 }
      mockCheckUserExist.mockResolvedValue(existingUser as any)
      mockUser.destroy.mockRejectedValue(new Error('Delete failed'))

      // Act & Assert
      await expect(deleteTouristService(1)).rejects.toThrow('Delete failed')
    })

    it('should handle database errors in listTouristsService', async () => {
      // Arrange
      mockGetAllUsersRepository.mockRejectedValue(new Error('Query failed'))

      // Act & Assert
      await expect(listTouristsService({ page: 1, size: 10 })).rejects.toThrow(
        'Query failed'
      )
    })
  })
})
