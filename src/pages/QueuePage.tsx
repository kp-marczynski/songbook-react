import React from 'react';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import {setPageTitle} from "../utils/title";

const QueuePage: React.FC = () => {
    const songs = [
        {
            id: 1,
            title: "Yellow Brick Road"
        },
        {
            id: 2,
            title: "Dream On"
        },
        {
            id: 3,
            title: "Kiss to build a dream on"
        }
    ]
    useIonViewDidEnter(()=>setPageTitle("Queue"))
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 2</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {songs.map(song =>
                        <IonItem key={song.id} routerLink={`/song/${song.title}`}>
                            <IonLabel>
                                {song.title}
                            </IonLabel>
                        </IonItem>)
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default QueuePage;
