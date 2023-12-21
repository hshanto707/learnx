import { Request, Response } from 'express';
import { UserServices } from './user.service';
import bcrypt from 'bcrypt';

const getUsers = async (req: Request, res: Response) => {};

const getUserById = async (req: Request, res: Response) => {};

const createUser = async (req: Request, res: Response) => {};

const updateUser = async (req: Request, res: Response) => {};

const deleteUser = async (req: Request, res: Response) => {};

export const UserControllers = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
