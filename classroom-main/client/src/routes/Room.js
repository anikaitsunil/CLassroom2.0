import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { ReactDOM } from "react";
import TabSwitch from "./TabFocus";
import './room.css';
import Hero from '../routes/Hero';
import { Link } from "react-router-dom";

import fire from "../fire.js";

const Container = styled.div`
    padding: 40px;
    display:flex;
    height: 100vh;
    width: 100%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 30%;
    width: 30%;
    border: 1px solid;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 5px;
`;

const StyledVideo2 = styled.video`
    height: 40%;
    width: 100%;
    border: 1px solid;
`;





const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);
    return (
        <StyledVideo playsInline autoPlay ref={ref} />

    );
    this.props.muted ="true";
}



const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;
    const [tabHasFocus, setTabHasFocus] = useState(true);

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream,tabHasFocus);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })


            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function bench_connect(incomingSignal,callerID,stream)
    {

    }

    /*const handleLogout = () => {
        fire.auth().signOut();
    };*/

  
    

    return (
        <Container className="room">
            <div className="logbox">
            <Link to="/" className="log"><button className="logout">Logout</button></Link>
            </div>
            <StyledVideo2 muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                var n=index;
                return (

                    <><Video key={index} peer={peer} />
                    <div className="index"><h2>{index}</h2></div>
                    <TabSwitch></TabSwitch>
                    <div className="connection">
                    {n%2!=0?(
                        <><h2 className="bench_connect">{n-1} and {n} are connected</h2>
                        <div className="but">
                <button onClick={()=>{window.open('https://classroompeer.netlify.app','_blank', 'noopener,noreferrer');}}>Get into Voice Channel</button>
            </div>
                        </>)
                    :(<h2></h2>)}
                    </div>
                    </>
                );
            })}
        </Container>
    );
};

export default Room;
