import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getQuizzes = async (req, res) => {
  const quizzes = await prisma.quiz.findMany();
  res.json(quizzes);
};

export const createQuiz = async (req, res) => {
  const { title, description, teacherId } = req.body;

  if (!title ||!description ||!teacherId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newQuiz = await prisma.quiz.create({
    data: { title, description, teacherId }
  });
  res.status(201).json(newQuiz);
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;
  const quiz = await prisma.quiz.findUnique({ where: { id: id } });
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  res.json(quiz);
};

export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title &&!description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const updatedQuiz = await prisma.quiz.update({
    where: { id: id },
    data: { title, description }
  });
  res.json(updatedQuiz);
};

export const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  await prisma.quiz.delete({ where: { id: id } });
  res.status(204).send();
};
