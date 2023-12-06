import mongoose, { Schema } from 'mongoose'
import { Address, FullName, Order, User } from './user.interface'

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
  },
})

const addressSchema = new Schema<Address>({
  street: {
    type: String,
    required: [true, 'Street is required!'],
  },
  city: {
    type: String,
    required: [true, 'City is required!'],
  },
  country: {
    type: String,
    required: [true, 'Country is required!'],
  },
})

const orderSchema = new Schema<Order>({
  productName: {
    type: String,
    required: [true, 'Product name is required!'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required!'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required!'],
  },
})

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'UserId is required!'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full name is required!'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required!'],
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
})

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
