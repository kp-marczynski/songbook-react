import React, {useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from "react-router";
import {Link} from "react-router-dom";
import {selectSongIndex} from "../store/songs";
import VirtualSongList from "../components/VirtualSongList";
import {setPageTitle} from "../utils/title";
import {add} from "ionicons/icons";
import {Song} from "../model/Song.model";

const SongListPage: React.FC = () => {
    const songs: Song[] = useSelector(selectSongIndex)
    const dispatch = useDispatch()
    const [hierarchy, setHierarchy] = useState(["language", "author", "title"])
    const [search, setSearch] = useState("")
    const history = useHistory()

    const location = useLocation()

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    if (location.search !== search) {
        setSearch(location.search)
        // setSongs(searchSongs())
    }

    useIonViewDidEnter(() => setPageTitle("Songs"))

    // function searchSongs(): SongOverview[] {
    //     for (let key of Array.from(query.keys())) {
    //         return songsInit.filter(song => (song as any)[key] == query.get(key))
    //     }
    //     let hierarchyLevel = 0;
    //     let temp: SongOverview[] = songsInit;
    //     while (hierarchyLevel < hierarchy.length - 1 && query.get(hierarchy[hierarchyLevel])) {
    //         temp = temp.filter(song => (song as any)[hierarchy[hierarchyLevel]] == query.get(hierarchy[hierarchyLevel]))
    //         hierarchyLevel++;
    //     }
    //     return songsInit;
    // }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <Link to={"/song"}>All songs</Link> / <Link to={"/song?author=Aerosmith"}>Aerosmith</Link>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink={'/song/new'}>
                        <IonIcon icon={add}/>
                    </IonFabButton>
                </IonFab>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <VirtualSongList songs={songs}/>
            </IonContent>
        </IonPage>
    );
};

export default SongListPage;
