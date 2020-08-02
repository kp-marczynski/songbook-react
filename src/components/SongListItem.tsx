import React from "react";
import {IonLabel} from "@ionic/react";
import {useHistory} from "react-router";
import {Song} from "../model/Song.model";
import './SongListItem.css'

interface OwnProps {
    song: Song,
    style: any
}

const SongListItem: React.FC<OwnProps> = ({song, style}) => {
    const history = useHistory()

    function handleClickOnItem() {
        history.push(`/song/${song.author}/${song.title}-${song.id}`)
    }

    return <div className={"song-list-item"} style={style} onClick={handleClickOnItem}>
        <IonLabel>
            <h2>{song.title}</h2>
            <p>{song.author}</p>
        </IonLabel>
    </div>
}

export default SongListItem
