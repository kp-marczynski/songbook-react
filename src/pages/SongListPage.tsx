import React from 'react';
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import {useSelector} from 'react-redux';
import {useParams} from "react-router";
import VirtualSongList from "../components/VirtualSongList";
import {setPageTitle} from "../utils/title";
import {add} from "ionicons/icons";
import {attributePredicate, selectSongsBy} from "../store/songs";
import IntermediateVirtualSongList from "../components/IntermediateVirtualSongList";
import {Song} from "../model/Song.model";
import * as shortId from 'shortid';
import Breadcrumbs from "../components/Breadcrumbs";

const SongListPage: React.FC = () => {
    const selector = useSelector(selectSongsBy)
    const {author} = useParams()
    const songs: Song[] = author ? selector(attributePredicate("author", author)) : selector()

    useIonViewDidEnter(() => setPageTitle("Songs"))

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <Breadcrumbs author={author}/>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink={'/song/new/' + shortId.generate()}>
                    <IonIcon icon={add}/>
                </IonFabButton>
            </IonFab>
            {author
                ? <VirtualSongList songs={songs}/>
                : <IntermediateVirtualSongList
                    intermediateSongs={songs.reduce((map, song) => map.set(song.author, (map.get(song.author) ?? 0) + 1), new Map())}/>
            }

        </IonContent>
    </IonPage>;
};

export default SongListPage;
