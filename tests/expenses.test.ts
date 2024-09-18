import { getExpenseById } from '../src/services/expense.service';

describe('getExpenses', () => {
  test('deberia traer un gasto por su ID', async () => {
    const response = await getExpenseById('66d0e215f00634af00af0ed3');
    const data = {
      _id: '66d0e215f00634af00af0ed3',
      userId: 8,
      amount: 14000,
      currency: 'ARS',
      category: 'Food',
      date: '2024-08-10',
      description: 'Hamburguesa',
      paymentMethod: 'Cash',
      installments: null,
      recurring: false,
      recurringInterval: null,
      notes: "Doble cuarto de libra en McDonald's",
    };
    expect(response).toBe(data);
  });
});
