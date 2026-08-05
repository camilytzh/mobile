import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent
} from '@ionic/react';
export default function Home() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>MiSaldo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonCard>
                    <IonCardContent>
                        <h2>Saldo disponible</h2>
                        <h1>$245.15</h1>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <h3>Gastos del mes</h3>
                        <h2>$54.85</h2>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <h3>Objetivo</h3>
                        <p>Controlar ingresos y gastos personales de forma sencilla.</p>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>);
}