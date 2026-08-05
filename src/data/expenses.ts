// datos de prueba sin backend aun
export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
}
export const mockExpenses: Expense[] = [
    {
        id: 1,
        description: 'Almuerzo',
        amount: 4.5,
        category: 'Comida'
    },
    {
        id: 2,
        description: 'Bus',
        amount: 0.35,
        category: 'Transporte'
    },
    {
        id: 3,
        description: 'Víveres de la semana',
        amount: 35.0,
        category: 'Compras'
    },
    {
        id: 4,
        description: 'Productos de limpieza',
        amount: 7.15,
        category: 'Supermercado'
    },
    {
        id: 5,
        description: 'Café y snack',
        amount: 4.0,
        category: 'Comida'
    },
];