import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge
} from '@ionic/react';
import { mockExpenses } from '../data/expenses'; export default function Expenses() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Movimientos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList> {mockExpenses.map(expense => (<IonItem key={expense.id}>
                    <IonLabel>
                        <h2>{expense.description}</h2>
                        <p>{expense.category}</p>
                    </IonLabel>
                    <IonBadge color='danger'> ${expense.amount.toFixed(2)} </IonBadge>
                </IonItem>))}
                </IonList>
            </IonContent>
        </IonPage>);
}