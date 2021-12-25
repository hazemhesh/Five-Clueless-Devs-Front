import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import FlightCard from './FlightCard';
import TextField from '@mui/material/TextField';
import './SearchFlightCriteria.css';
import { Button } from '@mui/material';
import UIButton from './UIButton/UIButton';

const SearchFlightCriteria = ({ location }) => {
  // const history = useHistory();
  // useState hooks for input and language

  const [flightRes, setResult] = useState([]);
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

  useEffect(() => {

    axios
      .get(BACKEND_URL + "flights/search?")
      .then(res => {
        console.log(res.data);
        setResult(res.data);
        console.log(flightRes);

      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const onChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
    console.log(flight);
  };

  // function for handling form submit
  const submitAction = (e) => {
    const usp = new URLSearchParams(flight);
    let keysForDel = [];
    usp.forEach((value, key) => {
      if (value === '') {
        keysForDel.push(key);
      }
    });

    keysForDel.forEach(key => {
      usp.delete(key);
    });
    console.log(usp.toString());
    // prevents default, so page won't reload on form submit

    e.preventDefault();
    axios
      .get(BACKEND_URL + "flights/search?" + usp.toString())
      .then(res => {
        console.log(res.data);
        setResult(res.data);
        console.log(flightRes);

      })
      .catch(err => {
        console.log(err);
      })

  };

  return (
    <>

      <div className='bg-dark text-light'>
        <div className='container pt-5' style={{ height: '100vh' }}>
          <h1 className="display-4 text-center">Search for flights</h1>


          <form onSubmit={submitAction} className='mt-5'>
            <div className='input-group'>
              <div className='criteria-form-group'>
                <div>
                  <TextField
                    id="outlined"
                    label="Flight ID"
                    className='form-control'
                    name="flightId"
                    value={flight.flightId}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div>

                  <TextField
                    id="outlined"
                    className='form-control'
                    label='Origin Country'
                    name="from"
                    value={flight.from}
                    onChange={(e) => onChange(e)}
                  />

                  <TextField
                    id="outlined"
                    className='form-control'
                    label='Destination Country'
                    name="to"
                    value={flight.to}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div>
                  <span className={flight.departureDate === "" ? "criteria-hide" : ""}>
                    <TextField
                      id="outlined"
                      type="date"
                      className='form-control'
                      label='Departure Date'
                      name="departureDate"
                      value={flight.departureDate}
                      onChange={(e) => onChange(e)}
                    />
                  </span>
                  <span className={flight.arrivalDate === "" ? "criteria-hide" : ""}>
                    <TextField
                      type='date'
                      className='form-control'
                      label='Arrival Date'
                      name="arrivalDate"
                      value={flight.arrivalDate}
                      onChange={(e) => onChange(e)}
                    />
                  </span>
                </div>

                <div>
                  <span className={`criteria-time ${flight.departureTime === "" ? "criteria-hide" : ""}`}>
                    <TextField
                      type='time'
                      className='form-control'
                      label='Departure Time'
                      name="departureTime"
                      value={flight.departureTime}
                      onChange={(e) => onChange(e)}
                    />
                  </span>
                  <span className={`criteria-time ${flight.arrivalTime === "" ? "criteria-hide" : ""}`}>
                    <TextField
                      type='time'
                      className='form-control'
                      label='Arrival Time'
                      name="arrivalTime"
                      value={flight.arrivalTime}
                      onChange={(e) => onChange(e)}
                    />
                  </span>
                </div>
                <div>
                  <TextField
                    id="outlined"
                    className='form-control'
                    label='Departure Terminal'
                    name="departureTerminal"
                    value={flight.departureTerminal}
                    onChange={(e) => onChange(e)}
                  />

                  <TextField
                    id="outlined"
                    className='form-control'
                    label='Arrival Terminal '
                    name="arrivalTerminal"
                    value={flight.arrivalTerminal}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined"
                    className='form-control'
                    label='Economy Seats'
                    name="availableEconomy"
                    value={flight.availableEconomy}
                    onChange={(e) => onChange(e)}
                  />

                  <TextField
                    id="outlined"
                    className='form-control'
                    label='Business Seats'
                    name="availableBusiness"
                    value={flight.availableBusiness}
                    onChange={(e) => onChange(e)}
                  />

                  <TextField
                    id="outlined"
                    className='form-control'
                    label='First Class Seats'
                    name="availableFirst"
                    value={flight.availableFirst}
                    onChange={(e) => onChange(e)}
                  />
                </div>


                <div className='input-group-append'>
                  {/* <Button variant="outlined" type="submit">Search</Button> */}

                  <UIButton
                    type={'submit'}
                    text={"Search"}
                    margin="10px"
                  />
                  {/* <button className='btn btn-primary' type='submit'>
                    Search
                  </button> */}
                </div>
                <div className="list">
                  {flightRes.map((flight, k) =>
                    <FlightCard flight={flight} key={k} />
                  )}
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchFlightCriteria;