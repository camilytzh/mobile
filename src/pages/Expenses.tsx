import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge
} from '@ionic/react';
import { useExpenses } from '../contexts/ExpenseContext';
import "./Pages.css";
export default function Expenses() {
    const { expenses } = useExpenses();
    return (
        <IonPage>
            <IonHeader className="page-header">
                <IonToolbar>
                    <div className="page-header-content">
                        <h1>Movimientos</h1>
                        <p>Revisa tus gastos registrados</p>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList> {expenses.map(expense => (<IonItem key={expense.id}>
                    <IonLabel>
                        <h2>{expense.description}</h2>
                        <p>{expense.category}</p>
                    </IonLabel>
                    <IonBadge color='danger'> -${expense.amount.toFixed(2)} </IonBadge>
                </IonItem>))}
                </IonList>
            </IonContent>
        </IonPage>);
}