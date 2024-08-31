import { z } from 'zod';

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'ID inválido');

export type IdValid = z.infer<typeof objectIdSchema>;

export const expenseSchema = z.object({
  _id: objectIdSchema.optional(),
  userId: z.number(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  category: z.string(),
  date: z.string(),
  description: z.string().optional(),
  paymentMethod: z.string(),
  installments: z.number().int(),
  recurring: z.boolean(),
  recurringInterval: z.string().optional(),
  notes: z.string().optional(),
});

export type ExpenseType = z.infer<typeof expenseSchema>;

export const expenseSchemaOutId = expenseSchema.omit({ _id: true });
export type NewExpenseEntry = z.infer<typeof expenseSchemaOutId>;

export const partialExpenseSchema = expenseSchema.partial();
export type UpdateExpense = z.infer<typeof partialExpenseSchema>;
