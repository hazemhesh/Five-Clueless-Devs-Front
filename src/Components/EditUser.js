import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import TextField from '@mui/material/TextField';

import './SearchFlightCriteria.css';   // create one for users
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import UIButton from './UIButton/UIButton';
import LoadingPayment from './LoadingPayment/LoadingPayment';



const EditUser = () => {
    const history = useHistory();
    const [showConfirm, setConfirm] = useState(false);
    const [currentEmail,setCurrentEmail]=useState("");
    const toggleDialog = () => {
        setConfirm(!showConfirm);
    }
    const [user, setUser] = useState({
        userId: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        homeAddress: '',
        countryCode: '',
        telephone: '',
        email: '',
        passportNumber: '',
        isAdmin: '',
        reservations: ''
    });
    let { id } = useParams();
    

    const getUser = () => {
        console.log("Print id: " + { id });
        axios
            .get(BACKEND_URL + "users/search?_id=" + id,{
                headers:{
                  'Authorization': localStorage.getItem('token')
                }
              })
            .then(res => {
                console.log(res.data[0].email);
                setCurrentEmail(res.data[0].email)
                setUser(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
       
        e.preventDefault();
		setEmailError("")
        setUsernameError("")

        const isError=false
        //console.log("current email is :"+currentEmail)
        //console.log("email in text box "+user.email)
        if(user.email==""){
            setEmailError("Email cannot be left empty")
        }
        else
        if(!(user.email.includes("@")&&((user.email.includes(".com")||(user.email.includes(".edu.eg"))))))
            setEmailError("Email must be in the format anything@mail.com")
        else{
        axios
            .put(BACKEND_URL + 'users/update?_id=' + id, user, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(res => {
                //console.log(res)
                
                if(user.username==""){
                    setUsernameError("Username cannot be left empty")
                    isError=true;
                }
                if(user.email==""){
                    setEmailError("Email cannot be left empty")
                    isError=true
                }
                else{
                if((res.data=="updated succesfully"||(currentEmail==user.email))&&!isError){
                    console.log("no errors found")
                history.push('/user-details/' + user?._id);
                console.log(res.data);
                localStorage.setItem('user',JSON.stringify(user))
                //alert(res.data)
                }
                else{
                   
                    setEmailError("Email in use by another user") 
                }
            }
            
            })
            .catch(err => {
                console.log(err);
            })
        }
        
    };

    useEffect(() => {
        getUser();
    }, []);

    const [emailError,setEmailError]=useState("");
    const [usernameError,setUsernameError]=useState("");

    return (

        <div className="Edit User">
            <div className="container">
                <div className="row">

                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center" style={{ margin: "10px 0" }}>Edit User</h1>


                        <form noValidate onSubmit={onSubmit}>
                            {/* <div className='criteria-form-group'>
                                <div>
                                    <TextField
                                        disabled
                                        id="outlined"
                                        label="User ID"
                                        className='form-control'
                                        name="userId"
                                        value={user?._id}

                                    />
                                </div>
                            </div> */}


                            <div className='form-group'>
                                <div>
                                    <TextField
                                        className='form-control'
                                        label='User Name'
                                        name="username"
                                        value={user?.username}
                                        onChange={(e) => onChange(e)}
                                        error={usernameError !== ""}
					                    helperText= {usernameError}
                                    />


                                    {/* <TextField
                                        className='form-control'
                                        label='Password'
                                        type="password"
                                        name="password"
                                        value={user?.password}
                                        onChange={(e) => onChange(e)}
                                    /> */}

                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <TextField
                                        className='form-control'
                                        label='First Name'
                                        name="firstName"
                                        value={user?.firstName}
                                        onChange={(e) => onChange(e)}
                                    />


                                    <TextField
                                        className='form-control'
                                        label='Last Name'
                                        name="lastName"
                                        value={user?.lastName}
                                        onChange={(e) => onChange(e)}
                                    />

                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Home Address'
                                        name="homeAddress"
                                        value={user?.homeAddress}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Country Code'
                                        name="countryCode"
                                        value={user?.countryCode}
                                        onChange={(e) => onChange(e)}
                                    />


                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Telephone number(s)'
                                        name="telephone"
                                        value={user?.telephone}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Email Address'
                                        name="email"
                                        value={user?.email}
                                        onChange={(e) => onChange(e)}
                                        error={emailError !== ""}
					                    helperText= {emailError}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Passport Number'
                                        name="passportNumber"
                                        value={user?.passportNumber}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>



                            <div className='input-group-append'>
                                {/* <Button style={{ marginRight: "10px" }} variant="outlined">Back</Button> */}
                                <UIButton
                                    onClick={() => history.push('/passwordChange')}
                                    text={"change password"}
                                    margin="10px"
                                />

                                <div className='input-group-append'>
                                    <UIButton
                                        onClick={() => history.push('/user-details/' + JSON.parse(localStorage.getItem('user'))?._id)}
                                        text={"Back"}
                                        margin="10px"
                                    />
                                    <UIButton
                                        onClick={toggleDialog}
                                        text={"Edit User"}
                                        margin="10px"
                                        color={'green'}
                                    />
                                </div>
                                {/* <Button onClick={toggleDialog} variant="outlined" >Edit User</Button> */}

                            </div>
                            <div>

                                <Dialog
                                    open={showConfirm}
                                    onClose={toggleDialog}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <div style={{ margin: '0 0 10px 0' }} >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Are you sure you want to edit this user?"}
                                        </DialogTitle>
                                        <DialogActions>
                                            {/* <Button onClick={toggleDialog} variant="text">Cancel </Button> */}
                                            <UIButton
                                                text={"Cancel"}
                                                margin="0px 5px"
                                                color={'red'}
                                                onClick={toggleDialog}
                                            />
                                            {/* <Button onClick={onSubmit} variant="text" type="submit" color="success" >Confirm Edit</Button> */}
                                            <UIButton
                                                text={"Confirm Edit"}
                                                margin="0px 5px"
                                                onClick={onSubmit}
                                                color={'green'}
                                            />
                                        </DialogActions>
                                    </div>
                                </Dialog>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EditUser;
