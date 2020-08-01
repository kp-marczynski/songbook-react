import React, {useState} from "react";
import {IonButton, IonList, IonPage} from "@ionic/react";
import RequiredFormTextInput from "../components/RequiredFormInput";
import {SongDetailed} from "../model/SongDetailed.model";
import {useDispatch} from "react-redux";
import {addSong} from "../store/songs";
import {useHistory} from "react-router";

const SongEditPage: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [content, setContent] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        const song: SongDetailed = {
            id: `${Math.random()}`,
            author,
            title,
            language,
            content
        }
        dispatch(addSong(song))
        history.push("/song")
    };

    return <IonPage>
        <form onSubmit={submit}>
            <IonList>
                <RequiredFormTextInput name={"author"} label={"Author"} value={author} valueChangeHandler={setAuthor}/>
                <RequiredFormTextInput name={"title"} label={"Title"} value={title} valueChangeHandler={setTitle}/>
                <RequiredFormTextInput name={"language"} label={"Language"} value={language}
                                       valueChangeHandler={setLanguage}/>
                <RequiredFormTextInput name={"content"} label={"Lyrics and chords in ChordPro format"} value={content}
                                       valueChangeHandler={setContent} textarea={true}/>
                <IonButton type={"submit"} disabled={formSubmitted} expand={"block"}>Submit</IonButton>
            </IonList>
        </form>
    </IonPage>
};

export default SongEditPage;
