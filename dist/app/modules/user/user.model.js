"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required!'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!'],
    },
});
const addressSchema = new mongoose_1.Schema({
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
});
const orderSchema = new mongoose_1.Schema({
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
});
const userSchema = new mongoose_1.Schema({
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
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
