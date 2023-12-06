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
exports.UserServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
// GET ALL USERS
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find();
});
// GET SINGLE USER BY USER ID
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ userId });
});
// CREATE USER
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create(userData);
});
// UPDATE USER
const updateUser = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOneAndUpdate({ userId }, updatedData, { new: true, runValidators: true });
});
// DELETE USER
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOneAndDelete({ userId });
});
// ADD NEW ORDER
const addOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ userId });
    if (!user)
        return null;
    if (!user.orders)
        user.orders = [];
    user.orders.push(orderData);
    return yield user.save();
});
// GET ALL ORDERS OF A USER
const getOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ userId });
    if (!user)
        return null;
    return user.orders;
});
// GET THE TOTAL PRICE OF A USER'S ORDERS
const getTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ userId });
    if (!user)
        return null;
    return user.orders.reduce((acc, order) => acc + order.price * order.quantity, 0); // Calculate the total cost of all orders by multiplying each order's price with its quantity and summing them up.
});
exports.UserServices = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addOrder,
    getOrdersByUser,
    getTotalPrice,
};
