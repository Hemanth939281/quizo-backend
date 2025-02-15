import express from 'express';
import { getQuizzes, createQuiz, getQuizById, updateQuiz, deleteQuiz } from '../controllers/quizController.js';

const router = express.Router();

router.get('/', getQuizzes);
router.post('/', createQuiz);
router.get('/:id', getQuizById);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

export default router;
