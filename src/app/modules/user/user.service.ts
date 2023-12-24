/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status'
import ErrorComposer from '../../utils/errorComposer'
import { TUser } from './user.interface'
import UserModel from './user.model'
import mongoose from 'mongoose'

const getUsers = async () => {
  const users = await UserModel.find().select('-__v')
  if (!users)
    throw new ErrorComposer(httpStatus.BAD_REQUEST, 'Something went wrong!')

  return {
    data: users,
  }
}

const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId).select('-__v')

  if (!user) throw new ErrorComposer(httpStatus.NOT_FOUND, 'User not found!')

  return {
    data: user,
  }
}

const createUser = async (payload: TUser) => {
  payload.createdAt = new Date()
  payload.updatedAt = new Date()

  const newUser = await UserModel.create(payload)

  delete newUser.__v

  if (!newUser)
    throw new ErrorComposer(httpStatus.BAD_REQUEST, 'Failed to create user!')

  return {
    data: newUser,
  }
}

const updateUser = async (userId: string, payload: Partial<TUser>) => {
  const { username, email, fullName, address, ...remainingUserData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  }

  if (fullName && Object.keys(fullName).length)
    for (const [key, value] of Object.entries(fullName))
      modifiedUpdatedData[`fullName.${key}`] = value

  if (address && Object.keys(address).length)
    for (const [key, value] of Object.entries(address))
      modifiedUpdatedData[`address.${key}`] = value

  const result = await UserModel.findByIdAndUpdate(
    userId,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )

  return result
}

const deleteUser = async (userId: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedStudent = await UserModel.findByIdAndUpdate(userId, {
      new: true,
      session,
    })

    if (!deletedStudent)
      throw new ErrorComposer(httpStatus.BAD_REQUEST, 'Failed to delete user')

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete user')
  }
}

export const UserServices = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
