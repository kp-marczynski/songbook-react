import React, {useState} from "react";
import {Redirect, useParams} from "react-router";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonPage,
    IonPopover,
    IonToolbar,
    useIonViewDidEnter
} from "@ionic/react";
import {setPageTitle} from "../utils/title";
import {useDispatch, useSelector} from "react-redux";
import {Song} from "../model/Song.model";
import {ellipsisVertical} from "ionicons/icons";
import {attributePredicate, removeSong, selectSongsBy} from "../store/songs";
import {parseChordPro} from "../utils/chordpro";

import "./SongDetailsPage.css"

const SongDetailsPage: React.FC = () => {
    const [showActionSheet, setShowActionSheet] = useState(false);
    let {songId} = useParams()
    const dispatch = useDispatch()
    let song: Song = useSelector(selectSongsBy)(attributePredicate('id', songId))[0]

    const handleDelete = () => {
        dispatch(removeSong(songId))
    }
    const formattedContent = parseChordPro(song?.content ?? "")

    useIonViewDidEnter(() => setPageTitle(`${song?.title} by ${song?.author}`))
    return song ?
        <IonPage id={"song-details"}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/song"/>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowActionSheet(true)}>
                            <IonIcon icon={ellipsisVertical} slot="icon-only"/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonPopover
                    isOpen={showActionSheet}
                    onDidDismiss={e => setShowActionSheet(false)}>
                    <IonList>
                        <IonItem routerLink={`/song/${song.author}/${song.title}-${songId}/edit`}
                                 onClick={() => setShowActionSheet(false)}>Edit</IonItem>
                        <IonItem onClick={() => handleDelete()}>Delete</IonItem>
                    </IonList>
                </IonPopover>
            </IonHeader>
            <IonContent>
                <IonList lines={"none"}>
                    {formattedContent.map((group, groupIndex) => <div key={groupIndex}>
                        {
                            group.simpleChords.length > 0 &&
                            <IonItemDivider sticky>
                                <IonLabel className={"ion-text-wrap chords"} color={"danger"}>
                                    {
                                        group.chords.map((chords, chordsIndex) => <p key={chordsIndex}>{group.simpleChords[chordsIndex]}</p>)
                                    }
                                </IonLabel>
                            </IonItemDivider>
                        }
                        {group.textLines.map((textLine, lineIndex)=><IonItem key={lineIndex} className={"lyrics-item"}>{textLine}</IonItem>)}
                    </div>)}
                </IonList>
            </IonContent>
        </IonPage>
        : <Redirect to={"/song"}/>
}

export default SongDetailsPage;
