import './SongListItem.css'
import {IonCol, IonIcon, IonLabel, IonRow} from "@ionic/react";
import React from "react";
import {useHistory, useLocation} from "react-router";
import {chevronForward} from "ionicons/icons";

interface OwnProps {
    style: any,
    label: string,
    counter: number,
}

const IntermediateSongListItem: React.FC<OwnProps> = ({style, label, counter}) => {
    const history = useHistory()
    const location = useLocation()

    function handleClickOnItem() {
        history.push(location.pathname + "/" + label)
    }

    return <IonRow className={"song-list-item"} style={style} onClick={handleClickOnItem}>
        {/*<IonCol>*/}
        {/*    <IonButton slot="start">*/}
        {/*        <IonIcon icon={chevronForward}/>*/}
        {/*    </IonButton>*/}
        {/*</IonCol>*/}
        <IonCol>
        <IonLabel>
            <h2>{label}</h2>
            <p>Count: {counter}</p>
        </IonLabel>
        </IonCol>
        <IonCol>
        <IonIcon icon={chevronForward} className={"intermediateIcon"}/>
        </IonCol>
    </IonRow>
}

export default IntermediateSongListItem
