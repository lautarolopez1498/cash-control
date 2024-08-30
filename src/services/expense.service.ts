import {
  ExpenseType,
  NewExpenseEntry,
  UpdateExpense,
} from '../schemas/expense.schemas';
import expensesModel from '../schemas/expense.model';

export const getExpenses = async (): Promise<ExpenseType[]> => {
  return await expensesModel.find({});
};

export const getExpenseById = async (
  _id: string
): Promise<ExpenseType | any> => {
  const expense = await expensesModel.findById(_id);

  return expense;
};

export const addExpense = async (
  newExpense: NewExpenseEntry
): Promise<ExpenseType | any> => {
  const expense = await expensesModel.create(newExpense);

  return expense;
};

export const deleteExpenseById = async (id: string): Promise<any> => {
  const expense = expensesModel.findByIdAndDelete({ _id: id });

  return expense;
};

export const updateExpense = async (
  id: string,
  updateData: UpdateExpense
): Promise<ExpenseType | any> => {
  const expense = await expensesModel.findByIdAndUpdate(
    { _id: id },
    updateData
  );

  return expense;
};

export const deleteAll = async (): Promise<object> => {
  const expenses = await expensesModel.deleteMany({});

  return expenses;
};
