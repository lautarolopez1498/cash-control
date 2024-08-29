import { Request, Response } from 'express';
import * as expenseServices from '../services/expense.service';
import {
  expenseSchemaOutId,
  partialExpenseSchema,
} from '../schemas/expense.schemas';

export const getAllExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseServices.getExpenses();
    return res.send({
      status: 'ok',
      data: expenses,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const expense = await expenseServices.getExpenseById(req.params.id);
    console.log(expense);

    return expense != null
      ? res.status(200).send(expense)
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

    return res.status(201).json({ status: 'ok', data: newExpense });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseServices.deleteExpenseById(req.params.id);

    return res.status(200).json({
      status: 'Gasto eliminado correctamente',
      data: expense,
    });
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

    return res.status(200).send({
      status: 'Gasto actualizado correctamente',
      data: updatedExpense,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
