import React from "react";
import {Redirect, Route} from "react-router-dom";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import SongList from "./pages/SongList";
import SongDetails from "./components/SongDetails";
import Queue from "./pages/Queue";
import Settings from "./pages/Settings";
import {headset, musicalNotes, settings} from "ionicons/icons";

const Tabs: React.FC = () =>
    <IonTabs>
        <IonRouterOutlet>
            <Route path="/song" component={SongList} exact={true}/>
            <Route path="/song/:songId" component={SongDetails} exact={true}/>
            <Route path="/queue" component={Queue}/>
            <Route path="/settings" component={Settings}/>
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
