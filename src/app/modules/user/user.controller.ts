import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { OrderValidationSchema, UserValidationSchema } from './user.validation';
import bcrypt from 'bcrypt';

// GET ALL USERS

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUsers();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// GET SINGLE USER BY USER ID

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getUserById(userId);

    if (result)
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    else
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// CREATE USER

const createUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = UserValidationSchema.validate(req.body);
    
    value.password = await bcrypt.hash(value.password, 10);
    
    if (error)
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    else {
      const result = await UserServices.createUser(value);

      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// UPDATE USER

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    
    const { error, value } = UserValidationSchema.validate(req.body);
    value.password = await bcrypt.hash(value.password, 10);

    if (error)
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    else {
      const updatedUser = await UserServices.updateUser(userId, value);

      if (updatedUser)
        res.json({
          success: true,
          message: 'User updated successfully!',
          data: updatedUser,
        });
      else
        res.status(404).json({
          success: false,
          message: 'User not found',
          data: null,
        });
    }

    
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// DELETE USER

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const result = await UserServices.deleteUser(userId);

    if (result)
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    else
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// ADD NEW ORDER

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    
    const { error, value } = OrderValidationSchema.validate(req.body);

    if (error)
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    else {
      const order = await UserServices.addOrder(userId, value);
  
      if (order)
        res.json({
          success: true,
          message: 'Order created successfully!',
          data: null,
        });
      else
        res.status(404).json({
          success: false,
          message: 'User not found!',
          data: null,
        });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
}

// GET ALL ORDERS OF A USER

const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const orders = await UserServices.getOrdersByUser(userId);

    if (orders)
      res.json({
        success: true,
        message: 'Orders fetched successfully!',
        data: {
          orders,
        },
      });
    else
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// GET THE TOTAL PRICE OF A USER'S ORDERS

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const totalPrice = await UserServices.getTotalPrice(userId);

    if (totalPrice != null)
      res.json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: totalPrice.toFixed(2),
        },
      });
    else
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrdersByUser,
  getTotalPrice,
};
