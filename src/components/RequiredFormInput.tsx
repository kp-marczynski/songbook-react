import React from "react";
import {IonInput, IonItem, IonLabel, IonText, IonTextarea} from "@ionic/react";

interface OwnProps {
    name: string,
    label: string,
    value: string,
    valueChangeHandler: (value: string) => void,
    textarea?: boolean
}

const RequiredFormTextInput: React.FC<OwnProps> = ({name, label, value, valueChangeHandler, textarea}) => {
    return <IonItem>
        <IonLabel position={"floating"}>{label} <IonText color={"danger"}>*</IonText></IonLabel>
        {
            textarea
                ? <IonTextarea name={name} value={value} required={true} rows={5} autoGrow={true}
                               onIonChange={e => valueChangeHandler(e.detail.value!)}/>
                : <IonInput name={name} value={value} type={"text"} required={true}
                            onIonChange={e => valueChangeHandler(e.detail.value!)}/>
        }
    </IonItem>
}

export default RequiredFormTextInput;
