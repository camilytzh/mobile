import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import { Expense } from '../models/Expense';

interface ExpenseContextType {
  expenses: Expense[];
  income: number;
  budget: number;

  addExpense: (
    description: string,
    amount: number,
    category: string
  ) => void;

  addIncome: (amount: number) => void;
  setBudget: (amount: number) => void;

  deleteExpense: (id: number) => void;
  updateExpense: (
    id: number,
    description: string,
    amount: number,
    category: string
  ) => void;
}

const initialExpenses: Expense[] = [
  {
    id: 1,
    description: 'Almuerzo',
    amount: 4.5,
    category: 'Comida',
    date: '2026-08-13',
  },
  {
    id: 2,
    description: 'Bus',
    amount: 0.35,
    category: 'Transporte',
    date: '2026-08-13',
  },
  {
    id: 3,
    description: 'Víveres de la semana',
    amount: 35.0,
    category: 'Compras',
    date: '2026-08-12',
  },
  {
    id: 4,
    description: 'Productos de limpieza',
    amount: 7.15,
    category: 'Supermercado',
    date: '2026-08-11',
  },
  {
    id: 5,
    description: 'Café y snack',
    amount: 4.0,
    category: 'Comida',
    date: '2026-08-10',
  },
];

const initialIncome = 500;
const initialBudget = 500;

const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider = ({
  children,
}: ExpenseProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [income, setIncome] = useState<number>(initialIncome);
  const [budget, setBudgetState] = useState<number>(initialBudget);

  const addExpense = (
    description: string,
    amount: number,
    category: string
  ) => {
    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      newExpense,
    ]);
  };
  const addIncome = (amount: number) => {
    setIncome((currentIncome) => currentIncome + amount);
  };

  const setBudget = (amount: number) => {
    setBudgetState(amount);
  };

  const deleteExpense = (id: number) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  };

  const updateExpense = (
    id: number,
    description: string,
    amount: number,
    category: string
  ) => {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              description,
              amount,
              category,
            }
          : expense
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        income,
        budget,
        addIncome,
        setBudget,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      'useExpenses debe utilizarse dentro de ExpenseProvider'
    );
  }

  return context;
};