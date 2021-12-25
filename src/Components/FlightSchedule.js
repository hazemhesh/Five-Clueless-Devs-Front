import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../API/URLS";
import FlightCard from "./FlightCard";
import './FlightSchedule.css'


const FlightSchedule = () => {


    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getFlights();
    }, []);


    const getFlights = () => {
        axios.get(BACKEND_URL + 'flights/search/').then(resp => {
            console.log(resp.data);
            const sorted = resp.data.sort((a, b) => {
                if (a.departureDate === b.departureDate) {
                    return Date.parse(a.departureTime) - Date.parse(b.departureTime)
                } else {
                    return Date.parse(a.departureDate) - Date.parse(b.departureDate)
                }
            })
            console.log(sorted);
            setFlights(sorted);
        });
    }

    return (
        <div>
            <div className="flight-schedule">
            <h2> Flight Schedule</h2>
                {
                    flights?.map((flight) =>
                        <div key={flight._id}>
                            <FlightCard flight={flight} />
                        </div>
                    )
                }
            </div>

        </div>
    );
}

export default FlightSchedule;