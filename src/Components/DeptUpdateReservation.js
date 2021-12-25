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
import DepartureFlightCardEdit from './DepartureFlightCardEdit';
import ResUpdateSummary from './ResUpdateSummary';
import UpdateSeats from './UpdateSeats/UpdateSeats';
import ItineraryUpdate from './ItineraryUpdate';
import UIButton from './UIButton/UIButton';



const DeptUpdateReservation = props => {
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
    const cabinDeparture = location.state.cabinDeparture;
    const chosenToSeat = location.state.chosenToSeat;
    const cabinReturn = location.state.cabinReturn;

    console.log("seatCount " + seatCount.seatCount);


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
        'Search & Update Departure Flight',
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
    const [chosenClass, setClass] = useState(cabinDeparture.cabinDeparture);
    const [returnDate, setReturnDate] = useState('');
    const [adultsNumber, setAdultNumber] = useState(1);
    const [childNumber, setChildNumber] = useState(0);
    const [allFlights, setAll] = useState([]);
    const [returnFlightRes, setReturnResult] = useState([]);
    const [flightRes, setResult] = useState([]);

    const [bookingNum, setBookingNum] = useState();
    const [priceToDisplay, setPriceToDisplay] = useState(0);
    const [flight, setFlight] = useState({
        flightId: '',
        from: departureFrom.departureFromCountry,
        to: departureTo.departureToCountry,
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

        console.log(departFlight.fromObj.price);
        console.log(departureFrom);
        console.log(seatCount?.seatCount);
        console.log(retFlight);
        console.log(cabin.cabin);
        console.log(chosenToSeat.chosenToSeat)
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

        if (flight.departureDate && flight.departureDate > retFlight.toObj.departureDate) {
            // alert("Departure date cannot be later than return date")
            setErrorDate("Departure date cannot be later than return date")
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
                            if (flight.flightId == departureFlight?.fromObj?.flightId && chosenClass == cabinDeparture?.cabinDeparture) {
                                res.data.splice(res.data.indexOf(flight), 1);
                            }
                        });
                        console.log(keysForDel3);
                        // keysForDel3.forEach(key => {
                        //     res.data.(key);
                        // });
                        setResult(res.data);
                        console.log(flightRes);
                    }

                })
                .catch(err => {
                    console.log(err);
                })
            //--------------------------------------------------------------------------------
            axios
                .get(BACKEND_URL + "flights/searchUser?" + uspReturn.toString() + "&" + numberAndClass)
                .then(res => {
                    if (!Array.isArray(res.data) || !res.data.length) {
                        setView(6);
                    }
                    else {
                        setView(1);
                        console.log(res.data);
                        setReturnResult(res.data);
                        console.log(returnFlightRes);
                    }

                })
                .catch(err => {
                    console.log(err);
                })
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
                        <h1 className="display-4 text-center">Update Departure Flight</h1>


                        <form onSubmit={submitAction} className='mt-5'>
                            <div className='input-group'>
                                <div className='criteria-form-group'>

                                    <div>


                                        <span className={flight.departureDate === "" ? "criteria-hide" : ""}>
                                            <TextField
                                                //required
                                                id="dateInput"
                                                type="date"
                                                className='form-control'
                                                label='Departure Date'
                                                name="departureDate"
                                                value={flight.departureDate}
                                                onChange={(e) => onChange(e)}
                                                error={errorDate !== ""}
                                                helperText={errorDate}
                                            />
                                        </span>

                                        <div>
                                            <FormControl sx={{ m: 1, minWidth: 120 }} >
                                                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="select"
                                                    defaultValue={cabin.cabin}
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
                                            text={"Search"}
                                            margin="10px"
                                            type={'submit'}
                                        />


                                    </div>


                                    <div className="list">
                                        {flightRes.map((flight, k) =>
                                            <DepartureFlightCardEdit flight={flight} numOfChildren={childNumber} numOfAdults={adultsNumber} seatCount={seatCount?.seatCount}
                                                chosenClass={chosenClass} data={selectDept} key={k} passDeptId={setDeptSelectedId} passDeptFrom={setDeptFlightFrom}
                                                passDeptTo={setDeptFlightTo} passDeptDuration={setDeptFlightDuration} passDeptFlightDeptTime={setDeptFlightDeptTime}
                                                passDeptFlightArrivalTime={setDeptFlightArrivalTime} passDeptFlightDeptDate={setDeptDeptDate}
                                                passDeptFlightArrivalDate={setDeptArrivalDate} passDeptFlightPrice={setDeptPrice}
                                                passSelectedDeptFlight={setSelectedDeptFlight} passPriceToDisplay={setPriceToDisplay} oldPrice={departFlight.fromObj.price} oldCabin={cabinDeparture.cabinDeparture} />
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
                                        {deptFlightFrom} ({deptFlightDeptTime})
                                    </Typography>
                                    <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                        alt="arrow"
                                        width="40px"
                                        height="27px" />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {deptFlightTo} ({deptFlightArrivalTime})
                                    </Typography>
                                </div>
                                <Typography variant="body2" color="text.secondary">
                                    Duration: {getDuration(selectedDeptFlight)}
                                </Typography>
                                <Typography>
                                    <button className="editButton" type="button" onClick={editDept}>Edit</button>
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
                                        {retFlight.toObj.from} ({retFlight.toObj.departureTime})
                                    </Typography>
                                    <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                        alt="arrow"
                                        width="40px"
                                        height="27px" />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {retFlight.toObj.to} ({retFlight.toObj.arrivalTime})
                                    </Typography>
                                </div>
                                <Typography variant="body2" color="text.secondary">
                                    Duration: {getDuration(retFlight.toObj)}
                                </Typography>
                                <Typography>

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
                                            {deptFlightFrom} ({deptFlightDeptTime})
                                        </Typography>
                                        <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                            alt="arrow"
                                            width="40px"
                                            height="27px" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {deptFlightTo} ({deptFlightArrivalTime})
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
                                            {retFlight.toObj.from} ({retFlight.toObj.departureTime})
                                        </Typography>
                                        <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                            alt="arrow"
                                            width="40px"
                                            height="27px" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {retFlight.toObj.to} ({retFlight.toObj.arrivalTime})
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
                    deptFrom={deptFlightFrom}
                    deptTo={deptFlightTo}
                    deptFlightDeptTime={deptFlightDeptTime}
                    deptFlightArrivalTime={deptFlightArrivalTime}
                    deptFlightDeptDate={deptFlightDeptDate}
                    deptFlightArrivalDate={deptFlightArrivalDate}
                    chosenClass={chosenClass}
                    selectedDeptFlightId={selectedDeptFlightId}
                    deptFlightPrice={deptFlightPrice - departureFlight.fromObj.price}
                    retFlightPrice={0}
                    deptFlightPriceReal={deptFlightPrice}
                    retFlightPriceReal={retFlight.toObj.price}
                    retFlightDeptTime={retFlight.toObj.departureTime}
                    retFlightDeptDate={retFlight.toObj.departureDate}
                    retFlightArrivalTime={retFlight.toObj.arrivalTime}
                    retFlightArrivalDate={retFlight.toObj.arrivalDate}
                    retFlightId={retFlight.toObj.flightId}
                    newCabin={chosenClass}
                    oldCabin={cabinDeparture.cabinDeparture}
                    oldCabinReturn={cabinReturn.cabinReturn}
                    numOfAdults={adultsNumber}
                    numOfChildren={childNumber}
                    seatCount={seatCount.seatCount}
                    selectDept={selectDept}
                    reservationId={reservationID.reservationID}
                    deptFlight={selectedDeptFlight}
                    deptFlightOld={departFlight.fromObj}
                    retFlight={retFlight.toObj}
                    setBookingNum={setBookingNum}
                    priceToDisplay={priceToDisplay}
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
                        flight={selectedDeptFlight}
                        maxSeats={seatCount.seatCount}
                        setView={(num) => setView(num)}
                        cabin={chosenClass}
                        setFlightSeats={setDeptSeats}
                        type={"Departure"}
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
                                            {deptFlightFrom} ({deptFlightDeptTime})
                                        </Typography>
                                        <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                            alt="arrow"
                                            width="40px"
                                            height="27px" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {deptFlightTo} ({deptFlightArrivalTime})
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        Duration: {getDuration(selectedDeptFlight)}
                                    </Typography>
                                    <Typography>
                                        <button className="editButton" type="button" onClick={editDept}>Edit</button>
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
                                            {retFlight.toObj.from} ({retFlight.toObj.departureTime})
                                        </Typography>
                                        <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                            alt="arrow"
                                            width="40px"
                                            height="27px" />
                                        <Typography gutterBottom variant="h5" component="div">
                                            {retFlight.toObj.to} ({retFlight.toObj.arrivalTime})
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        Duration: {getDuration(retFlight.toObj)}
                                    </Typography>
                                    <Typography>

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
                                                {deptFlightFrom} ({deptFlightDeptTime})
                                            </Typography>
                                            <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                                alt="arrow"
                                                width="40px"
                                                height="27px" />
                                            <Typography gutterBottom variant="h5" component="div">
                                                {deptFlightTo} ({deptFlightArrivalTime})
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
                                                {retFlight.toObj.from} ({retFlight.toObj.departureTime})
                                            </Typography>
                                            <img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-right.png"
                                                alt="arrow"
                                                width="40px"
                                                height="27px" />
                                            <Typography gutterBottom variant="h5" component="div">
                                                {retFlight.toObj.to} ({retFlight.toObj.arrivalTime})
                                            </Typography>
                                        </div>

                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>
                <div><ItineraryUpdate
                    deptFrom={deptFlightFrom}
                    deptTo={deptFlightTo}
                    deptFlightDeptTime={deptFlightDeptTime}
                    deptFlightArrivalTime={deptFlightArrivalTime}
                    deptFlightDeptDate={deptFlightDeptDate}
                    deptFlightArrivalDate={deptFlightArrivalDate}
                    chosenClass={chosenClass}
                    selectedDeptFlightId={selectedDeptFlightId}
                    deptFlightPrice={deptFlightPrice}
                    retFlightPrice={retFlightPrice}
                    retFlightDeptTime={retFlight.toObj.departureTime}
                    retFlightDeptDate={retFlight.toObj.departureDate}
                    retFlightArrivalTime={retFlight.toObj.arrivalTime}
                    retFlightArrivalDate={retFlight.toObj.arrivalDate}
                    retFlightId={retFlight.toObj.flightId}
                    numOfAdults={adultsNumber}
                    numOfChildren={childNumber}
                    deptSeats={deptSeats}
                    retSeats={chosenToSeat?.chosenToSeat}
                    bookingNum={bookingNum}
                    oldCabinReturn={cabinReturn.cabinReturn}

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
                        <h1 className="display-4 text-center">Update Departure Flight</h1>


                        <form onSubmit={submitAction} className='mt-5'>
                            <div className='input-group'>
                                <div className='criteria-form-group'>

                                    <div>


                                        <span className={flight.departureDate === "" ? "criteria-hide" : ""}>
                                            <TextField
                                                //required
                                                id="dateInput"
                                                type="date"
                                                className='form-control'
                                                label='Departure Date'
                                                name="departureDate"
                                                value={flight.departureDate}
                                                onChange={(e) => onChange(e)}
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
                                            text={"Search"}
                                            margin="10px"
                                            type={'submit'}
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


export default DeptUpdateReservation;