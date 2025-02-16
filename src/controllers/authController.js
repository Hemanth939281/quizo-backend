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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const existingUser = yield prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = yield prisma.user.create({
            data: { username, password },
        });
        res.status(201).json({ message: "Signup successful", user });
    }
    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password" });
    }
    try {
        const user = yield prisma.user.findUnique({ where: { username } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.login = login;
