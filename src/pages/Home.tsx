import {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonIcon,
    IonInput,
    IonButton,
    IonProgressBar
} from '@ionic/react';
import { addCircle, createOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import "./Home.css";

export default function Home() {
    const { expenses, income, budget, addIncome, setBudget } = useExpenses();
    const [showAddIncome, setShowAddIncome] = useState(false);
    const [incomeAmount, setIncomeAmount] = useState('');
    const [showBudgetEdit, setShowBudgetEdit] = useState(false);
    const [budgetAmount, setBudgetAmount] = useState('');

    const totalSpent = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const availableBalance = income - totalSpent;

    const budgetPercentage =
        budget > 0
            ? (totalSpent / budget) * 100
            : 0;

    // Para la barra, máximo 100%
    const budgetProgress =
        Math.min(budgetPercentage, 100) / 100;

    const budgetExceeded =
        totalSpent > budget;

    const budgetRemaining =
        budget - totalSpent;

    const categoryTotals: {
        [key: string]: number;
    } = {};

    expenses.forEach((expense) => {

        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
        } else {
            categoryTotals[expense.category] = expense.amount;
        }

    });

    const categoryExpenses = Object.entries(categoryTotals)
        .filter(([, amount]) => amount > 0)
        .sort(([, amountA], [, amountB]) => amountB - amountA);

    const categoryColors: Record<string, string> = {
        Comida: '#4CAF50',
        Transporte: '#2196F3',
        Salud: '#F44336',
        Ocio: '#9C27B0',
        Compras: '#FF9800',
        Supermercado: '#00ACC1',
        Educación: '#E91E63',
        Hogar: '#795548',
        Servicios: '#607D8B',
        Ropa: '#8BC34A',
        Otros: '#FF5722',
    };

    let currentPercentage = 0;

    const donutGradient = categoryExpenses
        .map(([category, amount]) => {

            const percentage =
                totalSpent > 0
                    ? (amount / totalSpent) * 100
                    : 0;

            const start = currentPercentage;

            currentPercentage += percentage;

            const end = currentPercentage;

            const color =
                categoryColors[category] ?? '#9E9E9E';

            return `${color} ${start}% ${end}%`;
        })
        .join(', ');

    const recentExpenses = [...expenses]
        .reverse()
        .slice(0, 3);

    const handleAddIncome = () => {

        const amount = Number(incomeAmount);

        if (amount <= 0) {
            return;
        }

        addIncome(amount);

        setIncomeAmount('');
        setShowAddIncome(false);
    };

    const handleBudgetChange = () => {

        const amount = Number(budgetAmount);

        if (amount <= 0) {
            return;
        }

        setBudget(amount);

        setBudgetAmount('');
        setShowBudgetEdit(false);
    };
    return (
        <IonPage>
            <IonContent fullscreen className="home-page">
                <div className="header-home">
                    <h1>MiSaldo</h1>
                    <p>Controla tus finanzas fácilmente</p>
                </div>
                <div className="content-home">
                    <IonCard className="balance-card">
                        <IonCardContent>
                            <h2>Saldo disponible</h2>
                            <h1>${availableBalance.toFixed(2)}</h1>
                            {!showAddIncome ? (

                                <div
                                    className="add-income"
                                    onClick={() =>
                                        setShowAddIncome(true)
                                    }
                                >

                                    <IonIcon
                                        icon={addCircle}
                                    />

                                    <span>
                                        Añadir dinero
                                    </span>

                                </div>

                            ) : (

                                <div className="income-form">

                                    <IonInput
                                        type="number"
                                        placeholder="Monto"
                                        value={incomeAmount}
                                        onIonInput={(event) =>
                                            setIncomeAmount(
                                                event.detail.value ?? ''
                                            )
                                        }
                                    />

                                    <IonButton
                                        onClick={handleAddIncome}
                                    >
                                        Listo
                                    </IonButton>

                                </div>

                            )}
                        </IonCardContent>
                    </IonCard >

                    <div className="stats-row">
                        <IonCard className="expense-card">
                            <IonCardContent>
                                <h3>Gastos del mes</h3>
                                <h2>${totalSpent.toFixed(2)}</h2>

                            </IonCardContent>
                        </IonCard>
                        <IonCard className="budget-card">
                            <IonCardContent>
                                <h3>Presupuesto</h3>
                                {!showBudgetEdit ? (

                                    <>
                                        <h2>
                                            ${budget.toFixed(2)}
                                        </h2>

                                        <button
                                            className="edit-budget"
                                            onClick={() =>
                                                setShowBudgetEdit(true)
                                            }
                                            aria-label="Cambiar presupuesto"
                                        >
                                            <IonIcon icon={createOutline} />
                                        </button>
                                    </>

                                ) : (

                                    <div className="budget-form">

                                        <IonInput
                                            type="number"
                                            placeholder="Nuevo límite"
                                            value={budgetAmount}
                                            onIonInput={(event) =>
                                                setBudgetAmount(
                                                    event.detail.value ?? ''
                                                )
                                            }
                                        />

                                        <IonButton
                                            size="small"
                                            onClick={handleBudgetChange}
                                        >
                                            Listo
                                        </IonButton>

                                    </div>

                                )}
                            </IonCardContent>
                        </IonCard>
                    </div>
                    <IonCard className="budget-progress-card">

                        <IonCardHeader>

                            <IonCardTitle>
                                Presupuesto utilizado
                            </IonCardTitle>

                        </IonCardHeader>

                        <IonCardContent>

                            <div className="budget-progress-info">

                                <span>
                                    ${totalSpent.toFixed(2)}
                                </span>

                                <span>
                                    de ${budget.toFixed(2)}
                                </span>

                            </div>

                            <IonProgressBar
                                value={budgetProgress}
                            />

                            <div className="budget-progress-text">

                                {budgetExceeded ? (

                                    <span className="budget-warning">
                                        ⚠️ Has superado tu presupuesto por $
                                        {Math.abs(budgetRemaining).toFixed(2)}
                                    </span>

                                ) : (

                                    <span>
                                        Te quedan $
                                        {budgetRemaining.toFixed(2)}
                                        {' '}de presupuesto
                                    </span>

                                )}

                            </div>

                            <p className="budget-percentage">
                                {budgetPercentage.toFixed(1)}% utilizado
                            </p>

                        </IonCardContent>

                    </IonCard>

                    <IonCard className="category-card">

                        <IonCardHeader>

                            <IonCardTitle>
                                Gastos por categoría
                            </IonCardTitle>

                        </IonCardHeader>

                        <IonCardContent>

                            {categoryExpenses.length === 0 ? (

                                <p>
                                    Todavía no hay gastos registrados.
                                </p>

                            ) : (

                                <>

                                    <div className="category-chart">

                                        <div className="donut-chart"
                                            style={{
                                                background: `conic-gradient(${donutGradient})`
                                            }}>

                                            <div className="donut-center">

                                                <strong>
                                                    ${totalSpent.toFixed(2)}
                                                </strong>

                                                <span>
                                                    Gastado
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    <div className="category-list">

                                        {categoryExpenses.map(
                                            ([category, amount]) => {

                                                const percentage =
                                                    totalSpent > 0
                                                        ? (amount / totalSpent) * 100
                                                        : 0;

                                                const color =
                                                    categoryColors[category] ?? '#9E9E9E';

                                                return (

                                                    <div
                                                        className="category-row"
                                                        key={category}
                                                    >

                                                        <div className="category-name">

                                                            <span
                                                                className="category-dot"
                                                                style={{
                                                                    backgroundColor: color
                                                                }}
                                                            />

                                                            <strong>
                                                                {category}
                                                            </strong>

                                                        </div>

                                                        <div className="category-value">

                                                            <span>
                                                                {percentage.toFixed(1)}%
                                                            </span>

                                                            <strong>
                                                                ${amount.toFixed(2)}
                                                            </strong>

                                                        </div>

                                                    </div>

                                                );

                                            }
                                        )}

                                    </div>


                                </>

                            )}

                        </IonCardContent>

                    </IonCard>

                    <IonCard className="movements-card">

                        <IonCardHeader>

                            <IonCardTitle>

                                Últimos movimientos

                            </IonCardTitle>

                        </IonCardHeader>

                        <IonList lines="none">

                            {recentExpenses.map((expense) => (

                                <IonItem key={expense.id}>

                                    <IonAvatar
                                        slot="start"
                                        className="movement-icon"
                                    >
                                        💸
                                    </IonAvatar>

                                    <IonLabel>
                                        <h2>
                                            {expense.description}
                                        </h2>

                                        <p>
                                            {expense.category}
                                        </p>
                                    </IonLabel>

                                    <h3 className="expense-value">
                                        -${expense.amount.toFixed(2)}
                                    </h3>

                                </IonItem>

                            ))}

                        </IonList>

                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
}