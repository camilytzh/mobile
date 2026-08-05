import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel
} from '@ionic/react';
import "./Home.css";
export default function Home() {
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
                            <h1>$449.00</h1>
                        </IonCardContent>
                    </IonCard >
                    <div className="stats-row">
                        <IonCard className="expense-card">
                            <IonCardContent>
                                <h3>Gastos del mes</h3>
                                <h2>$51.00</h2>
                            </IonCardContent>
                        </IonCard>
                        <IonCard className="budget-card">
                            <IonCardContent>
                                <h3>Presupuesto</h3>
                                <h2>$500</h2>
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

                            <IonItem>

                                <IonAvatar slot="start" className="movement-icon">

                                    🍔

                                </IonAvatar>

                                <IonLabel>

                                    <h2>Almuerzo</h2>

                                    <p>Comida</p>

                                </IonLabel>

                                <h3 className="expense-value">-$4.50</h3>

                            </IonItem>

                            <IonItem>

                                <IonAvatar slot="start" className="movement-icon">

                                    🚌

                                </IonAvatar>

                                <IonLabel>

                                    <h2>Bus</h2>

                                    <p>Transporte</p>

                                </IonLabel>

                                <h3 className="expense-value">-$0.35</h3>

                            </IonItem>

                            <IonItem>

                                <IonAvatar slot="start" className="movement-icon">

                                    🛒

                                </IonAvatar>

                                <IonLabel>

                                    <h2>Víveres de la semana</h2>

                                    <p>Compras</p>

                                </IonLabel>

                                <h3 className="expense-value">-$35.00</h3>

                            </IonItem>

                        </IonList>

                    </IonCard>
                </div>
            </IonContent>
        </IonPage>);
}