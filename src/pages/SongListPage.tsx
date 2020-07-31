import React, {useState} from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter,
    useIonViewDidLeave,
    useIonViewWillEnter,
    useIonViewWillLeave
} from '@ionic/react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from "react-router";
import {SongOverview} from "../model/SongOverview.model";
import {Link} from "react-router-dom";
import {addSong, selectSongIndex} from "../store/songs";
import VirtualSongList from "../components/VirtualSongList";

const SongListPage: React.FC = () => {
    const songs: SongOverview[] = useSelector(selectSongIndex)
    const dispatch = useDispatch()
    const [hierarchy, setHierarchy] = useState(["language", "author", "title"])
    const [search, setSearch] = useState("")
    const history = useHistory()
    console.log("history")
    console.log(history)
    console.log(useLocation())
    const location = useLocation()

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    if (location.search !== search) {
        setSearch(location.search)
        // setSongs(searchSongs())
    }

    useIonViewDidEnter(() => {
        console.log('ionViewDidEnter event fired');
    });

    useIonViewDidLeave(() => {
        console.log('ionViewDidLeave event fired');
    });

    useIonViewWillEnter(() => {
        console.log('ionViewWillEnter event fired');


    });

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

    function handleAddSong() {
        dispatch(addSong({
            id: Math.random() + "",
            title: "Thunderstruck",
            author: "AC/DC",
            language: "EN"
        }))
    }

    useIonViewWillLeave(() => {
        console.log('ionViewWillLeave event fired');
    });

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
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <VirtualSongList songs={songs}/>
            </IonContent>
            <IonButton expand="full" onClick={handleAddSong}>Add song</IonButton>
        </IonPage>
    );
};

export default SongListPage;
