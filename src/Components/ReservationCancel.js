import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';
import './ReservationCancel.css';
import UIButton from './UIButton/UIButton';
import LoadingPayment from './LoadingPayment/LoadingPayment';

const ReservationCancel = (props) => {
  const history = useHistory();
  const from = props.from;
  const to = props.to;
  const userid = props.userid;
  const toSeats = props.toSeats;
  const fromSeats = props.fromSeats;
  const cabin = props.cabin;
  const cabinDeparture = props.cabinDeparture;
  const cabinReturn = props.cabinReturn;
  const reservationID = props.reservationId;
  const chosenFromSeat = props.chosenFromSeat;
  const chosenToSeat = props.chosenToSeat;
  const departureFromCountry = props.departureFromCountry;
  const departureToCountry = props.departureToCountry;

  const fromObj = props.fromflight;
  const toObj = props.toflight;

  let seatCount = props.seatCount;

  let f;
  let t;
  //let{id,from,to}=useParams();

  const [fromflight, setfromFlight] = useState({
    availableEconomy: '',
    availableBusiness: '',
    availableFirst: '',
    seatsBusiness: [],
    seatsEconomy: [],
    seatsFirst: []
  });

  const [toflight, settoFlight] = useState({
    availableEconomy: '',
    availableBusiness: '',
    availableFirst: '',
    seatsBusiness: [],
    seatsEconomy: [],
    seatsFirst: []
  });
  const [showConfirm, setConfirm] = useState(false);

  const toggleDialog = () => {
    setConfirm(!showConfirm);
  }


  const [reservation, setReservation] = useState({});
  useEffect(() => {
    axios.get(BACKEND_URL + "reservations/GetReservation?_id=" + reservationID,{
      headers:{
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(res => {
        setReservation(res.data[0]);
        console.log(res.data[0])
      }).catch(err => console.log(err));
  }, []);



  const OnCancel = () => {
    let SeatFrom = [];
    let SeatTo = [];
    let countFrom = 0;
    let countTo = 0;

    for (let i = 0; i < fromSeats.length; i++) {
      if (fromSeats[i] == userid) {
        SeatFrom[i] = null;
        countFrom++;
      }
      else
        SeatFrom[i] = fromSeats[i];
    }

    console.log(SeatFrom);
    for (let i = 0; i < toSeats.length; i++) {
      if (toSeats[i] == userid) {
        SeatTo[i] = null;
        countTo++;
      }
      else {
        SeatTo[i] = toSeats[i];
      }
    }

    console.log(cabin);

    switch (cabin) {
      case "Economy":
        // setfromFlight({ ...fromObj, availableEconomy: fromObj?.availableEconomy + countFrom, seatsEconomy: SeatFrom });
        // settoFlight({ ...toObj, availableEconomy: toObj?.availableEconomy + countTo, seatsEconomy: SeatTo });

        f = { ...fromObj, availableEconomy: fromObj?.availableEconomy + countFrom, seatsEconomy: SeatFrom };
        t = { ...toObj, availableEconomy: toObj?.availableEconomy + countTo, seatsEconomy: SeatTo }
        break;
      case "First":
        // setfromFlight({ ...fromObj, availableFirst: fromObj?.availableFirst + countFrom, seatsFirst: SeatFrom });
        // settoFlight({ ...toObj, availableFirst: toObj?.availableFirst + countTo, seatsFirst: SeatTo });
        f = { ...fromObj, availableFirst: fromObj?.availableFirst + countFrom, seatsFirst: SeatFrom };
        t = { ...toObj, availableFirst: toObj?.availableFirst + countTo, seatsFirst: SeatTo };
        break;
      case "Business":
        // setfromFlight({ ...fromObj, availableBusiness: fromObj?.availableBusiness + countFrom, seatsBusiness: SeatFrom });
        // settoFlight({ ...toObj, availableBusiness: toObj?.availableBusiness + countTo, seatsBusiness: SeatTo });

        f = { ...fromObj, availableBusiness: fromObj?.availableBusiness + countFrom, seatsBusiness: SeatFrom };
        t = { ...toObj, availableBusiness: toObj?.availableBusiness + countTo, seatsBusiness: SeatTo };
        break;
      default:
        console.log("Something went wrong");
    }


    console.log(f);
    console.log(t);
  };


  const [loading, setLoading] = useState('');
  const onSubmit = (e) => {
    OnCancel();
    props.handleSend(e);
    e.preventDefault();
    setLoading( "EGP" + props.reservationPrice + ' Refund');
    axios
      .put(BACKEND_URL + 'flights/update?flightId=' + from, f,{
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
      .then(res => {
        console.log(res.data);
        axios
          .put(BACKEND_URL + 'flights/update?flightId=' + to, t,{
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
          .then(res => {
            console.log(res.data);
            axios
              .delete(BACKEND_URL + "reservations/cancelReservation?_id=" + reservationID)
              .then(res => {
                console.log(reservation?.chargeId)
                reservation?.chargeId.forEach(cId => {
                  const body = {
                    chargeId: cId
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
                      setTimeout(() => history.push("/Reserved-flights"), 500)
                    })
                    .catch(err => {
                      setLoading('error');
                      console.log(err)
                      setTimeout(() => setLoading(''), 1000);
                    });
                  
                })
              })
              .catch(err => {
                console.log("Error form Cancel Resrevation");
                console.log(err);
              })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  };
  return (


    <div>
      <div className='buttonUnder'>

        <Button className="updateButton" style={{ marginBottom: "10px", marginTop: "-10px" }} onClick={(e) => history.push(
          {
            pathname: '/Reservation-Update-Dept',
            state: {
              departureFrom: { departureFromCountry }, departureTo: { departureToCountry }, numberOfFromSeats: { chosenFromSeat },
              departFlight: { fromObj }, returnFlight: { toObj }, seatNum: { seatCount }, cabin: { cabin }, reservationId: { reservationID }, cabinDeparture: { cabinDeparture },
              chosenToSeat: { chosenToSeat }, cabinReturn: { cabinReturn }
            }
          })
        }>Update Depart Reservation</Button>
        <Button className="updateButton" style={{ marginBottom: "10px", marginTop: "-10px" }} onClick={(e) => history.push(
          {
            pathname: '/Reservation-Update-Ret',
            state: {
              departureFrom: { departureFromCountry }, departureTo: { departureToCountry }, numberOfFromSeats: { chosenFromSeat },
              departFlight: { fromObj }, returnFlight: { toObj }, seatNum: { seatCount }, cabin: { cabin }, reservationId: { reservationID }, cabinReturn: { cabinReturn },
              chosenFromSeat: { chosenFromSeat }, cabinDeparture: { cabinDeparture }
            }
          })
        }>Update Return Reservation</Button>



      </div>
      <div>Booking Number: <span>{props.bookingId}</span></div>
      <div style={{ marginBottom: "20px" }} >Total Price: EGP <span>{props.reservationPrice}</span></div>


      <UIButton
        onClick={toggleDialog}
        text={"Cancel Reservation"}
        margin="10px"
        color="red"
      />

      {/* <Button variant="outlined" color="error" onClick={toggleDialog}>Cancel Reservation</Button> */}
      <div>
        <Dialog
          open={showConfirm}
          onClose={toggleDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to cancel the reservation?"}
          </DialogTitle>
          <DialogActions>
            {/* <Button onClick={toggleDialog} variant="text">back </Button> */}
            <UIButton
              onClick={toggleDialog}
              text={"back"}
              margin="10px"
            />

            <UIButton
              onClick={onSubmit}
              text={"Cancel Reservation"}
              margin="10px"
              color="red"
            />
            {/* <Button onClick={onSubmit} variant="text" color="error">cancel Reservation</Button> */}
          </DialogActions>
        </Dialog>

        {loading && <LoadingPayment text={loading} />}

        {/* {showConfirm && <LoadingPayment text={"error"} />} */}

      </div>

    </div>
  )
}
export default ReservationCancel;