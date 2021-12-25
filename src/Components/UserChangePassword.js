import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import TextField from '@mui/material/TextField';

import './SearchFlightCriteria.css';   // create one for users
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';
import UIButton from './UIButton/UIButton';

const ChangePassword = () => {
    // const[passwordS,setPassword]=useState({
    //     password:'',
    //     oldPassword: '',
    //     confirmPassword: '',
    // })
    // let pass;

    useEffect(() => {
    }, []);


    const [success, setSuccess] = useState(false);
    let ready = false;
    const history = useHistory();
    const [oldpass, setOldpass] = useState('')
    const [newpass, setNewpass] = useState('')
    const [confirmpass, setConfpass] = useState('')
    const [submitready, setSubmit] = useState({
        oldpassword: '',
        Newpassword: '',
        email: '',
    })
    let Uid = JSON.parse(localStorage.getItem('user'))?.email;
    // const getOldPass=()=>{
    //     console.log("Print id: " + { id });
    //     axios
    //         .get(BACKEND_URL + "users/search?_id=" + Uid)
    //         .then(res => {
    //            // let temp=res.data[0].password;
    //             pass=res.data[0].password;
    //             console.log(pass);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    const onChange = (e) => {
        console.log("i am here");
        if (e.target.name == "oldPassword") {
            setOldpass(e.target.value);
            console.log(oldpass);
        }
        if (e.target.name == "NewPassword") {
            setNewpass(e.target.value);
            console.log(newpass);
        }
        if (e.target.name == "confirmpassword") {
            setConfpass(e.target.value)
            console.log(confirmpass)
        }

    }
    const [passincorrect, setPassincorrect] = useState("");
    const [passmissmatch, setPassmissmatch] = useState("");
    const [oldempty, setoldempty] = useState("");
    const [newempty, setnewempty] = useState("");
    const [conempty, setconempty] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        setoldempty("");
        setnewempty("");
        setconempty("");

        if (oldpass == '') {
            setoldempty("this field can not be empty");
        }
        if (newpass == '') {
            setnewempty("this field can not be empty");
        }
        if (confirmpass == '') {
            setconempty("this field can not be empty");
        }
        if (oldpass != '' && newpass != '' && confirmpass != '') {
            if (newpass == confirmpass) {
                ready = true;
                setSubmit({ oldpassword: oldpass, Newpassword: newpass, email: Uid })
                setnewempty("");
                setconempty("");
                setoldempty("");

            }
            else {
                setnewempty(true);
                setconempty("Passwords do not match!");

            }
            //setPassmissmatch("the new password should be the same ");
        }
        if (ready) {
            let data = { oldpassword: oldpass, Newpassword: newpass, email: Uid };
            setoldempty("");
            axios
                .put(BACKEND_URL + "users/changePass", data, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res.data);
                    if (res.data.message == "Invalid Password") {
                        setoldempty("old password is inCorrect");
                    }
                    else {
                        //alert('password was changed successfully')
                        setSuccess(true);
                        // history.push(`/`);
                    }
                })
                .catch(err => {
                    //setPassincorrect("the old password is inCorrect");
                    console.log(err);
                })

        }
    }




    return (
        <div className="update Flight">
            <div className="container">
                <div className="row">

                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center" style={{ margin: "10px 0" }}>Change Password</h1>


                        <form noValidate onSubmit={onSubmit}>

                            <div className='criteria-form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        label="Old Password"
                                        className='form-control'
                                        name="oldPassword"
                                        type="password"
                                        value={oldpass}
                                        onChange={(e) => onChange(e)}
                                        error={oldempty !== ""}
                                        helperText={oldempty}
                                    />
                                    <br />
                                </div>
                            </div>


                            <div className='criteria-form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='New Password'
                                        name="NewPassword"
                                        type="password"
                                        value={newpass}
                                        onChange={(e) => onChange(e)}
                                        error={newempty !== ""}
                                        helperText={newempty}
                                    />
                                    <br />
                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Confirm Password'
                                        name="confirmpassword"
                                        type="password"
                                        value={confirmpass}
                                        onChange={(e) => onChange(e)}
                                        error={conempty !== ""}
                                        helperText={conempty}
                                    />
                                    <br />
                                </div>
                            </div>

                            {success && <p style={{ color: 'green' }}>Password updated Successfully</p>}
                            <div className='input-group-append'>
                                {/* <Button variant="outlined" type="submit">Update Password</Button> */}

                                <UIButton
                                    onClick={() => history.goBack()}
                                    text={"Back"}
                                    margin="10px"
                                />

                                {success ?
                                    <UIButton
                                        onClick={() => history.push('/')}
                                        text={"Home"}
                                        margin="10px"
                                    /> :

                                    <UIButton
                                        type={"submit"}
                                        text={"update Password"}
                                        color={'green'}
                                        margin="10px"
                                    />}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ChangePassword;