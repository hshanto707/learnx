import { UserServices } from './user.service'
import { catchAsync } from '../../utils/catchAsync'
import { ResponseComposer } from '../../utils/ResponseComposer'
import httpStatus from 'http-status'

const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getUsers()

  ResponseComposer(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: result.data,
  })
})

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params

  const result = await UserServices.getUserById(userId)

  ResponseComposer(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result.data,
  })
})

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body)

  ResponseComposer(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result.data,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await UserServices.updateUser(userId, req.body)

  ResponseComposer(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
  data: result
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params

  const result = await UserServices.deleteUser(userId)

  ResponseComposer(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  })
})

export const UserControllers = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
