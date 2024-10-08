import express from 'express';
import expenseRouter from './routes/expense.routes';
import mongoose from 'mongoose';

const app = express();
const PORT = 3010;

app.use(express.json());
app.use('/api/expenses', expenseRouter);

const starServer = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://lautaro:528276@cluster0.8ag41uo.mongodb.net/cash-control-db'
    );
    console.log('\nSuccessful connection! ');
  } catch (error) {
    console.log('Cannot connect to database', error);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
};

starServer();
