import express from 'express';
import {
  addExpense,
  deleteAllExpenses,
  deleteExpenseById,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from '../controllers/expense.controller';

const router = express.Router();

// Expenses routes
router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/', addExpense);
router.patch('/:id', updateExpense);
router.delete('/:id', deleteExpenseById);
router.delete('/', deleteAllExpenses);

// Category routes
// router.get('/', getAllCategories)

export default router;
