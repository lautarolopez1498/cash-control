import { Request, Response } from 'express';
import * as expenseServices from '../services/expense.service';
import {
  expenseSchemaOutId,
  partialExpenseSchema,
} from '../schemas/expense.schemas';

export const getAllExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseServices.getExpenses();

    return res
      .status(200)
      .json({ message: 'Gastos encontrados', payload: expenses });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const expense = await expenseServices.getExpenseById(req.params.id);
    console.log(expense);

    return expense != null
      ? res
          .status(200)
          .json({ message: 'Gasto obtenido correctamente', payload: expense })
      : res.sendStatus(404);
  } catch (error) {
    console.error('Error fetching expense', error);
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
    console.log(error);
    return res.status(400).json(error);
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseServices.deleteExpenseById(req.params.id);

    return res
      .status(200)
      .json({ message: 'Gasto eliminado correctamente', payload: expense });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'Error al eliminar el documento', error });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newData = partialExpenseSchema.parse(req.body);
    const updatedExpense = await expenseServices.updateExpense(id, newData);

    if (newData === null) {
      return;
    }

    return res.status(200).json({
      message: 'Gasto actualizado correctamente',
      payload: updatedExpense,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const deleteAllExpenses = async (_req: Request, res: Response) => {
  try {
    const expeses = await expenseServices.deleteAll();
    return res.status(200).json({
      messege: 'Gastos eliminados correctamente',
      payload: expeses,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ message: 'Error al eliminar los registros', error });
  }
};
