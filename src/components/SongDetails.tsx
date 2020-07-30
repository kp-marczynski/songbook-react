import React from "react";
import {useParams, useRouteMatch} from "react-router";
import {IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar} from "@ionic/react";

const SongDetails: React.FC = () => {
    console.log("Song details")
    let {songId} = useParams()
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

export default SongDetails;
