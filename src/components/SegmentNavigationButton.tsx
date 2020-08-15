import React from "react";
import {useHistory} from "react-router";
import {IonIcon, IonLabel, IonSegmentButton} from "@ionic/react";

interface OwnProps {
    url: string,
    title: string,
    icon: any
}

const SegmentNavigationButton: React.FC<OwnProps> = ({url, title, icon}) => {
    const history = useHistory()

    function handleClickOnItem() {
        history.push('/' + url)
    }

    return <IonSegmentButton onClick={handleClickOnItem} value={url}>
        <IonIcon icon={icon}/>
        <IonLabel>{title}</IonLabel>
    </IonSegmentButton>
}

export default SegmentNavigationButton
