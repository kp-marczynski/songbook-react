import React from "react";
import {Redirect, Route} from "react-router-dom";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import SongListPage from "./pages/SongListPage";
import SongDetailsPage from "./pages/SongDetailsPage";
import QueuePage from "./pages/QueuePage";
import SettingsPage from "./pages/SettingsPage";
import {headset, musicalNotes, settings} from "ionicons/icons";
import SongEditPage from "./pages/SongEditPage";

const Tabs: React.FC = () =>
    <IonTabs>
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
        <IonTabBar slot="bottom">
            <IonTabButton tab="song" href="/song">
                <IonIcon icon={musicalNotes}/>
                <IonLabel>Songs</IonLabel>
            </IonTabButton>
            <IonTabButton tab="queue" href="/queue">
                <IonIcon icon={headset}/>
                <IonLabel>Playlist</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settings}/>
                <IonLabel>Settings</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>

export default Tabs;
