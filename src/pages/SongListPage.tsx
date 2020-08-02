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
import {useSelector} from 'react-redux';
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import VirtualSongList from "../components/VirtualSongList";
import {setPageTitle} from "../utils/title";
import {add} from "ionicons/icons";
import {attributePredicate, combinePredicates, selectSongBy} from "../store/songs";

const hierarchy = ["author", "title"]

const SongListPage: React.FC = () => {
    const selector = useSelector(selectSongBy)
    const [hierarchyData, setHierarchyData] = useState([] as string[])
    const [search, setSearch] = useState("")
    const songs = selector(combinePredicates(...hierarchyData.map((value, index) => attributePredicate(hierarchy[index], value))))

    const location = useLocation()

    if (location.search !== search) {
        const query = new URLSearchParams(location.search);
        setSearch(location.search)

        const keys = Array.from(query.keys())
        const temp: string[] = [];
        for (let i = 0; i < keys.length && keys.find(key => key === hierarchy[i]); i++) {
            temp.push(query.get(keys[i])!)
        }
        setHierarchyData(temp)
    }

    useIonViewDidEnter(() => setPageTitle("Songs"))

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>
                    <Link to={"/song"}>All songs</Link> {
                    hierarchyData.map((value, index) =>
                        <span key={index}>
                            /
                            <Link to={"/song?" +
                            hierarchyData.slice(0, index + 1).map((value2, index2) => hierarchy[index2] + "=" + value2).join("&")}>
                                {console.log(hierarchyData.slice(0, index + 1).map((value2, index2) => hierarchy[index2] + "=" + value2).join("&"))}
                                {console.log(value)}
                                {value}
                            </Link>
                        </span>
                    )
                }
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
    </IonPage>;
};

export default SongListPage;
