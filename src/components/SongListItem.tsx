import React from "react";
import {SongOverview} from "../model/SongOverview.model";
import {IonLabel} from "@ionic/react";
import './SongListItem.css'

interface OwnProps {
    song: SongOverview,
    style: any
}

const SongListItem: React.FC<OwnProps> = ({song, style}) =>
    <div className={"song-list-item"} style={style}>
        <IonLabel>
            <h2>{song.title}</h2>
            <p>{song.author}</p>
        </IonLabel>
    </div>


export default SongListItem
