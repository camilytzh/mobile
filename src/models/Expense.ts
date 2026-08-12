export interface Expense {
  id?: string;
  userId: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}