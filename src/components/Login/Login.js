import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useContext } from 'react';
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);

function Login() {
  const [user,setUser] = useState({
    isSignedIn: false,
    email: '',
    password: '',
    name: '',
    error: '',
    success: false
  });

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);  
  
  const [newUser,setNewUser] = useState(false);

  const handleCheckBox = () => {
    setNewUser(!newUser) 
  }

  

  const handleSubmit = (e) => {
    console.log(user.email,user.password)
    if ( newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(response => {
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage)
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        console.log(res.user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage)
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
   e.preventDefault()
  }


  const handleChange = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /^\S+@\S+\.\S+$/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const validPassword = e.target.value.length > 6;
      const validPasswordNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = (validPassword && validPasswordNumber)
    }
    if (isFieldValid) {
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  
  const updateUserName = name => {
    var user = firebase.auth().currentUser;
    user.updateProfile({displayName: name,})
    .then(function() {
  // Update successful.
    })
    .catch(function(error) {
  // An error Login.
    });
  } 


  return (
    <div>
      <input onChange={handleCheckBox} type="checkbox" name="newUser" id=""/>
      <label htmlFor="newUser">sign-up</label>
      <form onSubmit ={handleSubmit}>
        {newUser && <input type="text" onBlur={handleChange} name="name" placeholder="Your Name"  id=""/>}
        <br/>
        <input  type="text" onBlur={handleChange} name="email" id="" placeholder="Email Address" required/>
        <br/>
        <input type="password" onBlur={handleChange}  name="password" id="" placeholder="type your password" required/>
        <br/> 
        <input type="submit" value={newUser ? "sign up" : "sign in" }/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>User {newUser ? "Created" : "logged In"} Successfully</p>
      }

    </div>
  );
}

export default Login;
