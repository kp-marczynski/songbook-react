import React from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter} from '@ionic/react';
import {setPageTitle} from "../utils/title";

const SettingsPage: React.FC = () => {
    useIonViewDidEnter(() => setPageTitle("Settings"))
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 3</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 3</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonContent>
        </IonPage>
    );
};

export default SettingsPage;
