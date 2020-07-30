import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave
} from '@ionic/react';
import {useHistory, useLocation} from "react-router";
import {SongOverview} from "../model/SongOverview.model";
import {Link} from "react-router-dom";

const songsInit: SongOverview[] = [
    {
        id: "1",
        title: "Yellow Brick Road",
        author: "Wizard of Oz",
        language: "EN"
    },
    {
        id: "2",
        title: "Dream On",
        author: "Aerosmith",
        language: "EN"
    },
    {
        id: "3",
        title: "Kiss to build a dream on",
        author: "Louis Armstrong",
        language: "EN"
    },
    {
        id: "4",
        title: "Amazing",
        author: "Aerosmith",
        language: "EN"
    }
]

const SongList: React.FC = () => {
    const [songs, setSongs] = useState<SongOverview[]>(songsInit)
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
    if(location.search !== search){
        setSearch(location.search)
        setSongs(searchSongs())
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

    function searchSongs(): SongOverview[]{
        for (let key of Array.from(query.keys())) {
            return songsInit.filter(song => (song as any)[key] == query.get(key))
        }
        let hierarchyLevel = 0;
        let temp: SongOverview[] = songsInit;
        while (hierarchyLevel < hierarchy.length - 1 && query.get(hierarchy[hierarchyLevel])) {
            temp = temp.filter(song => (song as any)[hierarchy[hierarchyLevel]] == query.get(hierarchy[hierarchyLevel]))
            hierarchyLevel++;
        }
        return songsInit;
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
                <IonList>
                    {/*{Array.from(new Set(songs.map(song=> song.author))).sort().map(author=>*/}
                    {/*    <IonItem key={author}>*/}
                    {/*        <IonLabel>{author}</IonLabel>*/}
                    {/*    </IonItem>*/}
                    {/*)}*/}
                    {songs.map(song =>
                        <IonItem key={song.id} routerLink={`/song/${song.title}`}>
                            <IonLabel>{song.title}</IonLabel>
                        </IonItem>)
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default SongList;
