import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import "./DepartureFlightCard.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Table, TableBody, TableCell, TableRow, IconButton } from '@mui/material';

const FlightCard = (props) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const moment = require('moment')
    const flight = props.flight;
    const whichClassName = () => {
        if (props.chosenClass == "Economy") {
            return "Economy"
        }
        else if (props.chosenClass == "Business") {
            return "Business"
        }
        else {
            return "First"
        }
    }
    const whichClass = () => {
        if (props.chosenClass == "Economy") {
            return flight.availableEconomy
        }
        else if (props.chosenClass == "Business") {
            return flight.availableBusiness
        }
        else {
            return flight.availableFirst
        }
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const history = useHistory();
    const handleClick = () => {
        props.data();
        props.passDeptId(flight.flightId);
        props.passDeptFrom(flight.from);
        props.passDeptTo(flight.to);
        props.passDeptDuration(flight.duration);
        props.passDeptFlightDeptTime(flight.departureTime)
        props.passDeptFlightArrivalTime(flight.arrivalTime)
        props.passDeptFlightDeptDate(flight.departureDate)
        props.passDeptFlightArrivalDate(flight.arrivalDate)
        props.passDeptFlightPrice(checkTotal())

        console.log(flight);
        props.passSelectedDeptFlight(flight);
        console.log(flight.flightId);
    }
    const getDuration = (flight) => {
        let depDate = moment(flight?.departureDate?.substring(0, 10) + "T" + flight?.departureTime + ":00");
        let arrDate = moment(flight?.arrivalDate?.substring(0, 10) + "T" + flight?.arrivalTime + ":00");
        let durationInMins = arrDate.diff(depDate, 'minutes');
        let durHours = Math.floor(durationInMins / 60);
        durationInMins = durationInMins - 60 * durHours;
        return `${durHours} hours and ${durationInMins} minutes`;
    }
    const popUp = () => {
        history.push(`/details/${flight.flightId}`)
    }
    const onClick = (e) => {
        document.getElementById(e.target.id).disabled = true;
        console.log(e.target.id);
        console.log(e.target.value);
        console.log(props);
    }
    const checkTotal = () => {
        if (props.chosenClass == "Economy") {
            return +(flight.price * (props.numOfAdults + props.numOfChildren)).toFixed(2)
        }
        else if (props.chosenClass == "Business") {
            return +(1.2 * (flight.price * (props.numOfAdults + props.numOfChildren))).toFixed(2)
        }
        else if (props.chosenClass == "First") {
            return +(1.4 * (flight.price * (props.numOfAdults + props.numOfChildren))).toFixed(2)
        }
    }

    return (
        <div className="card-container">
            {/* <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fetraveltech.com%2Fwp-content%2Fuploads%2F2021%2F09%2FMW-HE536_airpla_20190225131547_ZH.jpg&imgrefurl=https%3A%2F%2Fetraveltech.com%2Fcheap-flights-cairo-from-to-hurghada%2F&tbnid=-LhKiDUJLgmoMM&vet=12ahUKEwjz18q7vf_zAhXiMewKHadADmkQMygDegUIARDNAQ..i&docid=0R9RSPJABoN1lM&w=890&h=501&q=flight&ved=2ahUKEwjz18q7vf_zAhXiMewKHadADmkQMygDegUIARDNAQ" alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/details/${flight.flightId}`}>
                        {flight.flightId}
                    </Link>
                </h2>
                <h3>{flight.from}</h3>
                <p>{flight.to}</p>
            </div> */}

            <div className="flight-card-search" >
                <div className="flight-card-left">
                    <div className="head-card head-card2">
                        <p className="flight-card-head-type">Departure</p>
                        <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                            alt="airplaneDepart"
                            width="27px"
                            height="27px" /></div>
                    <p className="flight-card-airport">{flight?.from}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${flight.departureDate.substring(0, 10)}  ${flight.departureTime}`}</p>
                    {/* <p className="flight-card-date">{}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{flight.departureTerminal}</p>
                </div>

                <div className="">
                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Generic_turbofan_airplane.svg"
                        alt="airplane"
                        width="80px"
                        height="40px"
                    />
                    <p className="flight-card-head">flight number</p>
                    <p className="flight-card-date">{flight.flightId}</p>
                    <div className="middle-duration">
                        <img src="https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/000000/external-flight-meeting-photo3ideastudio-lineal-photo3ideastudio.png"
                            alt="airplaneDuration"
                            width="40px"
                            height="40px" />

                        <p className="flight-card-duration">Duration {getDuration(flight)} </p>
                    </div>

                </div>

                <div className="flight-card-right">
                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>
                    <p className="flight-card-airport">{flight?.to}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${flight.arrivalDate.substring(0, 10)}  ${flight.arrivalTime}`}</p>
                    {/* <p className="flight-card-date">{flight.arrivalTime}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{flight.arrivalTerminal}</p>

                </div>
                <div className="flight-card-right-buttons">
                    <button className="buttonClass" type="button" id="selection" value={flight.flightId} onClick={handleClick}>Select</button>
                    <p className="view-detail" onClick={handleOpen}>View Details</p>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <IconButton onClick={handleClose} aria-label="fingerprint"  >
                                    x
                                </IconButton>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Flight Details
                                </Typography>
                            </div>
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
                                        {/* <th scope="row">12</th> */}
                                        <TableCell>Cabin</TableCell>
                                        <TableCell>{props.chosenClass}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {/* <th scope="row">8</th> */}
                                        <TableCell>Available {whichClassName()} Seats</TableCell>
                                        <TableCell>{whichClass()}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        {/* <th scope="row">11</th> */}
                                        <TableCell>Departure Terminal</TableCell>
                                        <TableCell>{flight.departureTerminal}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {/* <th scope="row">12</th> */}
                                        <TableCell>Arrival Terminal</TableCell>
                                        <TableCell>{flight.arrivalTerminal}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableRow>
                                    {/* <th scope="row">12</th> */}
                                    <TableCell>Baggage Allowance</TableCell>
                                    <TableCell>{flight.baggageAllowance}</TableCell>
                                </TableRow>
                            </Table>
                        </Box>
                    </Modal>
                    <div className="middle-price">
                        <p> <span><b>EGP</b>{checkTotal()}</span></p>
                    </div>
                    <p className="passenger-font" onClick={handleClick}>(for {props.numOfAdults + props.numOfChildren} passengers)</p>
                </div>

            </div>

        </div>
    )
};

export default FlightCard;