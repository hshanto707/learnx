"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
// GET ALL USERS
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getUsers();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
// GET SINGLE USER BY USER ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getUserById(userId);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
// CREATE USER
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = user_validation_1.UserValidationSchema.validate(req.body);
        value.password = yield bcrypt_1.default.hash(value.password, 10);
        if (error)
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details,
            });
        else {
            const result = yield user_service_1.UserServices.createUser(value);
            res.status(200).json({
                success: true,
                message: 'User created successfully!',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
// UPDATE USER
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const { error, value } = user_validation_1.UserValidationSchema.validate(req.body);
        value.password = yield bcrypt_1.default.hash(value.password, 10);
        if (error)
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details,
            });
        else {
            const updatedUser = yield user_service_1.UserServices.updateUser(userId, value);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
// DELETE USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.deleteUser(userId);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
// ADD NEW ORDER
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const { error, value } = user_validation_1.OrderValidationSchema.validate(req.body);
        if (error)
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details,
            });
        else {
            const order = yield user_service_1.UserServices.addOrder(userId, value);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
// GET ALL ORDERS OF A USER
const getOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const orders = yield user_service_1.UserServices.getOrdersByUser(userId);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
// GET THE TOTAL PRICE OF A USER'S ORDERS
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const totalPrice = yield user_service_1.UserServices.getTotalPrice(userId);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.UserControllers = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addOrder,
    getOrdersByUser,
    getTotalPrice,
};
