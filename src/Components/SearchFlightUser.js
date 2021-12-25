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
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import pyramids from '../assets/great-pyramid.jpg'
import newYork from '../assets/New_york.jpg'
import dubai from '../assets/Dubai.jpg'
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper';
import { Parallax } from 'react-parallax';
import { width } from '@mui/system';
import UIButton from './UIButton/UIButton';








const SearchFlightUser = ({ location }) => {
    const history = useHistory();
    // useState hooks for input and language

    const [place, setPlace] = useState("");
    const [image, setImage] = useState("https://images.pexels.com/photos/1631678/pexels-photo-1631678.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200");
    const image1 =
        "https://images.pexels.com/photos/1631678/pexels-photo-1631678.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
    const image2 =
        'https://data.1freewallpapers.com/download/sunset-tree-lake-sky-water-evening-purple.jpg'

    const image3 =
        "https://www.wallpapers13.com/wp-content/uploads/2016/01/Sunset_sailing_birds_sweden_boat_nature_ultra-2560X1600-Hd-wallpaper-1600x1200.jpg"
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
        'Search & Select Departure Flight',
        'Select Return Flight',
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
    const [chosenClass, setClass] = useState('Economy');
    const [returnDate, setReturnDate] = useState('');
    const [adultsNumber, setAdultNumber] = useState(1);
    const [childNumber, setChildNumber] = useState(0);
    const [allFlights, setAll] = useState([]);
    const [returnFlightRes, setReturnResult] = useState([]);
    const [flightRes, setResult] = useState([]);

    const [bookingNum, setBookingNum] = useState();

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

        let r = Math.floor(Math.random() * 2);
        console.log(r)
        if (r == 0) {
            setImage(image1);
        }
        else {
            setImage(image2);
        }
        console.log(image)
    }, []);


    const setSavedData = () => {
        setDeptFlightFrom(saved.deptFlightFrom);
        setDeptFlightTo(saved.deptFlightTo);
        setDeptFlightDeptTime(saved.deptFlightDeptTime);
        setDeptFlightArrivalTime(saved.deptFlightArrivalTime);
        setDeptDeptDate(saved.deptFlightDeptDate);
        setDeptArrivalDate(saved.deptFlightArrivalDate);

        setClass(saved.chosenClass);

        setDeptSelectedId(saved.selectedDeptFlightId);
        setDeptPrice(saved.deptFlightPrice);
        setRetPrice(saved.retFlightPrice);
        setRetFlightDeptTime(saved.retFlightDeptTime);
        setRetDeptDate(saved.retFlightDeptDate);
        setRetFlightArrivalTime(saved.retFlightArrivalTime);
        setRetArrivalDate(saved.retFlightArrivalDate);

        setRetSelectedId(saved.selectedRetFlightId);

        setAdultNumber(saved.adultsNumber);
        setChildNumber(saved.childNumber);

        // selectDept={selectDept}

        setSelectedDeptFlight(saved.selectedDeptFlight);
        setSelectedRetFlight(saved.selectedRetFlight);
    }

    // useEffect((e) => {
    //     const usp = new URLSearchParams(flight);
    //     let keysForDel = [];
    //     usp.forEach((value, key) => {
    //         if (value === '') {
    //             keysForDel.push(key);
    //         }
    //     });

    //     keysForDel.forEach(key => {
    //         usp.delete(key);
    //     });
    //     console.log(usp.toString());
    //     // prevents default, so page won't reload on form submit

    //     //e.preventDefault();
    //     axios
    //         .get(BACKEND_URL + "flights/search?" + usp.toString())
    //         .then(res => {
    //             console.log(res.data);
    //             setResult(res.data);
    //             console.log(flightRes);

    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [flight])

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

    // const clearAll = (e) => {
    //     var elementsSelect = document.getElementById('select');
    //     var elementsDate = document.getElementById('dateInput');
    //     console.log(elementsSelect.length);

    //     for (var i = 0; i < elementsSelect.length; i++) {
    //         elementsSelect.selectedIndex = null;
    //         console.log("Im in select");
    //     }
    //     for (var j = 0; j < elementsDate.length; j++) {
    //         elementsDate.value = "";
    //         console.log("Im in");
    //     }
    //     console.log("CLEARED");
    // }
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
    const scrollUp = (e) => {

        window.scrollTo(window.top);
        setPlace("CAI")
        console.log(place);
    };



    const [errorSame, setErrorSame] = useState("");
    const [errorDate, setErrorDate] = useState("");
    // function for handling form submit
    const submitAction = (e) => {
        e.preventDefault();
        var goAhead = true;
        if (flight.to == flight.from) {
            //alert("From and To need to be different")
            setErrorSame("From and To need to be different");
            goAhead = false;
        } else {
            setErrorSame("");
        }

        if (returnDate && flight.departureDate && flight.departureDate > returnDate) {
            // alert("Departure date cannot be later than return date")
            setErrorDate("Departure date cannot be later than return date")
            goAhead = false;
        } else {
            setErrorDate("")
        }

        if (goAhead) {
            console.log("This is the flight:")
            window.scrollBy(0, 400);
            returnFlight.to = flight.from;
            returnFlight.from = flight.to;
            returnFlight.departureDate = returnDate;
            console.log(returnFlight);
            var passNumber = adultsNumber + childNumber;
            var numberAndClass = "";
            console.log(chosenClass);
            const usp = new URLSearchParams(flight);
            const uspReturn = new URLSearchParams(returnFlight);
            let keysForDel = [];
            let keysForDel2 = [];
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


                <div className='bg-dark text-light'>

                    <div className='container pt-5' style={{ height: '100vh' }}>



                        <form onSubmit={submitAction} className='mt-5'>
                            <div className='input-group'>
                                <div className='criteria-form-group'>
                                    <Parallax bgImage={image1} strength={450}>
                                        <div style={{ height: '650px', width: '100%' }}>
                                            <div className="stepper-space"><Box sx={{ width: '100%' }}>
                                                <Stepper activeStep={0} alternativeLabel>
                                                    {steps.map((label) => (
                                                        <Step key={label}>
                                                            <StepLabel>{label}</StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </Box></div>
                                            <h1 className="display-4 text-center">Search for flights</h1>
                                            <div>

                                                <div className='search-center'>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={allFlights.map(flight => flight.from)
                                                            .filter((value, index, self) => self.indexOf(value) === index)}
                                                        sx={{ width: 300 }}

                                                        // onChange={(e) => onChange(e)}

                                                        renderInput={(params) => <TextField {...params} error={errorSame !== ""} required label="From" />}
                                                        // name="to"
                                                        // value={flight.to}
                                                        onChange={handleChangeFrom}

                                                    />
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={allFlights.map(flight => flight.to)
                                                            .filter((value, index, self) => self.indexOf(value) === index)}
                                                        sx={{ width: 300 }}


                                                        // onChange={(e) => onChange(e)}

                                                        renderInput={(params) =>
                                                            <TextField
                                                                {...params}
                                                                required
                                                                label="To"
                                                                error={errorSame !== ""}
                                                                helperText={errorSame}
                                                            />}
                                                        // name="to"
                                                        // value={flight.to}
                                                        onChange={handleChangeTo}


                                                    />
                                                </div>
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
                                                <FormControl sx={{ m: 1, minWidth: 120 }} >
                                                    <InputLabel id="demo-simple-select-label">Adults</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="select"

                                                        value={adultsNumber}
                                                        label="Adults"
                                                        onChange={(e) => onChooseAdult(e)}

                                                    >


                                                        <MenuItem value={1} >1</MenuItem>
                                                        <MenuItem value={2} >2</MenuItem>
                                                        <MenuItem value={3} >3</MenuItem>
                                                        <MenuItem value={4} >4</MenuItem>
                                                        <MenuItem value={5} >5</MenuItem>
                                                        <MenuItem value={6} >6</MenuItem>
                                                        <MenuItem value={7} >7</MenuItem>
                                                        <MenuItem value={8} >8</MenuItem>
                                                        <MenuItem value={9} >9</MenuItem>

                                                    </Select>
                                                </FormControl>
                                                <FormControl sx={{ m: 1, minWidth: 120 }} >
                                                    <InputLabel id="demo-simple-select-label">Children</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="select"

                                                        value={childNumber}
                                                        label="Children"
                                                        onChange={(e) => onChooseChild(e)}

                                                    >

                                                        <MenuItem value={0} >0</MenuItem>
                                                        <MenuItem value={1} >1</MenuItem>
                                                        <MenuItem value={2} >2</MenuItem>
                                                        <MenuItem value={3} >3</MenuItem>
                                                        <MenuItem value={4} >4</MenuItem>
                                                        <MenuItem value={5} >5</MenuItem>
                                                        <MenuItem value={6} >6</MenuItem>
                                                        <MenuItem value={7} >7</MenuItem>
                                                        <MenuItem value={8} >8</MenuItem>
                                                        <MenuItem value={9} >9</MenuItem>

                                                    </Select>
                                                </FormControl>

                                            </div>
                                            <div className='input-group-append'>
                                                <UIButton
                                                    type={"submit"}
                                                    text={"Search"}
                                                    margin="10px"
                                                    color={"blue"}
                                                />


                                            </div>
                                        </div>
                                    </Parallax>
                                    {flightRes.length == 0 ? null : <div class="strike" style={{ marginTop: '40px' }}>
                                        <span>Search Results</span>
                                    </div>}

                                    <div className="list">


                                        {flightRes.map((flight, k) =>
                                            <DepartureFlightCard flight={flight} numOfChildren={childNumber} numOfAdults={adultsNumber}
                                                chosenClass={chosenClass} data={selectDept} key={k} passDeptId={setDeptSelectedId} passDeptFrom={setDeptFlightFrom}
                                                passDeptTo={setDeptFlightTo} passDeptDuration={setDeptFlightDuration} passDeptFlightDeptTime={setDeptFlightDeptTime}
                                                passDeptFlightArrivalTime={setDeptFlightArrivalTime} passDeptFlightDeptDate={setDeptDeptDate}
                                                passDeptFlightArrivalDate={setDeptArrivalDate} passDeptFlightPrice={setDeptPrice}
                                                passSelectedDeptFlight={setSelectedDeptFlight} />
                                        )}
                                    </div>

                                    <div class="strike" style={{ marginTop: '40px' }}>
                                        <span>Popular Destinations</span>
                                    </div>

                                    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', }}>
                                        <Card sx={{ maxWidth: 300, maxHeight: 500, marginTop: '90px', marginBottom: '90px' }} >
                                            <CardMedia
                                                component="img"
                                                alt="Egyptian Pyramids"
                                                height="300"
                                                src={pyramids}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h9" component="div">
                                                    Cairo, Egypt
                                                </Typography>

                                            </CardContent>

                                        </Card>
                                        <Card sx={{ maxWidth: 300, maxHeight: 500, marginTop: '90px', marginBottom: '90px' }}>
                                            <CardMedia
                                                component="img"
                                                alt="New York"
                                                height="300"
                                                src={newYork}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h9" component="div">
                                                    New York, United States
                                                </Typography>

                                            </CardContent>

                                        </Card>
                                        <Card sx={{ maxWidth: 300, maxHeight: 500, marginTop: '90px', marginBottom: '90px' }}>
                                            <CardMedia
                                                component="img"
                                                alt="Burj Khalifa"
                                                height="300"

                                                src={dubai}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h9" component="div">
                                                    Dubai, United Arab Kingdom
                                                </Typography>

                                            </CardContent>

                                        </Card>

                                        <p style={{ color: '#59B39E', fontSize: '30px', fontWeight: 'bold' }}>AND MORE...</p>
                                        <SwipeableTextMobileStepper />
                                    </div>
                                    {/* <Parall /> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </>
        );
    }
    //SELECTING RETURN FLIGHT------------------------------------------------------------------------------------------------------------------------------------------------------
    else if (view == 2) {
        return (
            <>
                <div className="stepper-space"><Box sx={{ width: '100%' }}>
                    <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box></div>

                <div >
                    <div className="colC">
                        <p className="selected-depart">Selected Departure Flight:</p>



                        <Card sx={{ maxWidth: 500, }}  >
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
                    <div><h2> Select return flight </h2></div>

                    <div className="list">

                        {
                            returnFlightRes.length > 0 ?
                                returnFlightRes.map((flight, k) =>
                                    <ReturnFlightCard flight={flight} data={selectDept} numOfChildren={childNumber} numOfAdults={adultsNumber} chosenClass={chosenClass} key={k}
                                        passRetId={setRetSelectedId} passRetFrom={setRetFlightFrom}
                                        passRetTo={setRetFlightTo} passRetDuration={setRetFlightDuration} passRetFlightDeptTime={setRetFlightDeptTime}
                                        passRetFlightArrivalTime={setRetFlightArrivalTime} passRetFlightPrice={setRetPrice} passRetFlightDate={setRetDeptDate}
                                        passRetFlightArrivalDate={setRetArrivalDate} passSelectedRetFlight={setSelectedRetFlight} />
                                )
                                :
                                <div className="no-search">
                                    <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-search-airport-kiranshastry-gradient-kiranshastry.png" />
                                    <h1>Sorry, No Return Flights Found</h1>
                                </div>
                        }

                    </div>





                </div>

            </>
        );
    }
    else if (view == 3) {
        return (<>

            <div className="stepper-space"><Box sx={{ width: '100%' }}>
                <Stepper activeStep={2} alternativeLabel>
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
                                    <button className="editButton" type="button" onClick={editRet}>Edit</button>
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
                <Summary
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
                    retFlightDeptTime={retFlightDeptTime}
                    retFlightDeptDate={retFlightDeptDate}
                    retFlightArrivalTime={retFlightArrivalTime}
                    retFlightArrivalDate={retFlightArrivalDate}
                    retFlightId={selectedRetFlightId}

                    numOfAdults={adultsNumber}
                    numOfChildren={childNumber}
                    selectDept={selectDept}

                    deptFlight={selectedDeptFlight}
                    retFlight={selectedRetFlight}
                    setBookingNum={setBookingNum}
                />
            </div>
        </>);
    }

    else if (view == 4) {
        return (
            <>
                <div className="stepper-space">
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={3} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>
                <div>
                    <FlightSeats
                        from={selectedDeptFlight}
                        setFrom={setSelectedDeptFlight}
                        to={selectedRetFlight}
                        setTo={setSelectedRetFlight}
                        maxSeats={adultsNumber + childNumber}
                        setView={(num) => setView(num)}
                        cabin={chosenClass}
                        setDeptSeats={setDeptSeats}
                        setRetSeats={setRetSeats}
                    />
                </div>
            </>
        )
    }//SEATS FUNC HERE
    //VIEWING SUMMARY -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if (view == 5) {

        return (
            <>

                <div className="stepper-space"><Box sx={{ width: '100%' }}>
                    <Stepper activeStep={4} alternativeLabel>
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
                <div><Itinerary
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
                    retFlightDeptTime={retFlightDeptTime}
                    retFlightDeptDate={retFlightDeptDate}
                    retFlightArrivalTime={retFlightArrivalTime}
                    retFlightArrivalDate={retFlightArrivalDate}
                    retFlightId={selectedRetFlightId}
                    numOfAdults={adultsNumber}
                    numOfChildren={childNumber}
                    deptSeats={deptSeats}
                    retSeats={retSeats}
                    bookingNum={bookingNum}

                />
                    <div><button className="confirm-res" style={{ marginBottom: "20px" }} onClick={(e) => history.push('/Reserved-flights')}>View Reservations</button></div>

                </div>









            </>
        );

    }
    else {
        return (
            <>


                <div className='bg-dark text-light'>
                    <div className='container pt-5' style={{ height: '100vh' }}>



                        <form onSubmit={submitAction} className='mt-5'>
                            <div className='input-group'>
                                <div className='criteria-form-group'>
                                    <Parallax bgImage={image1} strength={450}>
                                        <div style={{ height: '650px', width: '100%' }}>
                                            <div className="stepper-space"><Box sx={{ width: '100%' }}>
                                                <Stepper activeStep={0} alternativeLabel>
                                                    {steps.map((label) => (
                                                        <Step key={label}>
                                                            <StepLabel>{label}</StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </Box></div>
                                            <h1 className="display-4 text-center">Search for flights</h1>

                                            <div>

                                                <div className='search-center'>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={allFlights.map(flight => flight.from)
                                                            .filter((value, index, self) => self.indexOf(value) === index)}
                                                        sx={{ width: 300 }}

                                                        // onChange={(e) => onChange(e)}

                                                        renderInput={(params) => <TextField {...params} required label="From" />}
                                                        // name="to"
                                                        // value={flight.to}
                                                        onChange={handleChangeFrom}

                                                    />
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={allFlights.map(flight => flight.to)
                                                            .filter((value, index, self) => self.indexOf(value) === index)}
                                                        sx={{ width: 300 }}

                                                        // onChange={(e) => onChange(e)}

                                                        renderInput={(params) => <TextField {...params} required label="To" />}
                                                        // name="to"
                                                        // value={flight.to}
                                                        onChange={handleChangeTo}


                                                    />
                                                </div>
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
                                                <span className={returnDate === "" ? "criteria-hide" : ""}>
                                                    <TextField
                                                        // required
                                                        id="dateInput"
                                                        type='date'
                                                        className='form-control'
                                                        label='Return Date'
                                                        name="returnDate"
                                                        value={returnDate}
                                                        onChange={(e) => onChooseReturnDate(e)}
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
                                                <FormControl sx={{ m: 1, minWidth: 120 }} >
                                                    <InputLabel id="demo-simple-select-label">Adults</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="select"

                                                        value={adultsNumber}
                                                        label="Adults"
                                                        onChange={(e) => onChooseAdult(e)}

                                                    >


                                                        <MenuItem value={1} >1</MenuItem>
                                                        <MenuItem value={2} >2</MenuItem>
                                                        <MenuItem value={3} >3</MenuItem>
                                                        <MenuItem value={4} >4</MenuItem>
                                                        <MenuItem value={5} >5</MenuItem>
                                                        <MenuItem value={6} >6</MenuItem>
                                                        <MenuItem value={7} >7</MenuItem>
                                                        <MenuItem value={8} >8</MenuItem>
                                                        <MenuItem value={9} >9</MenuItem>

                                                    </Select>
                                                </FormControl>
                                                <FormControl sx={{ m: 1, minWidth: 120 }} >
                                                    <InputLabel id="demo-simple-select-label">Children</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="select"

                                                        value={childNumber}
                                                        label="Children"
                                                        onChange={(e) => onChooseChild(e)}

                                                    >

                                                        <MenuItem value={0} >0</MenuItem>
                                                        <MenuItem value={1} >1</MenuItem>
                                                        <MenuItem value={2} >2</MenuItem>
                                                        <MenuItem value={3} >3</MenuItem>
                                                        <MenuItem value={4} >4</MenuItem>
                                                        <MenuItem value={5} >5</MenuItem>
                                                        <MenuItem value={6} >6</MenuItem>
                                                        <MenuItem value={7} >7</MenuItem>
                                                        <MenuItem value={8} >8</MenuItem>
                                                        <MenuItem value={9} >9</MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className='input-group-append'>
                                                <UIButton
                                                    type={"submit"}
                                                    text={"Search"}
                                                    margin="10px"
                                                    color={"blue"}
                                                />


                                            </div>
                                        </div>
                                    </Parallax>


                                    <div className="no-search"> <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-search-airport-kiranshastry-gradient-kiranshastry.png" />
                                        <h1>Sorry, No Results Found</h1></div>

                                    <div class="strike" style={{ marginTop: '40px' }}>
                                        <span>Popular Destinations</span>
                                    </div>

                                    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', }}>
                                        <Card sx={{ maxWidth: 300, maxHeight: 500, marginTop: '90px', marginBottom: '90px' }} onClick={(e) => scrollUp(e)}>
                                            <CardMedia
                                                component="img"
                                                alt="Egyptian Pyramids"
                                                height="300"
                                                src={pyramids}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h9" component="div">
                                                    Cairo, Egypt
                                                </Typography>

                                            </CardContent>

                                        </Card>
                                        <Card sx={{ maxWidth: 300, maxHeight: 500, marginTop: '90px', marginBottom: '90px' }}>
                                            <CardMedia
                                                component="img"
                                                alt="New York"
                                                height="300"
                                                src={newYork}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h9" component="div">
                                                    New York, United States
                                                </Typography>

                                            </CardContent>

                                        </Card>
                                        <Card sx={{ maxWidth: 300, maxHeight: 500, marginTop: '90px', marginBottom: '90px' }}>
                                            <CardMedia
                                                component="img"
                                                alt="Burj Khalifa"
                                                height="300"

                                                src={dubai}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h9" component="div">
                                                    Dubai, United Arab Kingdom
                                                </Typography>

                                            </CardContent>

                                        </Card>

                                        <p style={{ color: '#59B39E', fontSize: '30px', fontWeight: 'bold' }}>AND MORE...</p>
                                        <SwipeableTextMobileStepper />
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }


}


export default SearchFlightUser;