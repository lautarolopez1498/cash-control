import { Request, Response } from 'express';
import * as expenseServices from '../services/expense.service';
import {
  subcategoryParamSchema,
  categoryParamSchema,
  dateRangeSchema,
  expenseSchemaOutId,
  objectIdSchema,
  partialExpenseSchema,
  userIdParamSchema,
} from '../schemas/expense.schemas';
import { z, ZodError } from 'zod';

// Rutas CRUD
export const getAllExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseServices.getExpenses();

    if (expenses.length === 0) {
      return res
        .status(200)
        .json({ message: 'No se encontraron gastos', data: expenses });
    }

    return res
      .status(200)
      .json({ message: 'Gastos encontrados', data: expenses });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const id = objectIdSchema.parse(req.params.id);
    console.log(id);

    const expense = await expenseServices.getExpenseById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    return res
      .status(200)
      .json({ message: 'Gasto obtenido correctamente', data: expense });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error);
    }
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { date, ...otherFields } = req.body;
    const parsedDate = new Date(date);
    const data = expenseSchemaOutId.parse({ date: parsedDate, ...otherFields });

    const newExpense = await expenseServices.addExpense(data);

    return res.status(201).json({
      message: 'Gasto ingresado correctamente',
      data: newExpense,
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
      .json({ message: 'Gasto eliminado correctamente', data: expense });
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
    const { date, ...otherFields } = req.body;
    const parsedDate = new Date(date);
    const newData = partialExpenseSchema.parse({
      date: parsedDate,
      ...otherFields,
    });

    const updatedExpense = await expenseServices.updateExpense(id, newData);

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    return res.status(200).json({
      message: 'Gasto actualizado correctamente',
      data: updatedExpense,
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
      data: expenses,
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

    if (expenses.length === 0) {
      return res
        .status(200)
        .json({ message: 'Usuario no encontrado', data: expenses });
    }

    return res.status(200).json({
      message: 'Gastos de usuario obtenidos correctamente',
      data: expenses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getExpensesBySubcategory = async (req: Request, res: Response) => {
  try {
    const subcategory = subcategoryParamSchema.parse(req.params.subcategory);
    const expenses =
      await expenseServices.getExpensesBySubcategory(subcategory);

    if (expenses.length === 0) {
      return res.status(200).json({
        message: `No hay ningun gasto para la subcategoria ${subcategory}`,
        data: expenses,
      });
    }

    return res.status(200).json({
      message: 'Gastos por subcategoria obtenidos correctamente',
      data: expenses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Internal Error Server', error });
  }
};

export const getExpensesByCategory = async (req: Request, res: Response) => {
  try {
    const category = categoryParamSchema.parse(req.params.category);
    const expenses = await expenseServices.getExpensesByCategory(category);

    if (expenses.length === 0) {
      return res.status(200).json({
        message: `No hay ningun gasto para la categoria ${category}`,
        data: expenses,
      });
    }

    return res.status(200).json({
      message: 'Gastos por categoria obtenidos correctamente',
      data: expenses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Internal Error Server', error });
  }
};

export const getExpensesByDateRange = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = dateRangeSchema.parse({
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    });
    const expenses = await expenseServices.getExpensesByDate(
      startDate,
      endDate
    );
    console.log(expenses);

    return res
      .status(200)
      .json({ message: 'Gastos encontrados correctamente', expenses });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
