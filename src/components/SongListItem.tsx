import React from "react";
import {SongOverview} from "../model/SongOverview.model";
import {IonLabel} from "@ionic/react";
import './SongListItem.css'
import {useHistory} from "react-router";

interface OwnProps {
    song: SongOverview,
    style: any
}

const SongListItem: React.FC<OwnProps> = ({song, style}) => {
    const history = useHistory()

    function handleClickOnItem() {
        history.push(`/song/${song.title}/view`)
    }

    return <div className={"song-list-item"} style={style} onClick={handleClickOnItem}>
        <IonLabel>
            <h2>{song.title}</h2>
            <p>{song.author}</p>
        </IonLabel>
    </div>
}

export default SongListItem
