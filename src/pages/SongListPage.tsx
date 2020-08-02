import React from 'react';
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import {useSelector} from 'react-redux';
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import VirtualSongList from "../components/VirtualSongList";
import {setPageTitle} from "../utils/title";
import {add} from "ionicons/icons";
import {attributePredicate, selectSongsBy} from "../store/songs";
import IntermediateVirtualSongList from "../components/IntermediateVirtualSongList";
import {Song} from "../model/Song.model";
import * as shortId from 'shortid';

const SongListPage: React.FC = () => {
    const selector = useSelector(selectSongsBy)
    const {author} = useParams()
    const songs: Song[] = author ? selector(attributePredicate("author", author)) : selector()

    useIonViewDidEnter(() => setPageTitle("Songs"))

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>
                    <Link to={"/song"}>All songs</Link>
                    {author && <span> / <Link to={author}>{author}</Link></span>}
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink={'/song/new/' + shortId.generate()}>
                    <IonIcon icon={add}/>
                </IonFabButton>
            </IonFab>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            {author
                ? <VirtualSongList songs={songs}/>
                : <IntermediateVirtualSongList
                    intermediateSongs={songs.reduce((map, song) => map.set(song.author, (map.get(song.author) ?? 0) + 1), new Map())}/>
            }

        </IonContent>
    </IonPage>;
};

export default SongListPage;
