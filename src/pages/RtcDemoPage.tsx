import React, {useRef, useState} from 'react';
import {
    IonBadge,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import {setPageTitle} from "../utils/title";
import {firestore} from "../utils/firebaseConfig";
import {useLocation} from "react-router";
import SimplePeer from "simple-peer";
import * as shortId from 'shortid';
import {checkmark} from "ionicons/icons";
import firebase from "firebase";

const RtcDemoPage: React.FC = () => {
    const location = useLocation();
    const [peers, setPeers] = useState(new Map<string, any>())
    const peerId = shortId.generate()
    const [counter, setCounter] = useState({count: 0})
    const [isIndicator, setIsIndicator] = useState(false)
    const stateRef = useRef<any>();
    stateRef.current = counter;

    const handleButtonClick = () => {
        setCounter({count: counter.count + 1})
        console.log("button clicked");
        console.log(peers)
        peers.forEach((val, key) => {
            try {
                console.log("sent to: " + key)
                val.send(JSON.stringify(counter))
            } catch (e) {
                console.error("error for id: " + key)
                peers.delete(key)
            }
        })
    }

    useIonViewDidEnter(() => {
        setPageTitle("Rtc demo")
        const indicatorId = "1";
        setIsIndicator(!location.pathname.includes("guest"))

        if (!location.pathname.includes("guest")) {
            firestore.collection("rtc").doc(indicatorId).collection("peers").where("type", "in", ["request", "answer"]).onSnapshot(collectionSnap => {
                collectionSnap.docs.forEach(snapshot => {
                    console.error("snapshot read")
                    if (snapshot.data().type === "request") {
                        const peer = new SimplePeer({
                            initiator: true,
                            trickle: false
                        });
                        peer.on('signal', signal => {
                            if (signal.type === "offer") {
                                snapshot.ref.set(signal).then(() => console.log("offer for id: " + snapshot.id));
                            }
                        })
                        peer.on('connect', () => {
                            snapshot.ref.delete()
                            peer.send(JSON.stringify(stateRef.current));
                            console.log("connected with id: " + snapshot.id)
                        })
                        peer.on('error', error => {
                            snapshot.ref.delete()
                            peers.delete(snapshot.id)
                        })
                        peers.set(snapshot.id, peer)
                        console.log(peers)
                    } else if (snapshot.data().type === "answer") {
                        try {
                            peers.get(snapshot.id).signal(snapshot.data())
                        } catch (e) {
                            console.error("error for id: " + snapshot.id)
                            peers.delete(snapshot.id)
                            snapshot.ref.delete()
                        }
                    } else {
                        setTimeout(() => snapshot.ref.delete(), 100000)
                    }
                })
            })
        } else {
            firestore.collection("rtc").doc(indicatorId).collection("peers")
                .where(firebase.firestore.FieldPath.documentId(), "==", peerId)
                .where("type", "==", "offer").onSnapshot(collectionSnap => {
                if (collectionSnap.empty) {
                    try {
                        peers.get(indicatorId).send("echo " + peerId)
                    } catch (e) {
                        firestore.collection("rtc").doc(indicatorId)
                            .collection("peers").doc(peerId)
                            .set({type: "request"}).then(() => console.log("request sent"))
                    }
                }
                collectionSnap.docs.forEach(snapshot => {
                    // .doc(peerId).onSnapshot(snapshot => {
                    console.error("snapshot read")
                    const snapshotData = snapshot.data()
                    if (snapshotData.type === "offer") {
                        const peer = new SimplePeer({
                            initiator: false,
                            trickle: false
                        });
                        peer.signal(snapshotData)
                        peer.on("data", data => console.log("data: " + data))
                        peer.on("signal", signal => {
                            if (signal.type === "answer") {
                                snapshot.ref.set(signal).then(() => console.log("answer for id: " + snapshot.id));
                            }
                        })
                        peer.on("error", error => {
                            console.log(error)
                        })
                        peer.on("close", () => {
                            console.log("connection closed")
                            snapshot.ref.set({type: "request"}).then(() => console.log("request sent"))
                        })
                        peer.on('connect', () => {
                            console.log("connected with id: " + peerId)
                        })
                        peers.set(indicatorId, peer)
                    }
                })
            })
        }


    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>RTC</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {isIndicator
                    ? <IonButton type={"button"} expand={"block"} onClick={handleButtonClick}>Submit</IonButton>
                    : <IonBadge>connection <IonIcon icon={checkmark}/></IonBadge>
                }
            </IonContent>
        </IonPage>
    );
};

export default RtcDemoPage;
