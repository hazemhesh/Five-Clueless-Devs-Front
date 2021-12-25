import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import UIButton from './UIButton/UIButton';


const ViewFlightDetails = () => {

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
    departureTerminal: ''
  });
  let { id } = useParams();

  useEffect(() => {
    console.log("Print id: " + { id });
    axios
      .get(BACKEND_URL + "flights/search?flightId=" + id)
      .then(res => {
        console.log(res.data);
        setFlight(res.data[0] || {});
      })
      .catch(err => {
        console.log(err);
      })
  }
    , []);



  const onDeleteConfirm = () => {
    axios
      .delete(BACKEND_URL + "flights/deleteFlight?flightId=" + id,{
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
      .then(res => {
        history.push("/search");
      })
      .catch(err => {
        console.log("Error form ViewFlightDetails_deleteClick");
        console.log(err);
      })
  };
  const [showConfirm, setConfirm] = useState(false);
  const setConfirmButton = () => {
    setConfirm(true)
    // setDelete(false)
  };

  const [showDelete, setDelete] = useState(true);
  const setDeleteButton = () => {
    showDelete(false)
  };

  const toggleDialog = () => {
    setConfirm(!showConfirm);
  }


  return (
    <div className="ViewFlight">
      <div className="container">
        <div className="row">
          <br />
          <div className="col-md-8 m-auto">
            <h1 style={{ marginBottom: "15px" }} className="display-4 text-center">Flights' Record</h1>
            {/* <p className="lead text-center">
              View Flights' Info
            </p>
            <hr /> <br /> */}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className='view-user-card'>
              <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 500 }} className="table table-hover table-dark">
                  <TableBody>
                    <TableRow>
                      {/* <th scope="row">1</th> */}
                      <TableCell><span className="info-header-font">Flight ID</span></TableCell>
                      <TableCell align="right">{flight.flightId}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">2</th> */}
                      <TableCell><span className="info-header-font">Origin Country</span></TableCell>
                      <TableCell align="right">{flight.from}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">3</th> */}
                      <TableCell><span className="info-header-font">Destination</span></TableCell>
                      <TableCell align="right">{flight.to}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">4</th> */}
                      <TableCell><span className="info-header-font">Departure Date</span></TableCell>
                      <TableCell align="right">{flight.departureDate.substring(0, 10)}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">5</th> */}
                      <TableCell><span className="info-header-font">Arrival Date</span></TableCell>
                      <TableCell align="right">{flight.arrivalDate.substring(0, 10)}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">6</th> */}
                      <TableCell><span className="info-header-font">Departure Time</span></TableCell>
                      <TableCell align="right">{flight.departureTime}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">7</th> */}
                      <TableCell><span className="info-header-font">Arrival Time</span></TableCell>
                      <TableCell align="right">{flight.arrivalTime}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">8</th> */}
                      <TableCell><span className="info-header-font">Available Economy Seats</span></TableCell>
                      <TableCell align="right">{flight.availableEconomy}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">9</th> */}
                      <TableCell><span className="info-header-font">Available Business Seats</span></TableCell>
                      <TableCell align="right">{flight.availableBusiness}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">10</th> */}
                      <TableCell><span className="info-header-font">Available First Class Seats</span></TableCell>
                      <TableCell align="right">{flight.availableFirst}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">11</th> */}
                      <TableCell><span className="info-header-font">Departure Terminal</span></TableCell>
                      <TableCell align="right">{flight.departureTerminal}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">12</th> */}
                      <TableCell><span className="info-header-font">Arrival Terminal</span></TableCell>
                      <TableCell align="right">{flight.arrivalTerminal}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
          </div>

          <div className="col-md-6" style={{ margin: "10px" }}>
            {/* <Link to={`/update-flight/${id}`} className="btn btn-outline-info btn-lg btn-block">
              Edit Flights
            </Link>
            <br /> */}

            {/* <Button
              onClick={() => history.push(`/update-flight/${id}`)}
              variant="outlined"
              style={{ marginRight: "10px" }}
            > Edit </Button> */}

            <UIButton
              onClick={() => history.push(`/update-flight/${id}`)}
              text={"Edit"}
              margin="10px"
            />

            {/* {showDelete ? <Button onClick={setConfirmButton} variant="outlined" color="error">Delete </Button> : null} */}
            {showDelete ? <UIButton
              onClick={setConfirmButton}
              text={"Delete"}
              margin="10px"
              color={'red'}
            /> : null}

            {/* {showConfirm ? <Button onClick={onDeleteConfirm} variant="outlined" color="error">Confirm</Button> : null} */}

          </div>
        </div>
      </div>


      <div>
        <Dialog
          open={showConfirm}
          onClose={toggleDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this flight?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={toggleDialog} variant="text">Cancel </Button>
            <Button onClick={onDeleteConfirm} variant="text" color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>

    </div>
  )
}

export default ViewFlightDetails;