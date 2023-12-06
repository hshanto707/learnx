"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', user_route_1.UserRoutes);
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Api worked successfully'
    });
});
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'API not found!',
    });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(404).json({
            success: false,
            message: 'Something went wrong!',
        });
    }
});
exports.default = app;
