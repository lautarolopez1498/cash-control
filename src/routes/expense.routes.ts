import express from 'express';
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from '../controllers/expense.controller';

const router = express.Router();

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);
router.patch('/:id', updateExpense);

export default router;
