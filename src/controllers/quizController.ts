import { Request, RequestHandler, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getQuizzes: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error });
  }
};

export const createQuiz: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { title, description, teacherId } = req.body;

  if (!title || !description || !teacherId) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  try {
    const newQuiz = await prisma.quiz.create({
      data: { title, description, teacherId }
    });
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error });
  }
};

export const getQuizById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const quiz = await prisma.quiz.findUnique({ where: { id } });
    if (!quiz) { res.status(404).json({ message: 'Quiz not found' }); return; }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error });
  }
};

export const updateQuiz: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title && !description) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  try {
    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: { title, description }
    });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quiz', error });
  }
};

export const deleteQuiz: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.quiz.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quiz', error });
  }
};
