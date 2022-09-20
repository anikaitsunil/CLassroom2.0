import React from "react";
import { v1 as uuid } from "uuid";
//import { useState } from "react";
//import '../routes/CreateRoom.css';
import GoogleButton from 'react-google-button'
import {useHistory} from 'react-router-dom';
//import React from "react";
import fire from "../fire";
import Login from "./Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState,useEffect } from "react";
//import CreateRoom from "./CreateRoom";
import Room from "./Room";
import Hero from "./Hero";
import '../routes/authentication.css';


const CreateRoom = (props) => {
    const [Pass,setPass] = useState("")
    const history = useHistory();
    const [user,setUser] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [hasAccount,setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email,password)
            /*.then(() =>{
                return(
                    <Hero />
                )
            })*/
                

            /*.then((user) => {
                if (user) {
                    {const id = uuid();
                        props.history.push(`/room/${id}`);
                     }
                }
              })*/
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleSignup = () => {
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-aldready-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleLogout = () => {
        fire.auth().signOut();
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    function create() {
        console.log(Pass)
        if(password.length >=6)
        {const id = uuid();
           props.history.push(`/room/${id}`);
        }
        else
        {
            alert("password badly formatted")
        }
        
    }

    function cli() {
        handleSignup();
        create();
    }

    function clic() {
        handleLogin();
        authListener();
        create();
    }

    return (
        <>
        {handleLogout()}
        <div className="contain">
        <section className="login">
        <h1 className="classroom">Classroom 2.0</h1>
            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {   hasAccount ? (
                        <>
                        <button onClick={clic}>Sign In and Create Room</button>
                        <p className="para">Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick={cli}>Sign Up and Create Room</button>
                        <p className="para">Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
                        </>
                    )

                    }

                </div>
            </div>
        </section>
        

        <div className="Fire">
            {
                user ? (
                    <Room />
                ) : (
                    <Login handleLogout={handleLogout}/>
                    )
            }
        </div>
        </div>
        </>
    );
};

export default CreateRoom;
