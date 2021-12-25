import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';
import UIButton from './UIButton/UIButton';


const Confirmation = () => {
  /* const id = props.id;
   const from = props.from;
   const too = props.to;
   const cabinClass = props.cabin;*/

  let Uid = JSON.parse(localStorage.getItem('user'))?._id;
  let from = 79;
  let too = 8;
  let cabinClass = "Economy";


  const history = useHistory();

  const [fromflight, setfromFlight] = useState({
    availableEconomy: '',
    availableBusiness: '',
    availableFirst: '',
    seatsBusiness: '',
    seatsEconomy: '',
    seatsFirst: ''
  });

  const [toflight, settoFlight] = useState({
    availableEconomy: '',
    availableBusiness: '',
    availableFirst: '',
    seatsBusiness: '',
    seatsEconomy: '',
    seatsFirst: ''
  });

  const [showConfirm, setConfirm] = useState(false);

  const toggleDialog = () => {
    setConfirm(!showConfirm);
  }
  useEffect(() => {
    OnConfirm();
  }, []);

  const OnConfirm = () => {
    //let{id,from,to}=useParams();

    var tempFromEconomy = [];
    var tempFromFirst = [];
    var tempFromBusiness = [];
    var temptoEconomy = [];
    var temptoFirst = [];
    var temptoBusiness = [];
    let tempAvailableE;
    let tempAvailableF;
    let tempAvailableB;
    let temptoAvailableB;
    let temptoAvailableE;
    let temptoAvailableF;

    axios
      .get(BACKEND_URL + "flights/search?flightId=" + from)
      .then(res => {
        console.log(res.data[0]);
        tempFromEconomy = [...res.data[0].seatsEconomy];
        tempFromFirst = [...res.data[0].seatsFirst];
        tempFromBusiness = [...res.data[0].seatsBusiness];
        tempAvailableE = res.data[0].availableEconomy;
        tempAvailableB = res.data[0].availableBusiness;
        tempAvailableF = res.data[0].availableFirst;
        console.log(tempFromEconomy);
        console.log(tempAvailableE);
        axios
          .get(BACKEND_URL + "flights/search?flightId=" + too)
          .then(res => {
            console.log(res.data[0]);
            temptoEconomy = [...res.data[0].seatsEconomy];
            temptoFirst = [...res.data[0].seatsFirst];
            temptoBusiness = [...res.data[0].seatsBusiness];
            temptoAvailableE = res.data[0].availableEconomy;
            temptoAvailableB = res.data[0].availableBusiness;
            temptoAvailableF = res.data[0].availableFirst;
            console.log(temptoEconomy);
            console.log(temptoAvailableE);
          })
          .catch(err => {
            console.log(err);
          })
        // console.log(tempFromEconomy);
        var temp1 = [];
        var temp2 = [];
        let temp3;
        let temp4;

        switch (cabinClass) {
          case "Economy":
            temp1 = tempFromEconomy;
            temp2 = temptoEconomy;
            temp3 = tempAvailableE;
            temp4 = temptoAvailableE;
          case "First":
            temp1 = tempFromFirst;
            temp2 = temptoFirst;
            temp3 = tempAvailableF;
            temp4 = temptoAvailableF;
          case "Business":
            temp1 = tempFromBusiness;
            temp2 = temptoBusiness;
            temp3 = tempAvailableB;
            temp4 = temptoAvailableB;
        }

        // console.log(temp1);
        //console.log(temp2);
        //let Uid="10";
        //  var SeatFrom=[];
        //var SeatTo=[];
        let countFrom = 0;
        let countTo = 0;
        // for(let i=0;i<temp1.length;i++){
        if (temp1[0] == null) {
          temp1[0] = 10;
          countFrom++;
          console.log(countFrom);
        }
        // else
        //SeatFrom[2]=temp1[2];
        // }
        //setSeatsFrom(SeatFrom);
        console.log(temp1);
        // for(let i=0;i<temp2.length;i++){
        if (temp2[0] == null) {
          temp2[0] = 10;
          countTo++;
        }
        // else{
        //   SeatTo[2]=temp2[2];
        //}

        // }
        switch (cabinClass) {
          case "Economy":
            setfromFlight({ ...fromflight, availableEconomy: fromflight.availableEconomy - countFrom, seatsEconomy: temp1 });
            settoFlight({ ...toflight, availableEconomy: toflight.availableEconomy - countTo, seatsEconomy: temp2 });
            break;
          case "First":
            setfromFlight({ ...fromflight, availableFirst: fromflight.availableEconomy - countFrom, seatsFirst: temp1 });
            settoFlight({ ...toflight, availableFirst: toflight.availableEconomy - countTo, seatsFirst: temp1 });
            break;
          case "Business":
            setfromFlight({ ...fromflight, availableBusiness: fromflight.availableEconomy - countFrom, seatsBusiness: temp1 });
            settoFlight({ ...toflight, availableBusiness: toflight.availableEconomy - countTo, seatsBusiness: temp1 });
            break;
          default:
            console.log("Something went wrong");
        }
        //setSeatsTO(SeatTo);
      })
      .catch(err => {
        console.log(err);
      })



  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(BACKEND_URL + 'flights/update?flightId=' + from, fromflight,{
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
      .then(res => {
        console.log(res.data);
        axios
          .put(BACKEND_URL + 'flights/update?flightId=' + too, toflight,{
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
          .then(res => {
            console.log(res.data);

            const data = {
              UserID: Uid,
              from: from,
              to: too,
              cabin: cabinClass
            }
            axios
              .post(BACKEND_URL + "reservations/createReservation", data)
              .then(res => {
                console.log("added successfully");
                //history.push("/Reserved-flights");
              })
              .catch(err => {
                console.log("Error from Confirm Resrevation");
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
      {/* <Button variant="outlined" ></Button> */}
      <UIButton
        onClick={onSubmit}
        text={"Confirm"}
        margin="10px"
      />
    </div>
    /*  <div>
             <Dialog
               open={showConfirm}
               onClose={toggleDialog}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
             >
               <DialogTitle id="alert-dialog-title">
                 {"Are you sure you want to reserve this flight?"}
               </DialogTitle>
               <DialogActions>
                 <Button onClick={toggleDialog} variant="text">back </Button>
                 <Button onClick={onSubmit} variant="text" color="error">Confirm</Button>
               </DialogActions>
             </Dialog>
           </div> */
  )
}

export default Confirmation;