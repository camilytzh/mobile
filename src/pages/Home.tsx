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
    IonButton
} from '@ionic/react';
import { addCircle } from 'ionicons/icons';
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
                    <h1>MiSaldo 💰</h1>
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
                                        >
                                            Cambiar
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