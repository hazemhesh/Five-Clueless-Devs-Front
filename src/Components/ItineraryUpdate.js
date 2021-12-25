import React from 'react';
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

const ItineraryUpdate = (props) => {
    const flight = props.flight;

    // const history = useHistory();
    // const handleClick = () => {
    //     history.push(`/details/${flight.flightId}`)
    // }
    function createData(name, calories) {
        return { name, calories };
    }

    const getSeats = (seatsList) => {
        let seats = seatsList?.map(s => s.number);
        console.log(seatsList)
        return seats?.join(', ');
    }
    const rows = [
        createData('Flight Number', props.selectedDeptFlightId),
        createData('Departure Date and Time', props.deptFlightDeptTime + "   ,   " + props.deptFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.deptFlightArrivalTime + "  ,   " + props.deptFlightArrivalDate.substring(0, 10)),
        //createData('Chosen Class', props.chosenClass),



    ];
    const rowsR = [
        createData('Flight Number', props.retFlightId),
        createData('Departure Date and Time', props.retFlightDeptTime + "   ,   " + props.retFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.retFlightArrivalTime + "  ,   " + props.retFlightArrivalDate.substring(0, 10)),
      //  createData('Chosen Class', props.chosenClass),




    ];
    if (window.location.href.includes("Dept")) {
        rows.push(createData('Chosen Class', ` ${props.chosenClass}`));
        rows.push(createData('Chosen Seats', ` ${getSeats(props.deptSeats)}`));
        rowsR.push( createData('Chosen Class', props.oldCabinReturn));
        rowsR.push(createData('Chosen Seats', ` ${props.retSeats}`));
        
       
    }
    else if (window.location.href.includes("Ret")) {
        rows.push(createData('Chosen Class', ` ${props.oldCabinDept}`));
        rows.push(createData('Chosen Seats', ` ${props.deptSeats}`));
        rowsR.push( createData('Chosen Class', props.chosenClass));
        rowsR.push(createData('Chosen Seats', ` ${getSeats(props.retSeats)}`));
      
       
        
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

                <div>Booking Number: <p> <span>{props.bookingNum?.toUpperCase()}</span></p> </div>

            </div>


        </div>
    )
};

export default ItineraryUpdate;