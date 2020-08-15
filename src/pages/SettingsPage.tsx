import React from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonList,
    IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import {setPageTitle} from "../utils/title";
import {signInAnonymously, signInWithGoogle, signOut} from "../utils/firebaseConfig";

const SettingsPage: React.FC = () => {
    useIonViewDidEnter(() => setPageTitle("Settings"))
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        Account
                    </IonListHeader>
                </IonList>
                {/*<IonItem>*/}
                {/*    <IonAvatar slot="start">*/}
                {/*        <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />*/}
                {/*    </IonAvatar>*/}
                {/*    <IonLabel>Item Avatar</IonLabel>*/}
                {/*</IonItem>*/}
                <IonButton onClick={()=>signInWithGoogle()}>google</IonButton>
                <IonButton onClick={()=>signInAnonymously().then()}>login</IonButton>
                <IonButton onClick={()=>signOut()}>Sign out</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default SettingsPage;
