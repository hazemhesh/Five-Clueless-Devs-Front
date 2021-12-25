import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import "./FlightCard.css";
import "./ReservedFlight.css";
const ReservedFlightCard = (props) => {

    const moment=require('moment');
    const userId =props.userId;
    console.log(userId);
    const fromflight = props.from;
    const toflight = props.to;
    const history = useHistory();
    const handleClick = () => {
        // history.push(`/summary/${fromflight.flightId}/${toflight.flightId}`)
        history.push(`/summary/${props.resevationId}`)
       console.log("entered");
    }
    const getDuration = (flight) => {
        let depDate = moment(flight?.departureDate?.substring(0, 10) + "T" + flight?.departureTime + ":00");
        let arrDate = moment(flight?.arrivalDate?.substring(0, 10) + "T" + flight?.arrivalTime + ":00");
        let durationInMins = arrDate.diff(depDate, 'minutes');
        let durHours = Math.floor(durationInMins / 60);
        durationInMins = durationInMins - 60 * durHours;
        return `${durHours} hours and ${durationInMins} minutes`;
    }

    return (
    //     <div className="card-container">
    //         {/* <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fetraveltech.com%2Fwp-content%2Fuploads%2F2021%2F09%2FMW-HE536_airpla_20190225131547_ZH.jpg&imgrefurl=https%3A%2F%2Fetraveltech.com%2Fcheap-flights-cairo-from-to-hurghada%2F&tbnid=-LhKiDUJLgmoMM&vet=12ahUKEwjz18q7vf_zAhXiMewKHadADmkQMygDegUIARDNAQ..i&docid=0R9RSPJABoN1lM&w=890&h=501&q=flight&ved=2ahUKEwjz18q7vf_zAhXiMewKHadADmkQMygDegUIARDNAQ" alt="" />
    //         <div className="desc">
    //             <h2>
    //                 <Link to={`/details/${flight.flightId}`}>
    //                     {flight.flightId}
    //                 </Link>
    //             </h2>
    //             <h3>{flight.from}</h3>
    //             <p>{flight.to}</p>
    //         </div> */}

    //         <div className="flight-card" onClick={handleClick}>
    //             <div className="flight-card-left">
    //                 <p className="flight-card-head">departure flight</p>
    //                 <p className="flight-card-airport">{fromflight?.from}</p>
    //                 <p className="flight-card-airport">{fromflight?.to}</p>
    //                 <p className="flight-card-head"> departure date</p>
    //                 <p className="flight-card-date">{`${fromflight?.departureDate?.substring(0, 10)}  ${fromflight?.departureTime}`}</p>
    //                 <p className="flight-card-head"> arrival date</p>
    //                 <p className="flight-card-date">{`${fromflight?.arrivalDate?.substring(0, 10)}  ${fromflight?.arrivalTime}`}</p>
    //                 {/* <p className="flight-card-date">{}</p> */}
    //                 <p className="flight-card-head">departure terminal</p>
    //                 <p className="flight-card-terminal">{fromflight?.departureTerminal}</p>
    //                 <p className="flight-card-head">arrival terminal</p>
    //                 <p className="flight-card-terminal">{fromflight?.arrivalTerminal}</p>
    //             </div>

    //             <div className="">
    //                 <img
    //                     src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Generic_turbofan_airplane.svg"
    //                     alt="airplane"
    //                     width="80px"
    //                     height="40px"
    //                 />
    //                  <p className="flight-card-head">departure flight number</p>
    //                 <p className="flight-card-date">{fromflight?.flightId}</p>
    //                 <p className="flight-card-head">return flight number</p>
    //                 <p className="flight-card-date">{toflight?.flightId}</p>
    //             </div>

    //             <div className="flight-card-right">
    //                 <p className="flight-card-head">return flight</p>
    //                 <p className="flight-card-airport">{toflight?.from}</p>
    //                 <p className="flight-card-airport">{toflight?.to}</p>
    //                 <p className="flight-card-head"> departure date</p>
    //                 <p className="flight-card-date">{`${toflight?.departureDate?.substring(0, 10)}  ${toflight?.departureTime}`}</p>
    //                 <p className="flight-card-head">arrival date</p>
    //                 <p className="flight-card-date">{`${toflight?.arrivalDate?.substring(0, 10)}  ${toflight?.arrivalTime}`}</p>
    //                 {/* <p className="flight-card-date">{flight.arrivalTime}</p> */}
    //                 <p className="flight-card-head">departure terminal</p>
    //                 <p className="flight-card-terminal">{toflight?.departureTerminal}</p>
    //                 <p className="flight-card-head">arrival terminal</p>
    //                 <p className="flight-card-terminal">{toflight?.arrivalTerminal}</p>


    //             </div>
    //         </div>

    //     </div>
    // )
    <div className="card-containerRes" onClick={handleClick} style={{marginBottom:'40px'}}>
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

            <div className="flight-card-searchRes"  >
                <div className="flight-card-left" >
                    <div className="head-card head-card2">
                        <p className="flight-card-head-type">Departure</p>
                        <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                            alt="airplaneDepart"
                            width="27px"
                            height="27px" /></div>
                    <p className="flight-card-airport">{fromflight?.from}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${fromflight?.departureDate.substring(0, 10)}  ${fromflight?.departureTime}`}</p>
                    {/* <p className="flight-card-date">{}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{fromflight?.departureTerminal}</p>
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
                    <p className="flight-card-date">{fromflight?.flightId}</p>
                    <div className="middle-duration">
                        <img src="https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/000000/external-flight-meeting-photo3ideastudio-lineal-photo3ideastudio.png"
                            alt="airplaneDuration"
                            width="40px"
                            height="40px" />

                        <p className="flight-card-duration">Duration {getDuration(fromflight)} </p>
                    </div>

                </div>

                <div className="flight-card-right">
                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>
                    <p className="flight-card-airport">{fromflight?.to}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${fromflight?.arrivalDate.substring(0, 10)}  ${fromflight?.arrivalTime}`}</p>
                    {/* <p className="flight-card-date">{flight.arrivalTime}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{fromflight?.arrivalTerminal}</p>

                </div>
                </div>
                <div className="flight-card-searchResRet" >
                <div className="flight-card-left">
                    <div className="head-card-return">
                        <p className="flight-card-head-type">Return</p>
                        <div className="flip-image">
                            <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                alt="airplaneDepart"
                                width="27px"
                                height="27px"
                            />
                        </div>
                    </div>
                    <p className="flight-card-airport">{toflight?.from}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${toflight?.departureDate.substring(0, 10)}  ${toflight?.departureTime}`}</p>
                    {/* <p className="flight-card-date">{}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{toflight?.departureTerminal}</p>
                </div>

                <div className="">
                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>

                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Generic_turbofan_airplane.svg"
                        alt="airplane"
                        width="80px"
                        height="40px"
                    />
                    <p className="flight-card-head">flight number</p>
                    <p className="flight-card-date">{toflight?.flightId}</p>
                    <div className="middle-duration">
                        <img src="https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/000000/external-flight-meeting-photo3ideastudio-lineal-photo3ideastudio.png"
                            alt="airplaneDuration"
                            width="40px"
                            height="40px" />

                        <p className="flight-card-duration">Duration {getDuration(toflight)} </p>

                    </div>

                </div>

                <div className="flight-card-right">
                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>
                    <p className="flight-card-airport">{toflight?.to}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${toflight?.arrivalDate.substring(0, 10)}  ${toflight?.arrivalTime}`}</p>
                    {/* <p className="flight-card-date">{flight.arrivalTime}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{toflight?.arrivalTerminal}</p>

                </div>
               

            </div>

        </div>
    )
};

export default ReservedFlightCard;