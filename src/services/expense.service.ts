import {
  categoryParams,
  ExpenseType,
  NewExpenseEntry,
  UpdateExpense,
  userIdParam,
} from '../schemas/expense.schemas';
import expensesModel from '../schemas/expense.model';

export const getExpenses = async (): Promise<ExpenseType[] | any> => {
  try {
    const expenses = await expensesModel.find();

    return expenses;
  } catch (error) {
    console.error('error al obtener gastos', error);
  }
};

export const getExpenseById = async (
  _id: string
): Promise<ExpenseType | any> => {
  try {
    const expense = await expensesModel.findById(_id);

    return expense;
  } catch (error) {
    console.error('error al obtener gasto por ID', error);
  }
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

  console.log(expense);

  return expense;
};

export const deleteAll = async (): Promise<object> => {
  const expenses = await expensesModel.deleteMany({});

  return expenses;
};

export const getExpensesByUserId = async (
  userId: userIdParam
): Promise<ExpenseType[] | any> => {
  const expenses = await expensesModel.find({ userId });

  return expenses;
};

export const getExpensesByCategory = async (
  category: categoryParams
): Promise<ExpenseType[] | any> => {
  const expenses = await expensesModel.find({ category });

  return expenses;
};
