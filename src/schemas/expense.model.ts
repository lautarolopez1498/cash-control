import mongoose from 'mongoose';

const expenseCollection = 'expenses';

const expenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  currency: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  description: String,
  paymentMethod: {
    type: String,
    require: true,
  },
  installments: {
    type: Number,
    require: true,
  },
  notes: String,
});

const expensesModel = mongoose.model(expenseCollection, expenseSchema);

export default expensesModel;
