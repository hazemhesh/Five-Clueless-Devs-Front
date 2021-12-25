import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import TextField from '@mui/material/TextField';

import './SearchFlightCriteria.css';   // create one for users
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';

const signUp=()=>{
    const[user,setUser]=useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    homeAddress: '',
    countryCode: '',
    telephone: '',
    email: '',
    passportNumber: '',
});
// const onChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
// };
console.log("i am here");
const [errorEmail, setErrorEmail] = useState("");
const [errorFName, setErrorFName] = useState("");
const [errorLName, setErrorLName] = useState("");
const [errorHome, setErrorHome] = useState("");
const [errorCountry, setErrorCountry] = useState("");
const [errorTel, setErrorTel] = useState("");
const[errorPassNum,setErrorPassNum]=useState("");
const submitAction = (e) => {
    e.preventDefault();
    var goAhead = true;
    if (user.email == '') {
        setErrorEmail("this field is required");
        goAhead = false;
    } else {
        setErrorEmail("");
    }
    if (user.firstName == '') {
        setErrorFName("this field is required");
        goAhead = false;
    } else {
        setErrorFName("");
    }
    if (user.lastName == '') {
        setErrorLName("this field is required");
        goAhead = false;
    } else {
        setErrorLName("");
    }
    if (user.homeAddress == '') {
        setErrorHome("this field is required");
        goAhead = false;
    } else {
        setErrorHome("");
    }
    if (user.countryCode == '') {
        setErrorCountry("this field is required");
        goAhead = false;
    } else {
        setErrorCountry("");
    }
    if (user.countryCode == '') {
        setErrorCountry("this field is required");
        goAhead = false;
    } else {
        setErrorCountry("");
    }
    if (user.telephone== '') {
        setErrorTel("this field is required");
        goAhead = false;
    } else {
        setErrorTel("");
    }
    if (user.passportNumber== '') {
        setErrorPassNum("this field is required");
        goAhead = false;
    } else {
        setErrorPassNum("");
    }
     
// if(goAhead){

// }
    
};
return(
    <div>
      <Button variant="outlined" onClick={signUp}>Search</Button>
     </div>

);
}
export default signUp