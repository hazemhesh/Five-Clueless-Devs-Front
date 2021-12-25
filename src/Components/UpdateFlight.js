import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './SearchFlightCriteria.css';
import UIButton from './UIButton/UIButton';


const UpdateFlight = () => {
    const history = useHistory();

    const [flight, setFlight] = useState({
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
        seatsEconomy: [],
        seatsBusiness: [],
        seatsFirst: []
    });
    let { id } = useParams();


    const getFlight = () => {
        console.log("Print id: " + { id });
        axios
            .get(BACKEND_URL + "flights/search?flightId=" + id)
            .then(res => {
                console.log(res.data);
                setFlight(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onChange = (e) => {
        if (e.target.name == 'availableEconomy') {
            let tmp = flight.seatsEconomy;
            let i = e.target.value * 1 - flight.availableEconomy;
            while (i > 0) {
                tmp.push(null);
                i--;
            }
            setFlight({ ...flight, seatsEconomy: tmp })
        }
        else if (e.target.name == 'availableFirst') {
            let tmp = flight.seatsFirst;
            let i = e.target.value * 1 - flight.availableFirst;
            while (i > 0) {
                tmp.push(null);
                i--;
            }
            setFlight({ ...flight, seatsFirst: tmp })
        }
        else if (e.target.name == 'availableBusiness') {
            let tmp = flight.seatsBusiness;
            let i = e.target.value * 1 - flight.availableBusiness;
            while (i > 0) {
                tmp.push(null);
                i--;
            }
            setFlight({ ...flight, seatsBusiness: tmp })
        }
        setFlight({ ...flight, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .put(BACKEND_URL + 'flights/update?flightId=' + id, flight,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res.data);
                history.push('/search');
            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        getFlight();
    }, []);


    return (
        <div className="update Flight">
            <div className="container">
                <div className="row">

                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center" style={{ margin: "10px 0" }}>Update Flight</h1>


                        <form noValidate onSubmit={onSubmit}>
                            <div className='criteria-form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        label="Flight ID"
                                        className='form-control'
                                        name="flightId"
                                        value={flight.flightId}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>


                            <div className='criteria-form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Origin Country'
                                        name="from"
                                        value={flight.from}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Destination Country'
                                        name="to"
                                        value={flight.to}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>


                            <div className='criteria-form-group'>
                                <div>
                                    <span className={flight.departureDate === "" ? "criteria-hide" : ""}>
                                        <TextField
                                            id="outlined"
                                            type="date"
                                            className='form-control'
                                            label='Departure Date'
                                            name="departureDate"
                                            value={flight.departureDate.substring(0, 10)}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </span>


                                    <span className={flight.arrivalDate === "" ? "criteria-hide" : ""}>
                                        <TextField
                                            type='date'
                                            className='form-control'
                                            label='Arrival Date'
                                            name="arrivalDate"
                                            value={flight.arrivalDate.substring(0, 10)}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <span className={`criteria-time ${flight.departureTime === "" ? "criteria-hide" : ""}`}>
                                        <TextField
                                            type='time'
                                            className='form-control'
                                            label='Departure Time'
                                            name="departureTime"
                                            value={flight.departureTime}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </span>



                                    <span className={`criteria-time ${flight.arrivalTime === "" ? "criteria-hide" : ""}`}>
                                        <TextField
                                            type='time'
                                            className='form-control'
                                            label='Arrival Time'
                                            name="arrivalTime"
                                            value={flight.arrivalTime}
                                            onChange={(e) => onChange(e)}
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
                                        value={flight.departureTerminal}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Arrival Terminal '
                                        name="arrivalTerminal"
                                        value={flight.arrivalTerminal}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Economy Seats'
                                        name="availableEconomy"
                                        value={flight.availableEconomy}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Business Seats'
                                        name="availableBusiness"
                                        value={flight.availableBusiness}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='First Class Seats'
                                        name="availableFirst"
                                        value={flight.availableFirst}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>



                            <div className='input-group-append'>
                                {/* <Button variant="outlined" type="submit">Update Flight</Button> */}

                                <UIButton
                                    type={'submit'}
                                    text={"Update Flight"}
                                    margin="10px"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateFlight;
