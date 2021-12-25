import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import "./Itinerary.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import UIButton from './UIButton/UIButton';
import StripeCheckout from 'react-stripe-checkout';
import LoadingPayment from './LoadingPayment/LoadingPayment';
import SignInDialog from './SignInDialog';
import { useEffect } from 'react';

const Summary = (props) => {
    const flight = props.flight;
    let toEmail = JSON.parse(localStorage.getItem('user'))?.email;
    let deptFlightId, retFlightId, deptFrom, deptTo, retFrom, retTo,
        departureDateDep, arrivalDateDep, departureTimeDep, arrivalTimeDep, cabinClassDep,
        departureDateRet, arrivalDateRet, departureTimeRet, arrivalTimeRet, cabinClassRet,
        flightPriceDept, flightPriceRet, totalPrice, bookingNumber,
        firstName, lastName;
    const history = useHistory();
    // const handleClick = () => {
    //     history.push(`/details/${flight.flightId}`)
    // }
    function createData(name, calories) {
        return { name, calories };
    }

    const [loading, setLoading] = useState("");
    let bookForHere = "";

    const [showConfirm, setConfirm] = useState(false);

    const toggleDialog = () => {
        setConfirm(!showConfirm);
    }
    const rows = [
        createData('Flight Number', props.selectedDeptFlightId),
        createData('Departure Date and Time', props.deptFlightDeptTime + "   ,   " + props.deptFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.deptFlightArrivalTime + "  ,   " + props.deptFlightArrivalDate.substring(0, 10)),
        createData('Chosen Class', props.chosenClass),

        createData('Flight Price', props.deptFlightPrice),

    ];
    const rowsR = [
        createData('Flight Number', props.retFlightId),
        createData('Departure Date and Time', props.retFlightDeptTime + "   ,   " + props.retFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.retFlightArrivalTime + "  ,   " + props.retFlightArrivalDate.substring(0, 10)),
        createData('Chosen Class', props.chosenClass),

        createData('Flight Price', props.retFlightPrice),
    ];

    let userId = JSON.parse(localStorage.getItem('user'))?._id;

    const [loginDialog, setLoginDialog] = useState(false);
    useEffect(() => {
        userId = JSON.parse(localStorage.getItem('user'))?._id;
    }, [loginDialog])

    const clickConfirm = () => {
        if (userId) {
            toggleDialog();
        } else {
            // history.push('/login');
            setLoginDialog(true)
        }
    }

    const handleSendRes = async (e) => {

        deptFlightId = props.selectedDeptFlightId
        retFlightId = props.retFlightId
        deptFrom = props.deptFrom
        deptTo = props.deptTo
        retFrom = props.deptTo
        retTo = props.deptFrom
        bookingNumber = bookForHere //this



        departureDateDep = props.deptFlightDeptDate.substring(0, 10);
        arrivalDateDep = props.deptFlightArrivalDate.substring(0, 10);
        departureTimeDep = props.deptFlightDeptTime;
        arrivalTimeDep = props.deptFlightArrivalTime;

        cabinClassDep = props.chosenClass;


        departureDateRet = props.retFlightDeptDate.substring(0, 10);
        arrivalDateRet = props.retFlightArrivalDate.substring(0, 10);
        departureTimeRet = props.retFlightDeptTime;
        arrivalTimeRet = props.retFlightArrivalTime;

        cabinClassRet = props.chosenClass;

        flightPriceDept = props.deptFlightPrice;
        flightPriceRet = props.retFlightPrice
        totalPrice = props.retFlightPrice + props.deptFlightPrice

        firstName = JSON.parse(localStorage.getItem('user'))?.firstName;
        lastName = JSON.parse(localStorage.getItem('user'))?.lastName;




        try {


            //  BACKEND_URL + "users/search?userId=" + id)
            await axios.post(BACKEND_URL + "users/send_mailPay?email=" + toEmail, {
                deptFlightId, retFlightId, deptFrom, deptTo, retFrom, retTo,
                departureDateDep, arrivalDateDep, departureTimeDep, arrivalTimeDep, cabinClassDep,
                departureDateRet, arrivalDateRet, departureTimeRet, arrivalTimeRet, cabinClassRet,
                flightPriceDept, flightPriceRet, totalPrice, bookingNumber,
                firstName, lastName,
                to: toEmail
            })
        } catch (error) {

            console.error(error)
        }
    }

    const [product, setproduct] = useState({
        name: `Ticket between ${props.deptFrom} & ${props.deptTo} for user ${userId}`,
        price: props.deptFlightPrice + props.retFlightPrice, ///price of ticket from input //remove hardcode
        productBy: "FiveCluelessDevs"
    })

    let payment = null;
    const makePayment = token => {
        const body = {
            token,
            product
        }
        setLoading("EGP " + Math.abs(props.deptFlightPrice + props.retFlightPrice).toFixed(0) + " Payment");
        axios.post(BACKEND_URL + 'payments/payment', body,{
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log("RESPONSE", response.data);
                payment = response.data;
                setLoading('success')
                onConfirm();
            })
            .catch(err => {
                setLoading('error');
                console.log(err)
                setTimeout(() => setLoading(''), 1000);
            });
    };

    const onConfirm = (e) => {
        let numOfAdults = props.numOfAdults
        let numOfChildren = props.numOfChildren;
        let numOfSeats = numOfAdults * 1 + numOfChildren * 1;
        let priceOfDept = props.deptFlightPrice;
        let priceOfRet = props.retFlightPrice;
        console.log(props)
        let cabin = props.chosenClass;

        let deptFlight = props.deptFlight;
        let retFlight = props.retFlight;

        //-------------------------------

        //-------------------------------




        switch (cabin) {
            case "Economy":
                console.log(numOfSeats)
                console.log(deptFlight)
                deptFlight = { ...deptFlight, availableEconomy: deptFlight.availableEconomy - numOfSeats };
                console.log(deptFlight)
                retFlight = { ...retFlight, availableEconomy: retFlight.availableEconomy - numOfSeats };
                break;
            case "First":
                deptFlight = { ...deptFlight, availableFirst: deptFlight.availableFirst - numOfSeats };
                retFlight = { ...retFlight, availableFirst: retFlight.availableFirst - numOfSeats };
                break;
            case "Business":
                deptFlight = { ...deptFlight, availableBusiness: deptFlight.availableBusiness - numOfSeats };
                retFlight = { ...retFlight, availableBusiness: retFlight.availableBusiness - numOfSeats };
                break;
            default:
                console.log("Something went wrong");
        }




        axios
            .put(BACKEND_URL + 'flights/update?flightId=' + deptFlight?.flightId, deptFlight,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res.data);

                axios
                    .put(BACKEND_URL + 'flights/update?flightId=' + retFlight?.flightId, retFlight,{
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        console.log(res.data);

                        const data = {
                            UserID: userId,
                            from: deptFlight?.flightId,
                            to: retFlight?.flightId,
                            cabin: cabin,
                            price: priceOfDept + priceOfRet,
                            numberOfSeats: numOfSeats,
                            cabinDeparture: cabin,
                            cabinArrival: cabin,
                            chargeId: [payment?.id]
                        }
                        axios
                            .post(BACKEND_URL + "reservations/createReservation", data,{
                                headers: {
                                    'Authorization': localStorage.getItem('token')
                                }
                            })
                            .then(res => {
                                console.log("reservation")
                                console.log(res.data);
                                props.setBookingNum(res.data._id);
                                bookForHere = res.data._id;
                                props.selectDept();
                                setLoading("");
                                console.log("SENDING MAIL");
                                handleSendRes(e)
                            })
                            .catch(err => {
                                setLoading("");
                                console.log("Error from Confirm Resrevation: " + err);
                                
                            })


                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="itinerary-container">


            <div className="itinerary-card">
                <div className="head-itinerary-card">
                    <div className="icon">
                        <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                            alt="airplaneDepart"
                            width="25px"
                            height="25px" />
                    </div>
                    <div className="text-within">
                        <p>Onward trip from <span className="from-to-font">{props.deptFrom}</span> to <span className="from-to-font">{props.deptTo}</span></p>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">

                        <TableBody>

                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <span className="info-header-font"> {row.name} </span>
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* return flight UI */}
                </TableContainer>
                <div className="head-itinerary-card-return">
                    <div className="icon">
                        <div className="flip-image">
                            <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                alt="airplaneDepart"
                                width="25px"
                                height="25px" />
                        </div>
                    </div>
                    <div className="text-within">
                        <p>Return trip from <span className="from-to-font">{props.deptTo}</span> to <span className="from-to-font">{props.deptFrom}</span></p>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">

                        <TableBody>

                            {rowsR.map((rowsR) => (
                                <TableRow
                                    key={rowsR.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <span className="info-header-font"> {rowsR.name} </span>
                                    </TableCell>
                                    <TableCell align="right">{rowsR.calories}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div>Total cost: <p> <span><b>EGP</b>{props.deptFlightPrice + props.retFlightPrice}</span></p> </div>
                <p className="passenger-font">(for {1 * props.numOfAdults + 1 * props.numOfChildren} passengers)</p>

                <button className="confirm-res" onClick={clickConfirm}>Confirm Reservation</button>

                <div>
                    <Dialog
                        open={showConfirm}
                        onClose={toggleDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to confirm the reservation?"}
                        </DialogTitle>
                        <DialogActions>
                            {/* <Button onClick={toggleDialog} variant="text">back </Button> */}
                            {/* <Button onClick={onConfirm} variant="text" color="success">Confirm Reservation</Button> */}


                            <UIButton
                                onClick={toggleDialog}
                                text={"back"}
                                margin="10px"
                            />


                            <StripeCheckout
                                stripeKey="pk_test_51K9D6UA32Adg2XeIayrvPhQ3Y97itWgoKPGMDyhxforRJofQ1DmX0G66AUBJp2USDguA6DP5KAKireIv4DwbmYSh00oxYvRo7K"
                                token={makePayment}
                                name="Buy Ticket"
                                amount={product.price * 100}
                                email={JSON.parse(localStorage.getItem('user'))?.email}
                                currency='egp'
                            >
                                <UIButton
                                    // onClick={onConfirm}
                                    text={"Confirm & Pay"}
                                    margin="10px"
                                    color={'green'}
                                />
                            </StripeCheckout>
                        </DialogActions>
                    </Dialog>

                    {loading && <LoadingPayment text={loading} />}

                    <SignInDialog show={loginDialog} setShow={setLoginDialog} setConfirm={toggleDialog} />
                </div>
            </div>

        </div>
    )
};

export default Summary;