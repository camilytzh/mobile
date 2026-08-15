import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton
} from '@ionic/react';
import { toastController } from '@ionic/core';
import { useState } from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import { categories } from '../data/categories';
import "./Pages.css";

export default function AddExpense() {
    const { addExpense } = useExpenses();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const showToast = async () => {
        const toast = await toastController.create({
            message: 'Gasto registrado exitosamente',
            duration: 1500,
            color: 'success'
        });
        await toast.present();
    };
    const handleSubmit = async () => {
        const numericAmount = Number(amount);

        if (
            description.trim() === '' ||
            amount === '' ||
            numericAmount <= 0 ||
            category === ''
        ) {
            const toast = await toastController.create({
                message: 'Completa todos los campos correctamente',
                duration: 1500,
                color: 'danger',
            });

            await toast.present();

            return;
        }

        addExpense(
            description.trim(),
            numericAmount,
            category
        );

        setDescription('');
        setAmount('');
        setCategory('');

        await showToast();
    };
    return (
        <IonPage>
            <IonHeader className="page-header">
                <IonToolbar>
                    <div className="page-header-content">
                        <h1>Registrar gasto</h1>
                        <p>Agrega un nuevo movimiento</p>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                <IonItem>
                    <IonLabel position="stacked">
                        Descripción
                    </IonLabel>

                    <IonInput
                        placeholder="Ej: Almuerzo"
                        value={description}
                        onIonInput={(event) =>
                            setDescription(event.detail.value ?? '')
                        }
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">
                        Monto
                    </IonLabel>

                    <IonInput
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onIonInput={(event) =>
                            setAmount(event.detail.value ?? '')
                        }
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">
                        Categoría
                    </IonLabel>

                    <IonSelect
                        placeholder="Seleccione"
                        value={category}
                        onIonChange={(event) =>
                            setCategory(event.detail.value)
                        }
                    >
                        {categories.map((categoryOption) => (
                            <IonSelectOption
                                key={categoryOption}
                                value={categoryOption}
                            >
                                {categoryOption}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>

                <IonButton
                    expand="block"
                    onClick={handleSubmit}
                    className="ion-margin-top"
                >
                    Guardar
                </IonButton>

            </IonContent>
        </IonPage>
    );
}