import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import DepartureFlightCard from './DepartureFlightCard';
import ReturnFlightCard from './ReturnFlightCard';
import TextField from '@mui/material/TextField';
import './SearchFlightUser.css';
import { Button, FormControl, InputLabel, Select, MenuItem, Autocomplete, Stepper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Itinerary from './Itinerary';
import Summary from './Summary';
import FlightSeats from './FlightSeats/FlightSeats';
import { set } from 'mongoose';
import { useHistory } from "react-router";
import "./Itinerary.css";
import { useLocation } from "react-router-dom";
import RetFlightCardEdit from './RetFlightCardEdit';
import ResUpdateSummary from './ResUpdateSummary';
import UpdateSeats from './UpdateSeats/UpdateSeats';
import ItineraryUpdate from './ItineraryUpdate';
import UIButton from './UIButton/UIButton';



const RetUpdateReservation = props => {
    const location = useLocation();
    const history = useHistory();
    // useState hooks for input and language

    const departureFlight = location.state.departFlight;
    const retFlight = location.state.returnFlight;
    const departureFrom = location.state.departureFrom;
    const departureTo = location.state.departureTo;
    const departFlight = location.state.departFlight;
    const seatCount = location.state.seatNum;
    const cabin = location.state.cabin;
    const reservationID = location.state.reservationId
    const cabinReturn = location.state.cabinReturn;
    const cabinDeparture = location.state.cabinDeparture;
    const chosenFromSeat = location.state.chosenFromSeat

    //const numSeats = location.state.numberOfFromSeats; //add got seats here
    const numSeats = 1;
    const moment = require('moment')
    const getDuration = (flight) => {
        console.log('----duraton----')
        console.log(flight);
        let depDate = moment(flight?.departureDate?.substring(0, 10) + "T" + flight?.departureTime + ":00");
        let arrDate = moment(flight?.arrivalDate?.substring(0, 10) + "T" + flight?.arrivalTime + ":00");
        let durationInMins = arrDate.diff(depDate, 'minutes');
        let durHours = Math.floor(durationInMins / 60);
        durationInMins = durationInMins - 60 * durHours;
        return `${durHours} hours and ${durationInMins} minutes`;
    }

    const steps = [
        'Search & Update Return Flight',
        'View Summary',
        'Select Seats',
        'View Your Itinerary',

    ];
    const [returnFlight, setReturnFlight] = useState({
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
        price: '',
        baggageAllowance: '',
        seatsEconomy: '',
        seatsBusiness: '',
        seatsFirst: '',
        duration: ''
    });
    //passing info to other components for summary
    const [selectedDeptFlight, setSelectedDeptFlight] = useState("");
    const [selectedDeptFlightId, setDeptSelectedId] = useState(0);
    const [deptFlightDeptDate, setDeptDeptDate] = useState("");
    const [deptFlightArrivalDate, setDeptArrivalDate] = useState("");
    const [deptFlightFrom, setDeptFlightFrom] = useState("");
    const [deptFlightTo, setDeptFlightTo] = useState("");
    const [deptFlightDuration, setDeptFlightDuration] = useState("");
    const [deptFlightDeptTime, setDeptFlightDeptTime] = useState("");
    const [deptFlightArrivalTime, setDeptFlightArrivalTime] = useState("");
    const [deptFlightPrice, setDeptPrice] = useState(0);
    const [deptSeats, setDeptSeats] = useState([]);
    const [selectedRetFlight, setSelectedRetFlight] = useState("");
    const [selectedRetFlightId, setRetSelectedId] = useState(0);
    const [retFlightDeptDate, setRetDeptDate] = useState("");
    const [retFlightArrivalDate, setRetArrivalDate] = useState("");
    const [retFlightFrom, setRetFlightFrom] = useState("");
    const [retFlightTo, setRetFlightTo] = useState("");
    const [retFlightDuration, setRetFlightDuration] = useState("");
    const [retFlightDeptTime, setRetFlightDeptTime] = useState("");
    const [retFlightArrivalTime, setRetFlightArrivalTime] = useState("");
    const [retFlightPrice, setRetPrice] = useState(0);
    const [retSeats, setRetSeats] = useState([]);
    //info used in this component
    const [view, setView] = useState(1);
    const [chosenClass, setClass] = useState(cabinReturn.cabinReturn);
    const [returnDate, setReturnDate] = useState('');
    const [adultsNumber, setAdultNumber] = useState(1);
    const [childNumber, setChildNumber] = useState(0);
    const [allFlights, setAll] = useState([]);
    const [returnFlightRes, setReturnResult] = useState([]);
    const [flightRes, setResult] = useState([]);

    const [bookingNum, setBookingNum] = useState();
    const [priceToDisplayRet, setPriceToDisplayRet] = useState(0);
    const [flight, setFlight] = useState({
        flightId: '',
        from: retFlight.toObj.from,
        to: retFlight.toObj.to,
        departureDate: '',
        arrivalDate: '',
        departureTime: '',
        arrivalTime: '',
        availableEconomy: '',
        availableBusiness: '',
        availableFirst: '',
        arrivalTerminal: '',
        departureTerminal: '',
        price: '',
        baggageAllowance: '',
        seatsEconomy: '',
        seatsBusiness: '',
        seatsFirst: '',
        duration: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    //counter for itinerary
    const [forChosenSeats, setForChosenSeats] = useState(0);

    const [selectedSeats, setSelectedSeats] = useState([]);

    let saved = null;
    useEffect(() => {

        axios
            .get(BACKEND_URL + "flights/search?")
            .then(res => {
                console.log(res.data);

                console.log(flightRes);
                setAll(res.data);

            })
            .catch(err => {
                console.log(err);
            })

        // if(window.location.href.includes("Dep")){
        //     console.log("YES YES YES!!!")
        // }
        console.log(departFlight.fromObj.flightId);
        console.log(departureFrom);
        console.log(seatCount?.seatCount);
        console.log(retFlight);
        console.log(reservationID.reservationID);
    }, []);


    // const setSavedData = () => {
    //     setDeptFlightFrom(saved.deptFlightFrom);
    //     setDeptFlightTo(saved.deptFlightTo);
    //     setDeptFlightDeptTime(saved.deptFlightDeptTime);
    //     setDeptFlightArrivalTime(saved.deptFlightArrivalTime);
    //     setDeptDeptDate(saved.deptFlightDeptDate);
    //     setDeptArrivalDate(saved.deptFlightArrivalDate);

    //     setClass(saved.chosenClass);

    //     setDeptSelectedId(saved.selectedDeptFlightId);
    //     setDeptPrice(saved.deptFlightPrice);
    //     setRetPrice(saved.retFlightPrice);
    //     setRetFlightDeptTime(saved.retFlightDeptTime);
    //     setRetDeptDate(saved.retFlightDeptDate);
    //     setRetFlightArrivalTime(saved.retFlightArrivalTime);
    //     setRetArrivalDate(saved.retFlightArrivalDate);

    //     setRetSelectedId(saved.selectedRetFlightId);

    //     setAdultNumber(saved.adultsNumber);
    //     setChildNumber(saved.childNumber);

    // selectDept={selectDept}

    //     setSelectedDeptFlight(saved.selectedDeptFlight);
    //     setSelectedRetFlight(saved.selectedRetFlight);
    // }



    useEffect((e) => {
        setResult([]);
        setReturnResult([]);
    }, [adultsNumber, childNumber, chosenClass]);

    const onChooseReturnDate = (e) => {
        setReturnDate(e.target.value);

    }
    const onChooseClass = (e) => {
        setClass(e.target.value);

    }
    const onChooseAdult = (e) => {
        setAdultNumber(e.target.value);

    }
    const onChooseChild = (e) => {
        setChildNumber(e.target.value);
    }
    const handleChangeTo = (event, value) => {
        if (value == null) {
            setFlight({ ...flight, to: "" });
        }
        else {
            setFlight({ ...flight, to: value });
        }
    }
    const handleChangeFrom = (event, value) => {
        if (value == null) {
            setFlight({ ...flight, from: "" });
        }
        else {
            setFlight({ ...flight, from: value });
        }
    }
    const onChange = (e) => {
        setFlight({ ...flight, [e.target.name]: e.target.value });
        console.log(flight);

    };
    const selectDept = () => {
        if (view == 1) {
            setView(2);
        }
        else if (view == 2) {
            setView(3);
        }
        else {
            setView(4);
        }
        console.log(flight.flightId);
        console.log("helooo");
    }
    const editDept = () => {
        setView(1);
        setReturnResult([]);
    }
    const editRet = () => {
        setView(2);
    }


    const showAll = (e) => {
        e.preventDefault();
        axios
            .get(BACKEND_URL + "flights/searchUser?")
            .then(res => {
                console.log(res.data);
                setResult(res.data);
                console.log(flightRes);

            })
            .catch(err => {
                console.log(err);
            })
        //clearAll(e);
    };


    const [errorSame, setErrorSame] = useState("");
    const [errorDate, setErrorDate] = useState("");
    // function for handling form submit
    const submitAction = (e) => {
        e.preventDefault();
        var goAhead = true;

        if (flight.departureDate && flight.departureDate < departureFlight.fromObj.departureDate) { //DON FORGET ERORR/
            // alert("Departure date cannot be later than return date")
            setErrorDate("Return date cannot be earlier than departure date")
            goAhead = false;
        } else {
            setErrorDate("")
        }

        if (goAhead) {
            console.log("This is the flight:")

            // returnFlight.to = flight.from;
            // returnFlight.from = flight.to;
            // returnFlight.departureDate = returnDate;
            // console.log(returnFlight);
            //////////// var passNumber = seatCount;
            var passNumber = seatCount?.seatCount;
            var numberAndClass = "";
            console.log(chosenClass);
            //flight.from = departureFrom;
            console.log(flight);
            const usp = new URLSearchParams(flight);
            const uspReturn = new URLSearchParams(returnFlight);
            let keysForDel = [];
            let keysForDel2 = [];
            let keysForDel3 = [];
            if (chosenClass == "Economy") {
                numberAndClass = "availableEconomy[gte]" + `=${passNumber}`;
                console.log("entered here");

            }
            else if (chosenClass == "Business") {
                numberAndClass = "availableBusiness[gte]" + `=${passNumber}`;

            }
            else if (chosenClass == "First") {
                numberAndClass = "availableFirst[gte]" + `=${passNumber}`;

            }
            usp.forEach((value, key) => {
                if (value === '') {
                    keysForDel.push(key);
                }
            });

            keysForDel.forEach(key => {
                usp.delete(key);
            });
            uspReturn.forEach((value, key) => {
                if (value === '') {
                    keysForDel2.push(key);
                }
            });

            keysForDel2.forEach(key => {
                uspReturn.delete(key);
            });
            console.log(flight);
            console.log(usp.toString());
            console.log(uspReturn.toString());
            // prevents default, so page won't reload on form submit

            e.preventDefault();
            axios
                .get(BACKEND_URL + "flights/searchUser?" + usp.toString() + "&" + numberAndClass)
                .then(res => {
                    if (!Array.isArray(res.data) || !res.data.length) {
                        setView(6);
                    }
                    else {
                        setView(1);
                        console.log(res.data);

                        res.data.forEach((flight, key) => {
                            console.log("I AM HERE")
                            console.log(cabin?.cabin);
                            if (flight.flightId == retFlight?.toObj?.flightId && chosenClass == cabinReturn?.cabinReturn) {
                                res.data.splice(res.data.indexOf(flight), 1);
                            }
                        });

                        setResult(res.data);
                        console.log(flightRes);
                    }

                })
                .catch(err => {
                    console.log(err);
                })
            //--------------------------------------------------------------------------------
            // axios
            //     .get(BACKEND_URL + "flights/searchUser?" + uspReturn.toString() + "&" + numberAndClass)
            //     .then(res => {
            //         if (!Array.isArray(res.data) || !res.data.length) {
            //             setView(6);
            //         }
            //         else {
            //             setView(1);
            //             console.log(res.data);
            //             setReturnResult(res.data);
            //             console.log(returnFlightRes);
            //         }

            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
        }

    };

    //SEARCHING AND SELECTING DEPARTURE FLIGHT------------------------------------------------------------------------------------------------------------------------------------------
    if (view == 1) {
        return (
            <>

                <div className="stepper-space"><Box sx={{ width: '100%' }}>
                    <Stepper activeStep={0} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box></div>
                <div className='bg-dark text-light'>
                    <div className='container pt-5' style={{ height: '100vh' }}>
                        <h1 className="display-4 text-center">Update Return Flight</h1>


                        <form onSubmit={submitAction} className='mt-5'>
                            <div className='input-group'>
                                <div className='criteria-form-group'>

                                    <div>


                                        <span className={returnDate === "" ? "criteria-hide" : ""}>
                                            <TextField
                                                //required
                                                id="dateInput"
                                                type='date'
                                                className='form-control'
                                                label='Return Date'
                                                name="returnDate"
                                                value={returnDate}
                                                onChange={(e) => onChooseReturnDate(e)}
                                                error={errorDate !== ""}
                                            />
                                        </span>

                                        <div>
                                            <FormControl sx={{ m: 1, minWidth: 120 }} >
                                                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="select"

                                                    value={chosenClass}
                                                    label="Class"
                                                    onChange={(e) => onChooseClass(e)}

                                                >

                                                    <MenuItem value={'Economy'} >Economy</MenuItem>
                                                    <MenuItem value={'Business'} >Business</MenuItem>
                                                    <MenuItem value={'First'} >First</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </div>


                                    </div>
                                    <div className='input-group-append'>
                                        {/* <Button variant="outlined" type="submit">Search</Button> */}
                                        <UIButton
                                            type={'submit'}
                                            text={"Search"}
                                            margin="10px"
                                        />
                                    </div>


                                    <div className="list">
                                        {flightRes.map((flight, k) =>
                                            <RetFlightCardEdit flight={flight} data={selectDept} numOfChildren={childNumber} numOfAdults={adultsNumber} chosenClass={chosenClass} key={k}
                                                passRetId={setRetSelectedId} passRetFrom={setRetFlightFrom} seatCount={seatCount?.seatCount}
                                                passRetTo={setRetFlightTo} passRetDuration={setRetFlightDuration} passRetFlightDeptTime={setRetFlightDeptTime}
                                                passRetFlightArrivalTime={setRetFlightArrivalTime} passRetFlightPrice={setRetPrice} passRetFlightDate={setRetDeptDate}
                                                passRetFlightArrivalDate={setRetArrivalDate} passSelectedRetFlight={setSelectedRetFlight} oldPrice={retFlight.toObj.price}
                                                oldCabin={cabinReturn.cabinReturn} passPriceToDisplayRet={setPriceToDisplayRet} />
                                        )}
                                    </div>



                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }


    else if (view == 2) {
        return (<>

            <div className="stepper-space"><Box sx={{ width: '100%' }}>
                <Stepper activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box></div>
            <div className="row" >
                <div className="column">
                    <p className="selected-depart">Selected Departure Flight:</p>



                    <Card sx={{ maxWidth: 500 }}>
                        <CardActionArea>


                            <CardContent>
                                <div className="left-container">

                                    <div className="left-image">
                                        <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                            alt="airplaneDepart"
                                            width="27px"
                                            height="27px"
                                        />
                                    </div>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {departFlight.fromObj.from} ({departFlight.fromObj.departureTime})
                                    </Typography>
                                    <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                        alt="arrow"
                                        width="40px"
                                        height="27px" />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {departFlight.fromObj.to} ({departFlight.fromObj.arrivalTime})
                                    </Typography>
                                </div>
                                <Typography variant="body2" color="text.secondary">
                                    Duration: {getDuration(departFlight.fromObj)}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <div className="column">
                    <p className="selected-return">Selected Return Flight:</p>
                    <Card sx={{ maxWidth: 500 }}>
                        <CardActionArea>


                            <CardContent>
                                <div className="middle-container">

                                    <div className="left-image">
                                        <img className="flip-image" src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                            alt="airplaneDepart"
                                            width="27px"
                                            height="27px"
                                        />
                                    </div>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {retFlightFrom} ({retFlightDeptTime})
                                    </Typography>
                                    <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                        alt="arrow"
                                        width="40px"
                                        height="27px" />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {retFlightTo} ({retFlightArrivalTime})
                                    </Typography>
                                </div>
                                <Typography variant="body2" color="text.secondary">
                                    Duration: {getDuration(selectedRetFlight)}
                                </Typography>
                                <Typography>
                                    <button className="editButton" type="button" onClick={editDept}>Edit</button>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <div className="column">
                    <p className="selected-return">Summary:</p>
                    <Card sx={{ maxWidth: 500 }}>
                        <CardActionArea>
                            <CardContent>
                                <div className="right-container">
                                    <div className="middle-container">
                                        <div className="left-image">
                                            <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                                alt="airplaneDepart"
                                                width="27px"
                                                height="27px"
                                            />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {departFlight.fromObj.from} ({departFlight.fromObj.departureTime})
                                        </Typography>
                                        <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                            alt="arrow"
                                            width="40px"
                                            height="27px" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {departFlight.fromObj.to} ({departFlight.fromObj.arrivalTime})
                                        </Typography>
                                    </div>

                                    <div className="middle-container">
                                        <div className="left-image">
                                            <img className="flip-image" src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                                alt="airplaneDepart"
                                                width="27px"
                                                height="27px"
                                            />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {retFlightFrom} ({retFlightDeptTime})
                                        </Typography>
                                        <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                            alt="arrow"
                                            width="40px"
                                            height="27px" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {retFlightTo} ({retFlightArrivalTime})
                                        </Typography>
                                    </div>

                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
            <div>
                <ResUpdateSummary
                    deptFrom={departFlight.fromObj.from}
                    deptTo={departFlight.fromObj.to}
                    deptFlightDeptTime={departFlight.fromObj.departureTime}
                    deptFlightArrivalTime={departFlight.fromObj.arrivalTime}
                    deptFlightDeptDate={departFlight.fromObj.departureDate}
                    deptFlightArrivalDate={departFlight.fromObj.arrivalDate}
                    chosenClass={chosenClass}
                    selectedDeptFlightId={departFlight.fromObj.flightId}
                    deptFlightPrice={0}
                    retFlightPrice={retFlightPrice - retFlight.toObj.price}
                    deptFlightPriceReal={departFlight.fromObj.price}
                    retFlightPriceReal={retFlightPrice}
                    retFlightDeptTime={retFlightDeptTime}
                    retFlightDeptDate={retFlightDeptDate}
                    retFlightArrivalTime={retFlightArrivalTime}
                    retFlightArrivalDate={retFlightArrivalDate}
                    retFlightId={selectedRetFlightId}
                    reservationId={reservationID.reservationID}
                    numOfAdults={adultsNumber}
                    numOfChildren={childNumber}
                    selectDept={selectDept}
                    newCabin={chosenClass}
                    oldCabin={cabinReturn.cabinReturn}
                    oldCabinDept={cabinDeparture.cabinDeparture}

                    seatCount={seatCount?.seatCount}

                    deptFlight={departFlight.fromObj}
                    retFlight={selectedRetFlight}
                    retFlightOld={retFlight.toObj}
                    setBookingNum={setBookingNum}
                    priceToDisplayRet={priceToDisplayRet}
                />
            </div>
        </>);
    }

    else if (view == 3) {
        return (
            <>
                <div className="stepper-space">
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={2} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>
                <div>
                    <UpdateSeats
                        flight={selectedRetFlight}
                        maxSeats={seatCount.seatCount}
                        setView={(num) => setView(num)}
                        cabin={chosenClass}
                        setFlightSeats={setRetSeats}
                        type={"Arrival"}
                    />
                </div>
            </>
        )
    }//SEATS FUNC HERE
    //VIEWING SUMMARY -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if (view == 4) {

        return (
            <>

                <div className="stepper-space"><Box sx={{ width: '100%' }}>
                    <Stepper activeStep={3} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box></div>
                <div className="row" >
                    <div className="column">
                        <p className="selected-depart">Selected Departure Flight:</p>



                        <Card sx={{ maxWidth: 500 }}>
                            <CardActionArea>


                                <CardContent>
                                    <div className="left-container">

                                        <div className="left-image">
                                            <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                                alt="airplaneDepart"
                                                width="27px"
                                                height="27px"
                                            />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {departFlight.fromObj.from} ({departFlight.fromObj.departureTime})
                                        </Typography>
                                        <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                            alt="arrow"
                                            width="40px"
                                            height="27px" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {departFlight.fromObj.to} ({departFlight.fromObj.arrivalTime})
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        Duration: {getDuration(departFlight.fromObj)}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                    <div className="column">
                        <p className="selected-return">Selected Return Flight:</p>
                        <Card sx={{ maxWidth: 500 }}>
                            <CardActionArea>


                                <CardContent>
                                    <div className="middle-container">

                                        <div className="left-image">
                                            <img className="flip-image" src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                                alt="airplaneDepart"
                                                width="27px"
                                                height="27px"
                                            />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {retFlightFrom} ({retFlightDeptTime})
                                        </Typography>
                                        <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                            alt="arrow"
                                            width="40px"
                                            height="27px" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {retFlightTo} ({retFlightArrivalTime})
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        Duration: {getDuration(selectedRetFlight)}
                                    </Typography>
                                    <Typography>
                                        <button className="editButton" type="button" onClick={editDept}>Edit</button>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                    <div className="column">
                        <p className="selected-return">Summary:</p>
                        <Card sx={{ maxWidth: 500 }}>
                            <CardActionArea>
                                <CardContent>
                                    <div className="right-container">
                                        <div className="middle-container">
                                            <div className="left-image">
                                                <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                                    alt="airplaneDepart"
                                                    width="27px"
                                                    height="27px"
                                                />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {departFlight.fromObj.from} ({departFlight.fromObj.departureTime})
                                            </Typography>
                                            <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                                alt="arrow"
                                                width="40px"
                                                height="27px" />
                                            <Typography gutterBottom variant="h5" component="div">
                                                {departFlight.fromObj.to} ({departFlight.fromObj.arrivalTime})
                                            </Typography>
                                        </div>

                                        <div className="middle-container">
                                            <div className="left-image">
                                                <img className="flip-image" src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                                    alt="airplaneDepart"
                                                    width="27px"
                                                    height="27px"
                                                />
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {retFlightFrom} ({retFlightDeptTime})
                                            </Typography>
                                            <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                                alt="arrow"
                                                width="40px"
                                                height="27px" />
                                            <Typography gutterBottom variant="h5" component="div">
                                                {retFlightTo} ({retFlightArrivalTime})
                                            </Typography>
                                        </div>

                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>
                <div><ItineraryUpdate
                    deptFrom={departFlight.fromObj.from}
                    deptTo={departFlight.fromObj.to}
                    deptFlightDeptTime={departFlight.fromObj.departureTime}
                    deptFlightArrivalTime={departFlight.fromObj.arrivalTime}
                    deptFlightDeptDate={departFlight.fromObj.departureDate}
                    deptFlightArrivalDate={departFlight.fromObj.arrivalDate}
                    chosenClass={chosenClass}
                    selectedDeptFlightId={departFlight.fromObj.flightId}
                    deptFlightPrice={deptFlightPrice}
                    retFlightPrice={retFlightPrice}
                    retFlightDeptTime={retFlightDeptTime}
                    retFlightDeptDate={retFlightDeptDate}
                    retFlightArrivalTime={retFlightArrivalTime}
                    retFlightArrivalDate={retFlightArrivalDate}
                    retFlightId={selectedRetFlightId}
                    numOfAdults={adultsNumber}
                    numOfChildren={childNumber}
                    deptSeats={chosenFromSeat?.chosenFromSeat}
                    retSeats={retSeats}
                    bookingNum={bookingNum}
                    oldCabinDept={cabinDeparture.cabinDeparture}

                />
                    <div><button className="confirm-res" style={{ marginBottom: "20px" }} onClick={(e) => history.push('/Reserved-flights')}>View Reservations</button></div>

                </div>









            </>
        );

    }
    else {
        return (
            <>

                <div className="stepper-space"><Box sx={{ width: '100%' }}>
                    <Stepper activeStep={0} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box></div>
                <div className='bg-dark text-light'>
                    <div className='container pt-5' style={{ height: '100vh' }}>
                        <h1 className="display-4 text-center">Update Return Flight</h1>


                        <form onSubmit={submitAction} className='mt-5'>
                            <div className='input-group'>
                                <div className='criteria-form-group'>

                                    <div>


                                        <span className={returnDate === "" ? "criteria-hide" : ""}>
                                            <TextField
                                                //required
                                                id="dateInput"
                                                type='date'
                                                className='form-control'
                                                label='Return Date'
                                                name="returnDate"
                                                value={returnDate}
                                                onChange={(e) => onChooseReturnDate(e)}
                                                error={errorDate !== ""}
                                            />
                                        </span>
                                        <div>
                                            <FormControl sx={{ m: 1, minWidth: 120 }} >
                                                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="select"

                                                    value={chosenClass}
                                                    label="Class"
                                                    onChange={(e) => onChooseClass(e)}

                                                >

                                                    <MenuItem value={'Economy'} >Economy</MenuItem>
                                                    <MenuItem value={'Business'} >Business</MenuItem>
                                                    <MenuItem value={'First'} >First</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </div>


                                    </div>
                                    <div className='input-group-append'>
                                        {/* <Button variant="outlined" type="submit">Search</Button> */}
                                        <UIButton
                                            type={'submit'}
                                            text={"Search"}
                                            margin="10px"
                                        />

                                    </div>


                                    <div className="no-search"> <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-search-airport-kiranshastry-gradient-kiranshastry.png" />
                                        <h1>Sorry, No Results Found</h1></div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }


}


export default RetUpdateReservation;