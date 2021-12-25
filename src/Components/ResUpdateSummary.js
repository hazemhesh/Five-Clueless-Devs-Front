import React, { useState, useEffect } from 'react';
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
import UIButton from './UIButton/UIButton';
import StripeCheckout from 'react-stripe-checkout';
import LoadingPayment from './LoadingPayment/LoadingPayment';

const ResUpdateSummary = (props) => {
    const flight = props.flight;
    let priceToFinalDisplay = 0;

    let toEmail = JSON.parse(localStorage.getItem('user'))?.email;
    let bookForHere = "";
    let deptFlightId, retFlightId, deptFrom, deptTo, retFrom, retTo,
        departureDateDep, arrivalDateDep, departureTimeDep, arrivalTimeDep, cabinClassDep,
        departureDateRet, arrivalDateRet, departureTimeRet, arrivalTimeRet, cabinClassRet,
        flightPriceDept, flightPriceRet, totalPrice, bookingNumber,
        firstName, lastName, yourPaymentOrARefund, refundedOrFee;

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

        


        departureDateRet = props.retFlightDeptDate.substring(0, 10);
        arrivalDateRet = props.retFlightArrivalDate.substring(0, 10);
        departureTimeRet = props.retFlightDeptTime;
        arrivalTimeRet = props.retFlightArrivalTime;

        

       
        

        firstName = JSON.parse(localStorage.getItem('user'))?.firstName;
        lastName = JSON.parse(localStorage.getItem('user'))?.lastName;




        try {


            //  BACKEND_URL + "users/search?userId=" + id)
            await axios.post(BACKEND_URL + "users/send_mailChange?email=" + toEmail, {
                deptFlightId, retFlightId, deptFrom, deptTo, retFrom, retTo,
                departureDateDep, arrivalDateDep, departureTimeDep, arrivalTimeDep, cabinClassDep,
                departureDateRet, arrivalDateRet, departureTimeRet, arrivalTimeRet, cabinClassRet,
                flightPriceDept, flightPriceRet, totalPrice, bookingNumber,
                firstName, lastName, yourPaymentOrARefund, refundedOrFee,
                to: toEmail
            })
            console.log("Email sent to:")
            console.log(toEmail);
        } catch (error) {

            console.error(error)
        }
    }

    useEffect(() => {
        console.log(props.retFlightOld);
        console.log(props.retFlight);
        console.log(props.deptFlight);
        console.log(props.numOfAdults);
        console.log(props.numOfChildren);
        console.log(props.reservationId);
        console.log(props.newCabin);
        console.log(props.oldCabin);
    })

    const [reservation, setReservation] = useState(null)
    const [charges, setCharges] = useState([]); //[{id: cid, amount: amount left} ]
    // let payment = [];

    const [payment, setPayment] = useState([]);

    const [loading, setLoading] = useState('');

    useEffect(() => {
        console.table(payment);
    }, [payment])

    useEffect(() => {
        let c = [];
        axios.get(BACKEND_URL + "reservations/GetReservation?_id=" + props.reservationId,{
            headers:{
              'Authorization': localStorage.getItem('token')
            }
          })
            .then(res => {
                setReservation(res.data[0]);
                console.log(reservation)
                setPayment([...res.data[0].chargeId]);

                res.data[0].chargeId.forEach((cId, index) => {
                    axios.post(BACKEND_URL + "payments/retrieve", { chargeId: cId },{
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    })
                        .then((charge) => {
                            c[index] = { id: cId, amount: (charge.data.amount - charge.data.amount_refunded) / 100 };
                            setCharges(c);
                            console.log(c);
                        })
                        .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err))
    }, []);


    const history = useHistory();
    // const handleClick = () => {
    //     history.push(`/details/${flight.flightId}`)
    // }
    function createData(name, calories) {
        return { name, calories };
    }

    const [showConfirm, setConfirm] = useState(false);

    const toggleDialog = () => {
        setConfirm(!showConfirm);
    }
    const rows = [
        createData('Flight Number', props.selectedDeptFlightId),
        createData('Departure Date and Time', props.deptFlightDeptTime + "   ,   " + props.deptFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.deptFlightArrivalTime + "  ,   " + props.deptFlightArrivalDate.substring(0, 10)),
    ];

    const rowsR = [
        createData('Flight Number', props.retFlightId),
        createData('Departure Date and Time', props.retFlightDeptTime + "   ,   " + props.retFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.retFlightArrivalTime + "  ,   " + props.retFlightArrivalDate.substring(0, 10)),
    ];



    if (window.location.href.includes("Dept")) {
        if (props.priceToDisplay <= 0) {

            rows.push(createData('Additional Fee', Math.abs(props.priceToDisplay).toFixed(0)))
            flightPriceDept = Math.abs(props.priceToDisplay);
            yourPaymentOrARefund= "your payment"
            refundedOrFee = "Additional Fee:"
           
        }
        else {
            rows.push(createData('Amount to be refunded', (props.priceToDisplay).toFixed(0)))
            flightPriceDept = Math.abs(props.priceToDisplay);
            yourPaymentOrARefund= "a refund"
            refundedOrFee = "Amount Refunded:"
        }
        flightPriceRet = 0;
        priceToFinalDisplay = props.priceToDisplay;
        totalPrice = Math.abs(props.priceToDisplay)
        rowsR.push(createData('Additional Fee', 0))
        rows.push(createData('Chosen Class', props.newCabin))
        rowsR.push(createData('Chosen Class', props.oldCabinReturn))
        cabinClassDep = props.newCabin;
        cabinClassRet = props.oldCabinReturn;
    }
    else if (window.location.href.includes("Ret")) {

        if (props.priceToDisplayRet <= 0) {

            rowsR.push(createData('Additional Fee', Math.abs(props.priceToDisplayRet).toFixed(0)))
            flightPriceRet = Math.abs(props.priceToDisplayRet)
            yourPaymentOrARefund= "your payment"
            refundedOrFee = "Additional Fee:"
        }
        else {

            rowsR.push(createData('Amount to be refunded', (props.priceToDisplayRet).toFixed(0)))
            flightPriceRet = Math.abs(props.priceToDisplayRet)
            yourPaymentOrARefund= "a refund"
            refundedOrFee = "Amount Refunded:"
        }
        flightPriceDept = 0;
        priceToFinalDisplay = props.priceToDisplayRet;
        totalPrice = Math.abs(props.priceToDisplayRet);
        rows.push(createData('Additional Fee', 0))
        rows.push(createData('Chosen Class', props.oldCabinDept))
        rowsR.push(createData('Chosen Class', props.newCabin))
        cabinClassDep = props.oldCabinDept;
        cabinClassRet = props.newCabin;
    }

    let userId = JSON.parse(localStorage.getItem('user'))?._id;

    const clickConfirm = () => {
        if (userId) {
            toggleDialog();
        } else {
            history.push('/login');
        }
    }


    const getPrice = () => {
        if (window.location.href.includes("Dept")) {
            return Math.abs(props.priceToDisplay);
        } else {
            return Math.abs(props.priceToDisplayRet);
        }
    }


    const makePayment = (token) => {
        let price = 0;
        if (window.location.href.includes("Dept")) {
            price = props.priceToDisplay;
        } else {
            price = props.priceToDisplayRet;
        }

        if (price <= 0) {
            //pay extra

            const product = {
                name: `Ticket between ${props.deptFrom} & ${props.deptTo} for user ${userId}`,
                price: Math.abs(price), ///price of ticket from input //remove hardcode
                productBy: "FiveCluelessDevs"
            }
            const body = {
                token,
                product
            }
            setLoading("EGP" + Math.abs(price).toFixed(0) + ' Payment');
            axios.post(BACKEND_URL + 'payments/payment', body,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then(response => {
                    // console.log("RESPONSE", response.data);
                    let paymentId = response.data.id;
                    setPayment(payment.concat([paymentId]))
                    let payArray = payment.concat([paymentId]);
                    setLoading('success');
                    onConfirm(null, payArray);
                })
                .catch(err => {
                    setLoading('error');
                    console.log(err)
                    setTimeout(() => setLoading(''), 1000);
                });


        } else {
            //refund
            setLoading("EGP" + Math.abs(price).toFixed(0) + ' Refund');
            let amountLeft = price;
            charges.forEach(c => {
                if (amountLeft > 0 && c.amount > 0) {
                    if (c.amount >= amountLeft) {
                        const body = {
                            amount: amountLeft,
                            chargeId: c.id
                        }
                        console.log(body)
                        axios.post(BACKEND_URL + 'payments/refund', body,{
                            headers: {
                                'Authorization': localStorage.getItem('token')
                            }
                        })
                            .then(response => {
                                console.log("RESPONSE", response.data);
                                setLoading('success');
                                onConfirm();
                            })
                            .catch(err => {
                                setLoading('error');
                                console.log(err)
                                setTimeout(() => setLoading(''), 1000);
                            });
                        amountLeft = 0;
                    } else {
                        const body = {
                            amount: c.amount,
                            chargeId: c.id
                        }
                        console.log(body)
                        axios.post(BACKEND_URL + 'payments/refund', body,{
                            headers: {
                                'Authorization': localStorage.getItem('token')
                            }
                        })
                            .then(response => {
                                console.log("RESPONSE", response.data);
                            })
                            .catch(err => {
                                setLoading('error');
                                console.log(err)
                                setTimeout(() => setLoading(''), 1000);
                            });
                        amountLeft = amountLeft - c.amount;
                    }
                }
            })

        }
    }

    const onConfirm = (e, payArray) => {
        let numOfAdults = props.numOfAdults
        let numOfChildren = props.numOfChildren;
        let numOfSeats = numOfAdults * 1 + numOfChildren * 1;

        numOfSeats = props.seatCount;

        let priceOfDept = props.deptFlightPriceReal;
        let priceOfRet = props.retFlightPriceReal;
        console.log(props)
        let cabin = props.chosenClass;
        let reservationId = props.reservationId
        let deptFlight = props.deptFlight;
        let deptFlightOld = props.deptFlightOld;
        let retFlight = props.retFlight;
        let retFlightOld = props.retFlightOld;
        let newCabin = props.newCabin;
        let oldCabin = props.oldCabin;

        if (!payArray) {
            payArray = payment;
        }



        //-------------------------------

        //-------------------------------

        switch (oldCabin) {
            case "Economy":
                console.log(numOfSeats + " updatett here")
                console.log(deptFlight)

                if (window.location.href.includes("Dept")) {
                    let deptSeatsOld = deptFlightOld.seatsEconomy;
                    deptSeatsOld = deptSeatsOld.map((s) => (s == userId) ? null : s)
                    // deptFlight = {  flightId: deptFlight.flightId, availableEconomy: deptFlight.availableEconomy - numOfSeats };
                    deptFlightOld = { flightId: deptFlightOld.flightId, availableEconomy: deptFlightOld.availableEconomy + numOfSeats, seatsEconomy: deptSeatsOld };
                }
                else if (window.location.href.includes("Ret")) {
                    let retSeatsOld = retFlightOld.seatsEconomy;
                    retSeatsOld = retSeatsOld.map((s) => (s == userId) ? null : s)
                    // retFlight = { flightId: retFlight.flightId, availableEconomy: retFlight.availableEconomy - numOfSeats };
                    retFlightOld = { flightId: retFlightOld.flightId, availableEconomy: retFlightOld.availableEconomy + numOfSeats, seatsEconomy: retSeatsOld };
                }
                break;
            case "First":
                if (window.location.href.includes("Dept")) {
                    let deptSeatsOld = deptFlightOld.seatsFirst;
                    deptSeatsOld = deptSeatsOld.map((s) => (s == userId) ? null : s)
                    // deptFlight = {  flightId: deptFlight.flightId, availableFirst: deptFlight.availableFirst - numOfSeats };
                    deptFlightOld = { flightId: deptFlightOld.flightId, availableFirst: deptFlightOld.availableFirst + numOfSeats, seatsFirst: deptSeatsOld };
                }
                else if (window.location.href.includes("Ret")) {
                    let retSeatsOld = retFlightOld.seatsFirst;
                    retSeatsOld = retSeatsOld.map((s) => (s == userId) ? null : s)
                    // retFlight = { flightId: retFlight.flightId, availableFirst: retFlight.availableFirst - numOfSeats };
                    retFlightOld = { flightId: retFlightOld.flightId, availableFirst: retFlightOld.availableFirst + numOfSeats, seatsFirst: retSeatsOld };
                }
                break;
            case "Business":
                if (window.location.href.includes("Dept")) {
                    let deptSeatsOld = deptFlightOld.seatsBusiness;
                    deptSeatsOld = deptSeatsOld.map((s) => (s == userId) ? null : s)
                    // deptFlight = {  flightId: deptFlight.flightId, availableBusiness: deptFlight.availableBusiness - numOfSeats };
                    deptFlightOld = { flightId: deptFlightOld.flightId, availableBusiness: deptFlightOld.availableBusiness + numOfSeats, seatsBusiness: deptSeatsOld };
                }
                else if (window.location.href.includes("Ret")) {
                    let retSeatsOld = retFlightOld.seatsBusiness;
                    retSeatsOld = retSeatsOld.map((s) => (s == userId) ? null : s)
                    //  retFlight = { flightId: retFlight.flightId, availableBusiness: retFlight.availableBusiness - numOfSeats };
                    retFlightOld = { flightId: retFlightOld.flightId, availableBusiness: retFlightOld.availableBusiness + numOfSeats, seatsBusiness: retSeatsOld };
                }
                break;
            default:
                console.log("Something went wrong");
        }
        switch (newCabin) {
            case "Economy":


                if (window.location.href.includes("Dept")) {

                    deptFlight = { flightId: deptFlight.flightId, availableEconomy: deptFlight.availableEconomy - numOfSeats };

                }
                else if (window.location.href.includes("Ret")) {

                    retFlight = { flightId: retFlight.flightId, availableEconomy: retFlight.availableEconomy - numOfSeats };

                }
                break;
            case "First":
                if (window.location.href.includes("Dept")) {

                    deptFlight = { flightId: deptFlight.flightId, availableFirst: deptFlight.availableFirst - numOfSeats };

                }
                else if (window.location.href.includes("Ret")) {

                    retFlight = { flightId: retFlight.flightId, availableFirst: retFlight.availableFirst - numOfSeats };

                }
                break;
            case "Business":
                if (window.location.href.includes("Dept")) {

                    deptFlight = { flightId: deptFlight.flightId, availableBusiness: deptFlight.availableBusiness - numOfSeats };

                }
                else if (window.location.href.includes("Ret")) {

                    retFlight = { flightId: retFlight.flightId, availableBusiness: retFlight.availableBusiness - numOfSeats };

                }
                break;
            default:
                console.log("Something went wrong");
        }

        console.table(deptFlightOld);


        console.table(payArray);
        if (window.location.href.includes("Ret")) {
            axios
                .put(BACKEND_URL + 'flights/update?flightId=' + retFlight?.flightId, retFlight,{
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res.data);

                    axios
                        .put(BACKEND_URL + 'flights/update?flightId=' + retFlightOld?.flightId, retFlightOld,{
                            headers: {
                                'Authorization': localStorage.getItem('token')
                            }
                        })
                        .then(res => {
                            console.log(res.data);

                            const data = {
                                to: retFlight?.flightId,
                                cabin: cabin,
                                price: priceOfDept + priceOfRet,
                                cabinArrival: cabin,
                                chargeId: payArray
                            }
                            axios
                                .put(BACKEND_URL + "reservations/update?_id=" + reservationId, data, {
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
                                    setLoading('');
                                    handleSendRes(e);
                                })
                                .catch(err => {
                                    console.log("Error updating reservation: " + err);
                                    setLoading('');
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
        else if (window.location.href.includes("Dept")) {
            axios
                .put(BACKEND_URL + 'flights/update?flightId=' + deptFlight?.flightId, deptFlight,{
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res.data);

                    axios
                        .put(BACKEND_URL + 'flights/update?flightId=' + deptFlightOld?.flightId, deptFlightOld,{
                            headers: {
                                'Authorization': localStorage.getItem('token')
                            }
                        })
                        .then(res => {
                            console.log(res.data);

                            const data = {

                                from: deptFlight?.flightId,
                                cabin: cabin,
                                price: priceOfDept + priceOfRet,
                                cabinDeparture: cabin,
                                chargeId: payArray
                            }
                            axios
                                .put(BACKEND_URL + "reservations/update?_id=" + reservationId, data,{
                                    headers:{
                                      'Authorization': localStorage.getItem('token')
                                    }
                                  })
                                .then(res => {
                                    console.log("reservation")
                                    console.log(res.data);
                                    props.setBookingNum(res.data._id);
                                    bookForHere = res.data._id;
                                    
                                    props.selectDept();
                                    setLoading('');
                                    handleSendRes(e);
                                })
                                .catch(err => {
                                    console.log("Error updating reservation: " + err);
                                    setLoading('');
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

                {(priceToFinalDisplay) <= 0 ? <div>Additional Fee: <p style={{ color: "red" }}> <span><b style={{ color: "black" }}>EGP</b>{Math.abs(priceToFinalDisplay).toFixed(0)}</span></p> </div> :
                    <div>Amount to be refunded: <p style={{ color: "green" }}> <span><b style={{ color: "black" }}>EGP</b>{Math.abs(priceToFinalDisplay).toFixed(0)}</span></p> </div>}
                <p className="passenger-font">(for {props.seatCount} passengers)</p>

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

                            <UIButton
                                onClick={toggleDialog}
                                text={"back"}
                                margin="10px"
                            />

                            {(priceToFinalDisplay) <= 0 ?
                                <StripeCheckout
                                    stripeKey="pk_test_51K9D6UA32Adg2XeIayrvPhQ3Y97itWgoKPGMDyhxforRJofQ1DmX0G66AUBJp2USDguA6DP5KAKireIv4DwbmYSh00oxYvRo7K"
                                    token={makePayment}
                                    name="Buy Ticket"
                                    amount={getPrice() * 100}
                                    email={JSON.parse(localStorage.getItem('user'))?.email}
                                    currency='egp'
                                >
                                    <UIButton
                                        text={"Confirm & Pay"}
                                        margin="10px"
                                        color="green"
                                    />
                                </StripeCheckout>
                                :
                                <UIButton
                                    onClick={makePayment}
                                    text={"Confirm & Refund"}
                                    margin="10px"
                                    color="green"
                                />}
                        </DialogActions>
                    </Dialog>

                    {loading && <LoadingPayment text={loading} />}
                </div>
            </div>

        </div>
    )
};

export default ResUpdateSummary;