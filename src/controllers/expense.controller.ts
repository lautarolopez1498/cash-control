import { Request, Response } from 'express';
import * as expenseServices from '../services/expense.service';
import {
  expenseSchemaOutId,
  objectIdSchema,
  partialExpenseSchema,
  userIdParamSchema,
} from '../schemas/expense.schemas';
import { ZodError } from 'zod';

// Rutas CRUD
export const getAllExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseServices.getExpenses();

    return res
      .status(200)
      .json({ message: 'Gastos encontrados', payload: expenses });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const id = objectIdSchema.parse(req.params.id);

    const expense = await expenseServices.getExpenseById(id);

    if (!expense) {
      res.status(404).json({ message: 'Gasto no encontrado' });
    }

    return res
      .status(200)
      .json({ message: 'Gasto obtenido correctamente', payload: expense });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error);
    }

    console.log(error);

    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const data = expenseSchemaOutId.parse(req.body);
    const newExpense = await expenseServices.addExpense(data);

    return res.status(201).json({
      message: 'Gasto ingresado correctamente',
      payload: newExpense,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error);
    }

    console.log(error);

    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const deleteExpenseById = async (req: Request, res: Response) => {
  try {
    const id = objectIdSchema.parse(req.params.id);

    const expense = await expenseServices.deleteExpenseById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    return res
      .status(200)
      .json({ message: 'Gasto eliminado correctamente', payload: expense });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error);
    }

    console.log(error);

    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const id = objectIdSchema.parse(req.params.id);
    const newData = partialExpenseSchema.parse(req.body);

    const updatedExpense = await expenseServices.updateExpense(id, newData);

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    return res.status(200).json({
      message: 'Gasto actualizado correctamente',
      payload: updatedExpense,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error);
    }

    console.log(error);

    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const deleteAllExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseServices.deleteAll();

    return res.status(200).json({
      message: 'Gastos eliminados correctamente',
      payload: expenses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Rutas adicionales
export const getExpensesByUser = async (req: Request, res: Response) => {
  try {
    const userId = userIdParamSchema.parse(req.params.userId);

    const expenses = await expenseServices.getExpensesByUserId(userId);

    return res.status(200).json({
      message: 'Gastos de usuario obtenidos correctamente',
      payload: expenses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getExpensesByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const expenses = await expenseServices.getExpensesByCategory(category);

    return res.status(200).json({
      message: 'Gastos por categoria obtenidos correctamente',
      payload: expenses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Internal Error Server', error });
  }
};
