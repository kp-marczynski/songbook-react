import React from "react";
import {useParams} from "react-router";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, useIonViewDidEnter} from "@ionic/react";
import {setPageTitle} from "../utils/title";

const SongDetailsPage: React.FC = () => {
    console.log("Song details")
    let {songId} = useParams()
    useIonViewDidEnter(() => setPageTitle(songId))
    return <IonPage id={"song-details"}>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/song"/>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <h1>Song details: {songId}</h1>
        </IonContent>
    </IonPage>
}

export default SongDetailsPage;
