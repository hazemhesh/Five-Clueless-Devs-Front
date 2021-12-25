import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import FlightCard from './FlightCard';

class SearchFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
  }

  componentDidMount() {
    axios
      .get(BACKEND_URL+"flights/search")
      .then(res => {
        this.setState({
          flights: res.data
        })
      })
      .catch(err =>{
        console.log('Error from SearchFlight');
      })
  };


  render() {
    const flights = this.state.flights;
    console.log("PrintFlight: " + flights);
    let flightList;

    if(!flights) {
      flightList = "there is no flight record!";
    } else {
      flightList = flights.map((flight, k) =>
        <FlightCard flight={flight} key={k} />
      );
    }

    return (
      <div className="SearchFlight">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">flights List</h2>
            </div>

          </div>

          <div className="list">
                {flightList}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFlight;