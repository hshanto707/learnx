import { Order, User } from "./user.interface";
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

const createUser = async (userData: User) => {
  return await UserModel.create(userData);
};

// UPDATE USER

const updateUser = async (userId: number, updatedData: User) => {
  return await UserModel.findOneAndUpdate({ userId }, updatedData, { new: true, runValidators: true });
};

// DELETE USER

const deleteUser = async (userId: string) => {
  return await UserModel.findOneAndDelete({ userId });
};

// ADD NEW ORDER

const addOrder = async (userId: number, orderData: Order) => {
  const user = await UserModel.findOne({ userId });

  if (!user) return null;

  if (!user.orders) user.orders = [];

  user.orders.push(orderData);
  return await user.save();
}

// GET ALL ORDERS OF A USER

const getOrdersByUser = async (userId: number) => {
  const user = await UserModel.findOne({ userId });

  if (!user) return null;

  return user.orders;
};

// GET THE TOTAL PRICE OF A USER'S ORDERS

const getTotalPrice = async (userId: number) => {
  const user = await UserModel.findOne({ userId });

  if (!user) return null;

  return user.orders.reduce((acc, order) => acc + order.price * order.quantity, 0); // Calculate the total cost of all orders by multiplying each order's price with its quantity and summing them up.
};

export const UserServices = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrdersByUser,
  getTotalPrice,
};
