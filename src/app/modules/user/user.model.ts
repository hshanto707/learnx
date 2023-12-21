import mongoose, { Schema } from 'mongoose'
import { TAddress, TFullName, TUser } from './user.interface'

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
  },
})

const addressSchema = new Schema<TAddress>({
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

const userSchema = new Schema<TUser>({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full name is required!'],
  },
  bio: {
    type: String,
    default: null,
  },
  dob: {
    type: String,
    required: [true, 'Date of birth is required!'],
  },
  profileImg: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
    },
    required: [true, 'Gender is required!'],
  },
  contactNo: {
    type: String,
    required: [true, 'Date of birth is required!'],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required!'],
  },
  isInstructor: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

const UserModel = mongoose.model<TUser>('User', userSchema)

export default UserModel
