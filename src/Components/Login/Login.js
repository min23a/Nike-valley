import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { dataContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import './Login.css';
import { Redirect,} from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const { users,local } = useContext(dataContext);
    const [user, setUser] = users;
    const [Locate] = local;
    console.log(Locate);

    const { register, errors } = useForm();
    const [log, setLog] = useState({
        hasAccount: false
    })
    const Gprovider = new firebase.auth.GoogleAuthProvider();
//validates that user has account or not
    const handleAccountAuth = () => {
        const newLog = { ...log };
        newLog.hasAccount = true;
        setLog(newLog);
    }

    const handleAccountCreation = () => {
        const newLog = { ...log };
        newLog.hasAccount = false;
        setLog(newLog);
    }
    //handle Changes in input value when blur and validates;
    const handleChange = (e) => {
        if(e.target.name === 'displayName'){
            const isNameValid = e.target.value.length > 0;
            if(!isNameValid){
                 document.getElementById("msg").innerText = 'Name can not be Empty'
            }
        }
        if (e.target.name === 'confirmPassword') {
             const isItValid = e.target.value;
             const password = document.getElementById("password").value;
             if(isItValid !== password){
                document.getElementById("msg").innerText = "Password doesn't Match";
            }
        } 
        if (e.target.name === 'password') {
             const isPasswordValid = /\d{1}/.test(e.target.value);
             if(!isPasswordValid){
                document.getElementById("msg").innerText = 'Password must have a number';
            }
        }
        if (e.target.name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            if(!isEmailValid){
                document.getElementById("msg").innerText = 'Invalid Email';
            }
        }
        if (e.target.value) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            newUser.hasValue = true;
            setUser(newUser);
        }
    }
    //account creating part
    const handleAccountCreate = (e) => {
        if (e.target.id === 'google') {
            firebase.auth()
                .signInWithPopup(Gprovider)
                .then((res) => {
                    const newUser = res.user;
                    newUser.isSignedIn = true;
                    setUser(newUser);
                }).catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage)
                });
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUser = res.user;
                    newUser.isSignedIn = true;
                    newUser.name = document.getElementById('name').value
                    setUser(newUser);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    document.getElementById("msg").innerText = errorMessage;
                });
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    const name = users[0].displayName;
                    user.updateProfile({
                        displayName: name
                    }).then(function () {
                    }, function (error) {
                        // An error happened.
                    });
                } else {
                }
            });
        }
        e.preventDefault();
    }
    const handleLogin = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                const newUser = res.user;
                newUser.isSignedIn = true;
                setUser(newUser);
            })
            .catch((error) => {
                var errorMessage = error.message;
                document.getElementById("msg").innerText = errorMessage;
            });
        e.preventDefault();
    }
    return (
        <div className=" d-flex justify-content-center">
            <div className="bg-success p-3">
                {!log.hasAccount &&
                    <form className="form">
                        <div id="msg"></div>
                        <input id="name" type="text" onBlur={handleChange} style={{ width: '100%' }} placeholder="Name..." name="displayName" ref={register({ required: true })} /><br />
                        {errors.name && "This field is required"}
                        <input type="email" onBlur={handleChange} style={{ width: '100%' }} placeholder="Email..." name="email" ref={register({ required: true })} /><br />
                        {errors.email && "This field is required"}
                        <input id="password" type="password" onBlur={handleChange} style={{ width: '100%' }} placeholder="Password..." name="password" ref={register({ required: true })} /><br />
                        {errors.password && "This field is required"}
                        <input type="password" onBlur={handleChange} style={{ width: '100%' }} placeholder="Confirm password..." name="confirmPassword" ref={register({ required: true })} /><br />
                        {errors.confirmPassword && "This field is required"}
                        <input className="search" onClick={handleAccountCreate} type="submit" value="Create Account" /><br />
                        <p className="text-white pt-3">Already Have a Account. <span onClick={handleAccountAuth}>Log in ?</span></p>
                    </form>
                }
                {log.hasAccount &&
                    <form className="form bg-success">
                        <div id="msg"></div>
                        <input type="email" onBlur={handleChange} style={{ width: '100%' }} placeholder="Email..." name="email" ref={register({ required: true })} /><br />
                        {errors.email && "This field is required"}
                        <input type="password" onBlur={handleChange} style={{ width: '100%' }} placeholder="Password..." name="password" ref={register({ required: true })} /><br />
                        {errors.password && "This field is required"}
                        <input onClick={handleLogin} className="search" type="submit" value="Log In" /><br />
                        <p className="text-white pt-3">New user ?  <span onClick={handleAccountCreation}>Create Account</span></p>
                    </form>
                }
                {user.isSignedIn &&
                    <Redirect to={Locate} />
                }
                <button className="form" onClick={handleAccountCreate} id="google">Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;