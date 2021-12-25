import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import "./FlightCard.css";

const FlightCard = (props) => {
    const flight = props.flight;

    const history = useHistory();
    const handleClick = () => {
        history.push(`/details/${flight.flightId}`)
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

            <div className="flight-card" onClick={handleClick}>
                <div className="flight-card-left">
                    <p className="flight-card-head">departure</p>
                    <p className="flight-card-airport">{flight?.from}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${flight.departureDate.substring(0, 10)}  ${flight.departureTime}`}</p>
                    {/* <p className="flight-card-date">{}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{flight.departureTerminal}</p>
                </div>

                <div className="">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Generic_turbofan_airplane.svg"
                        alt="airplane"
                        width="80px"
                        height="40px"
                    />
                     <p className="flight-card-head">flight number</p>
                    <p className="flight-card-date">{flight.flightId}</p>
                </div>

                <div className="flight-card-right">
                    <p className="flight-card-head">arrival</p>
                    <p className="flight-card-airport">{flight?.to}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${flight.arrivalDate.substring(0, 10)}  ${flight.arrivalTime}`}</p>
                    {/* <p className="flight-card-date">{flight.arrivalTime}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{flight.arrivalTerminal}</p>

                </div>
            </div>

        </div>
    )
};

export default FlightCard;