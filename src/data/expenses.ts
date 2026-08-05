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
    }
];