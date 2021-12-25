import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';
import UIButton from './UIButton/UIButton';


const ViewDetailsUser = () => {

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
    baggageAllowance: '',
    duration: ''
  });
  let { id } = useParams();

  useEffect(() => {
    console.log("Print id: " + { id });
    axios
      .get(BACKEND_URL + "flights/searchUser?flightId=" + id)
      .then(res => {
        console.log(res.data);
        setFlight(res.data[0] || {});
      })
      .catch(err => {
        console.log(err);
      })
  }
    , []);




  return (
    <div className="ViewFlight">
      <div className="container">
        <div className="row">
          <br />
          <div className="col-md-8 m-auto">
            <h1 style={{marginBottom:"15px"}}  className="display-4 text-center">Flights' Record</h1>
            {/* <p className="lead text-center">
              View Flights' Info
            </p>
            <hr /> <br /> */}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Table sx={{ maxWidth: 500 }} className="table table-hover table-dark">
              {/* <thead>
          <TableRow>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </TableRow>
        </thead> */}
              <TableBody>
                <TableRow>
                  {/* <th scope="row">1</th> */}
                  <TableCell>Flight ID</TableCell>
                  <TableCell>{flight.flightId}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">2</th> */}
                  <TableCell>Origin Country</TableCell>
                  <TableCell>{flight.from}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">3</th> */}
                  <TableCell>Destination</TableCell>
                  <TableCell>{flight.to}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">4</th> */}
                  <TableCell>Departure Date</TableCell>
                  <TableCell>{flight.departureDate.substring(0, 10)}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">5</th> */}
                  <TableCell>Arrival Date</TableCell>
                  <TableCell>{flight.arrivalDate.substring(0, 10)}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">6</th> */}
                  <TableCell>Departure Time</TableCell>
                  <TableCell>{flight.departureTime}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">7</th> */}
                  <TableCell>Arrival Time</TableCell>
                  <TableCell>{flight.arrivalTime}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">8</th> */}
                  <TableCell>Available Economy Seats</TableCell>
                  <TableCell>{flight.availableEconomy}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">9</th> */}
                  <TableCell>Available Business Seats</TableCell>
                  <TableCell>{flight.availableBusiness}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">10</th> */}
                  <TableCell>Available First Class Seats</TableCell>
                  <TableCell>{flight.availableFirst}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">11</th> */}
                  <TableCell>Baggage Allowance</TableCell>
                  <TableCell>{flight.baggageAllowance}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">12</th> */}
                  <TableCell>Duration</TableCell>
                  <TableCell>{flight.duration}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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

            {/* 
            <Button
              onClick={() => history.push(`/update-flight/${id}`)}
              variant="outlined"
              style={{ marginRight: "10px" }}
            > Edit </Button> */}

            <UIButton
              onClick={() => history.push(`/update-flight/${id}`)}
              text={"Edit"}
              margin="10px"
            />

            {/* <Button
              onClick={() => history.push(`/search-user/${id}`)}
              variant="outlined"
              style={{ marginRight: "10px" }}
            > Back </Button> */}

            <UIButton
              onClick={() => history.push(`/search-user/${id}`)}
              text={"Back"}
              margin="10px"
            />


          </div>
        </div>
      </div>




    </div>
  )
}

export default ViewDetailsUser;