import SimplePeer from "simple-peer";

export function initializeMasterPeer(){
    const peer = new SimplePeer({initiator: true});

    return peer;
}

export function initializeSlavePeer(master: string){

}
