import React, {useState} from "react";
import {IonButton, IonList, IonPage, useIonViewDidEnter} from "@ionic/react";
import RequiredFormTextInput from "../components/RequiredFormInput";
import {Song} from "../model/Song.model";
import {useDispatch, useSelector} from "react-redux";
import {addSong, attributePredicate, selectSongsBy} from "../store/songs";
import {useHistory, useParams} from "react-router";
import * as shortId from 'shortid';

const SongEditPage: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [content, setContent] = useState('')
    const [id, setId] = useState('')

    let {songId} = useParams()
    let song: Song = useSelector(selectSongsBy)(attributePredicate('id', songId))[0]
    useIonViewDidEnter(() => {
        if (song) {
            setId(song.id)
            setAuthor(song.author)
            setTitle(song.title)
            setLanguage(song.language)
            setContent(song.content)
        } else {
            setId(songId ?? shortId.generate())
        }
    })


    const dispatch = useDispatch()
    const history = useHistory()

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        const song: Song = {
            id,
            author,
            title,
            language,
            content
        }
        dispatch(addSong(song))
        history.push("/song")
        resetState()
    };

    const resetState = () => {
        setId('')
        setAuthor('')
        setTitle('')
        setContent('')
        setLanguage('')
        setFormSubmitted(false)
    }

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
