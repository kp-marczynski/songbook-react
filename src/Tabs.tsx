import React from "react";
import {Redirect, Route, useLocation} from "react-router-dom";
import {IonContent, IonFooter, IonItem, IonPage, IonRouterOutlet, IonSegment, IonToolbar} from "@ionic/react";
import SongListPage from "./pages/SongListPage";
import SongDetailsPage from "./pages/SongDetailsPage";
import QueuePage from "./pages/QueuePage";
import SettingsPage from "./pages/SettingsPage";
import {musicalNotes, settings} from "ionicons/icons";
import SongEditPage from "./pages/SongEditPage";
import './Tabs.css'
import SongListItem from "./components/SongListItem";
import SegmentNavigationButton from "./components/SegmentNavigationButton";

const Tabs: React.FC = () =>{
    const location= useLocation()
    const tab = location.pathname.split("/")[1]

        return <IonPage>
            <IonFooter>
                <IonToolbar>
                    <IonItem>
                        <SongListItem song={{id: "1", title: "asdf", author:"asf", language: "asf", content: 'asfadgdg'}}/>
                    </IonItem>
                </IonToolbar>
                <IonToolbar>
                    <IonSegment className="tabs" mode="md" value={tab}>
                        <SegmentNavigationButton url={"song"} title={"Songs"} icon={musicalNotes}/>
                        <SegmentNavigationButton url={"settings"} title={"Settings"} icon={settings}/>
                    </IonSegment>
                </IonToolbar>
            </IonFooter>
            <IonContent>
                <IonRouterOutlet>
                    <Route path="/song" component={SongListPage} exact={true}/>
                    <Route path="/song/:author" component={SongListPage} exact={true}/>
                    <Route path="/song/:author/:title-:songId" component={SongDetailsPage} exact={true}/>
                    <Route path="/song/:author/:title-:songId/edit" component={SongEditPage} exact={true}/>
                    <Route path="/song/new/:songId" component={SongEditPage} exact={true}/>
                    <Route path="/queue" component={QueuePage}/>
                    <Route path="/settings" component={SettingsPage}/>
                    <Route path="/" render={() => <Redirect to="/song"/>} exact={true}/>
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
}

export default Tabs;
