import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton
} from '@ionic/react';
import { useState } from 'react';
import { toastController } from '@ionic/core';
export default function AddExpense() {
    const showToast = async () => {
        const toast = await toastController.create({
            message: 'Gasto registrado exitosamente',
            duration: 1500,
            color: 'success'
        });
        await toast.present();
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registrar gasto</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonItem>
                    <IonLabel position='stacked'>Descripción</IonLabel>
                    <IonInput placeholder='Ej: Almuerzo' />
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Monto</IonLabel>
                    <IonInput type='number' placeholder='0.00' />
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>Categoría</IonLabel>
                    <IonSelect placeholder='Seleccione'>
                        <IonSelectOption value='comida'>Comida</IonSelectOption>
                        <IonSelectOption value='transporte'>Transporte</IonSelectOption>
                        <IonSelectOption value='salud'>Salud</IonSelectOption>
                        <IonSelectOption value='ocio'>Ocio</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonButton expand='block' onClick={showToast} className='ion-margin-top'> Guardar </IonButton>
            </IonContent>
        </IonPage>);
}