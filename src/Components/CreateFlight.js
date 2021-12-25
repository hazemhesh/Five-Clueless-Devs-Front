import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import './CreateFlight.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import UIButton from './UIButton/UIButton';


class CreateFlight extends Component {
    constructor() {
        super();
        this.state = {
            flightId: '',
            from: '',
            to: '',
            departureDate: '',
            arrivalDate: '',
            departureTime: '',
            arrivalTime: '',
            availableEconomy: '',
            availableBusiness: '',
            availableFirst: '',
            arrivalTerminal: '',
            departureTerminal: '',
            baggageAllowance: '',
            price: '',
            seatsEconomy: [],
            seatsBusiness: [],
            seatsFirst: [],
            err: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        let seatsEconomy1 = [];
        let seatsBusiness1 = [];
        let seatsFirst1 = [];

        for (let i = 0; i < this.state.availableEconomy * 1; i++) {
            seatsEconomy1.push(null);
        }

        for (let i = 0; i < this.state.availableBusiness * 1; i++) {
            seatsBusiness1.push(null);
        }
        for (let i = 0; i < this.state.availableFirst * 1; i++) {
            seatsFirst1.push(null);
        }

        const data = {
            flightId: this.state.flightId,
            from: this.state.from,
            to: this.state.to,
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate,
            departureTime: this.state.departureTime,
            arrivalTime: this.state.arrivalTime,
            availableEconomy: this.state.availableEconomy,
            availableBusiness: this.state.availableBusiness,
            availableFirst: this.state.availableFirst,
            departureTerminal: this.state.departureTerminal,
            arrivalTerminal: this.state.arrivalTerminal,
            baggageAllowance: this.state.baggageAllowance,
            price: this.state.price,
            seatsEconomy: seatsEconomy1,
            seatsBusiness: seatsBusiness1,
            seatsFirst: seatsFirst1
        };

        axios
            .post(BACKEND_URL + 'flights/createFlight', data,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(res => {
                this.setState({
                    flightId: '',
                    from: '',
                    to: '',
                    departureDate: '',
                    arrivalDate: '',
                    departureTime: '',
                    arrivalTime: '',
                    availableEconomy: '',
                    availableBusiness: '',
                    availableFirst: '',
                    arrivalTerminal: '',
                    departureTerminal: '',
                    baggageAllowance: '',
                    seatsEconomy: [],
                    seatsBusiness: [],
                    seatsFirst: [],
                    price: ''
                })
                this.props.history.push('/search');
            })
            .catch(err => {
                console.log(err);
                this.setState({ ['err']: 'error' })
            })
    };

    render() {
        return (
            <div className="CreateBook">
                <div className="container">
                    <div className="row">

                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Flight</h1>
                            <p className="lead text-center">
                                Create new flight
                            </p>

                            <form noValidate onSubmit={this.onSubmit} >
                                <div className='form-group'>
                                    <div>
                                        <TextField
                                            id="outlined"
                                            label="Flight ID"
                                            className='form-control'
                                            name="flightId"
                                            value={this.state.flightId}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                </div>


                                <div className='form-group'>
                                    <div>

                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Origin Country'
                                            name="from"
                                            value={this.state.from}
                                            onChange={this.onChange}
                                        />

                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Destination Country'
                                            name="to"
                                            value={this.state.to}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>


                                <div className='form-group'>
                                    <div>
                                        <span className={this.state.departureDate === "" ? "hide" : ""}>
                                            <TextField
                                                id="outlined"
                                                type="date"
                                                className='form-control'
                                                label='Departure Date'
                                                name="departureDate"
                                                value={this.state.departureDate}
                                                onChange={this.onChange}
                                            />
                                        </span>
                                        <span className={this.state.arrivalDate === "" ? "hide" : ""}>
                                            <TextField
                                                type='date'
                                                className='form-control'
                                                label='Arrival Date'
                                                name="arrivalDate"
                                                value={this.state.arrivalDate}
                                                onChange={this.onChange}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div>
                                        <span className={`time ${this.state.departureTime === "" ? "hide" : ""}`}>
                                            <TextField
                                                type='time'
                                                className='form-control'
                                                label='Departure Time'
                                                name="departureTime"
                                                value={this.state.departureTime}
                                                onChange={this.onChange}
                                            />
                                        </span>
                                        <span className={`criteria-time ${this.state.arrivalTime === "" ? "criteria-hide" : ""}`}>
                                            <TextField
                                                type='time'
                                                className='form-control'
                                                label='Arrival Time'
                                                name="arrivalTime"
                                                value={this.state.arrivalTime}
                                                onChange={this.onChange}
                                            />
                                        </span>
                                    </div>
                                </div>

                                <div className='form-group'>
                                    <div>
                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Departure Terminal'
                                            name="departureTerminal"
                                            value={this.state.departureTerminal}
                                            onChange={this.onChange}
                                        />

                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Arrival Terminal'
                                            name="arrivalTerminal"
                                            value={this.state.arrivalTerminal}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Economy Seats'
                                            name="availableEconomy"
                                            value={this.state.availableEconomy}
                                            onChange={this.onChange}
                                        />

                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Business Seats'
                                            name="availableBusiness"
                                            value={this.state.availableBusiness}
                                            onChange={this.onChange}
                                        />

                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='First Class Seats'
                                            name="availableFirst"
                                            value={this.state.availableFirst}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Baggage Allowance'
                                            name="baggageAllowance"
                                            value={this.state.baggageAllowance}
                                            onChange={this.onChange}
                                        />
                                        <TextField
                                            id="outlined"
                                            className='form-control'
                                            label='Price'
                                            name="price"
                                            value={this.state.price}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>


                                {
                                    this.state.err ? <p>Cannot add flight, Ensure FlightID is unique and all fields are filled</p> : null
                                }
                                <div className='button'>
                                    {/* <Button variant="outlined" type="submit">Submit</Button> */}
                                    <UIButton
                                        text={"Submit"}
                                        margin="0px"
                                        type = "submit"
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

export default CreateFlight;