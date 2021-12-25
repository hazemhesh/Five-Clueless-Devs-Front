import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import './CreateFlight.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import UIButton from './UIButton/UIButton';


class CreateUser extends Component {
    constructor() {
        super();
        this.state = {
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
            isAdmin: false,
            reservations: '',
            err: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            userId: this.state.userId,
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            homeAddress: this.state.homeAddress,
            countryCode: this.state.countryCode,
            telephone: this.state.telephone,
            email: this.state.email,
            passportNumber: this.state.passportNumber,
            isAdmin: this.state.isAdmin,
            reservations: this.state.reservations

        };

        axios
            .post(BACKEND_URL + 'users/createUser', data, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(res => {
                this.setState({
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
                    isAdmin: false,
                    reservations: ''
                })

            })
            .catch(err => {
                console.log(err);
                this.setState({ ['err']: 'error' })
            })
        console.log(data.userId);
        this.props.history.push('/user-details/' + data.userId);
    };

    render() {
        return (
            <div className="CreateBook">
                <div className="container">
                    <div className="row">

                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add User</h1>
                            <p className="lead text-center">
                                Create new user
                            </p>

                            <form noValidate onSubmit={this.onSubmit} >
                                <div className='form-group'>
                                    <div>
                                        <TextField
                                            id="outlined"
                                            label="User ID"
                                            className='form-control'
                                            name="userId"
                                            value={this.state.userId}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                </div>


                                <div className='form-group'>
                                    <div>

                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='User Name'
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChange}
                                        />

                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            type='password'
                                            label='Password'
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>



                                <div className='form-group'>
                                    <div>

                                        <TextField

                                            className='form-control'
                                            label='First Name'
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={this.onChange}
                                        />

                                        <TextField

                                            className='form-control'
                                            label='Last Name'
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.onChange}
                                        />

                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div>

                                        <TextField

                                            className='form-control'
                                            label='Home Address'
                                            name="homeAddress"
                                            value={this.state.homeAddress}
                                            onChange={this.onChange}
                                        />

                                        <TextField

                                            className='form-control'
                                            label='Country Code'
                                            name="countryCode"
                                            value={this.state.countryCode}
                                            onChange={this.onChange}
                                        />

                                    </div>
                                </div>

                                <div className='form-group'>
                                    <div>
                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Email'
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                        />

                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Telephone(s)'
                                            name="telephone"
                                            value={this.state.telephone}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Passport Number'
                                        name="passportNumber"
                                        value={this.state.passportNumber}
                                        onChange={this.onChange}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Reservations'
                                        name="reservations"
                                        value={this.state.reservations}
                                        onChange={this.onChange}
                                    />


                                </div>


                                {
                                    /* this.state.err ? <p>Cannot add user, Ensure userID is unique and all fields are filled</p> : null*/
                                }
                                <div className='button'>
                                    {/* <Button variant="outlined" type="submit">Submit</Button> */}
                                    <UIButton
                                        text={"Submit"}
                                        margin="0px"
                                        type={'submit'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUser;