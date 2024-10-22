import express from 'express';
import {
  addExpense,
  deleteAllExpenses,
  deleteExpenseById,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  getExpensesByUser,
  getExpensesByCategory,
  getExpensesByDateRange,
} from '../controllers/expense.controller';

const router = express.Router();

// Rutas basicas CRUD
router.get('/', getAllExpenses);
router.get('/id/:id', getExpenseById);
router.post('/', addExpense);
router.patch('/:id', updateExpense);
router.delete('/:id', deleteExpenseById);
router.delete('/', deleteAllExpenses);

// Rutas adicionales
router.get('/user/:userId', getExpensesByUser);
router.get('/category/:category', getExpensesByCategory);
router.get('/date/by-date', getExpensesByDateRange);
// router.get('/by-month', getExpensesByDateRange);

// // Rutas para filtros avanzados
// router.get('/expenses/filter', filterExpenses);

// // Rutas para reportes
// router.get('/expenses/report/monthly', getMonthlyExpenseReport);
// router.get('/expenses/report/category', getCategoryExpenseReport);

export default router;
