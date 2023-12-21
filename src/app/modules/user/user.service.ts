import { Order, TUser } from "./user.interface";
import UserModel from "./user.model";

// GET ALL USERS

const getUsers = async () => {
  return await UserModel.find();
};

// GET SINGLE USER BY USER ID

const getUserById = async (userId: string) => {
  return await UserModel.findOne({ userId });
};

// CREATE USER

const createUser = async (userData: TUser) => {
  return await UserModel.create(userData);
};

// UPDATE USER

const updateUser = async (userId: number, updatedData: TUser) => {
  return await UserModel.findOneAndUpdate({ userId }, updatedData, { new: true, runValidators: true });
};

// DELETE USER

const deleteUser = async (userId: string) => {
  return await UserModel.findOneAndDelete({ userId });
};

export const UserServices = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
