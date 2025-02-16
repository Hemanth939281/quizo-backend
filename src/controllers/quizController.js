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
exports.deleteQuiz = exports.updateQuiz = exports.getQuizById = exports.createQuiz = exports.getQuizzes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield prisma.quiz.findMany();
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
});
exports.getQuizzes = getQuizzes;
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, teacherId } = req.body;
    if (!title || !description || !teacherId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const newQuiz = yield prisma.quiz.create({
            data: { title, description, teacherId }
        });
        res.status(201).json(newQuiz);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating quiz', error });
    }
});
exports.createQuiz = createQuiz;
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const quiz = yield prisma.quiz.findUnique({ where: { id } });
        if (!quiz)
            return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching quiz', error });
    }
});
exports.getQuizById = getQuizById;
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title && !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const updatedQuiz = yield prisma.quiz.update({
            where: { id },
            data: { title, description }
        });
        res.json(updatedQuiz);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating quiz', error });
    }
});
exports.updateQuiz = updateQuiz;
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.quiz.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting quiz', error });
    }
});
exports.deleteQuiz = deleteQuiz;
