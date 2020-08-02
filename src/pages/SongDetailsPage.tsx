import React from "react";
import {Redirect, useHistory, useParams} from "react-router";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonToolbar,
    useIonViewDidEnter
} from "@ionic/react";
import {setPageTitle} from "../utils/title";
import {useSelector} from "react-redux";
import {Song} from "../model/Song.model";
import {pencil} from "ionicons/icons";
import {attributePredicate, selectSongsBy} from "../store/songs";

const SongDetailsPage: React.FC = () => {
    let {songId} = useParams()
    let song: Song = useSelector(selectSongsBy)(attributePredicate('id', songId))[0]

    useIonViewDidEnter(() => setPageTitle(`${song?.title} by ${song?.author}`))
    return song ?
        <IonPage id={"song-details"}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/song"/>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton routerLink={`/song/${songId}/edit`}>
                            <IonIcon icon={pencil} slot="icon-only"/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {JSON.stringify(song)}
            </IonContent>
        </IonPage>
        : <Redirect to={"/song"}/>
}

export default SongDetailsPage;
