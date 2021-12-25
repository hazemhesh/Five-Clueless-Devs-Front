import { useEffect, useState } from "react";
import SeatMap from "./SeatMap";

const Seats = (props) => {

    const propSeats = props.seats;
    // [123, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 111,
    //     123, null, null, 123, null, null, "hell", 123, null, null, 123, null, null, null, null, null];

    const [rows, setRows] = useState([]);

    const getSeatNumber = (i) => {
        let letter = String.fromCharCode('A'.charCodeAt(0) + i % 6);
        let num = Math.floor(i / 6 + 1);
        return `${num}${letter}`
    }
    const getSeatLetter = (i) => {
        return String.fromCharCode('A'.charCodeAt(0) + i % 6);
    }

    useEffect(() => {
        const processedRows = [];
        let temp = [];
        let tempSelected = [];
        for (let i = 0; i < propSeats.length; i++) {
            if (i % 3 === 0 && i % 6 !== 0) {
                temp.push(null);
            } else if (i !== 0 && i % 6 === 0) {
                processedRows.push(temp);
                temp = [];
            }

            if (propSeats[i] == props.userId) {
                temp.push({ id: i + 1, number: getSeatLetter(i), isSelected: true });
                tempSelected = [...tempSelected, { id: i, number: getSeatNumber(i) }]
            } else if (propSeats[i] === null || propSeats[i] === 'null') {
                temp.push({ id: i + 1, number: getSeatLetter(i)});
            } else {
                temp.push({ id: i + 1, number: getSeatLetter(i), isReserved: true });
            }
        }
        if (temp.length > 0) {
            processedRows.push(temp);
        }
        if(tempSelected.length > 0){
            props.setSelectedSeats(tempSelected);
        }

        setRows(processedRows);
        console.log(processedRows);

    }, [props.seats])

    return (
        <>
            {rows.length > 0 ?
                <SeatMap
                    rows={rows}
                    selectedSeats={props.selectedSeats}
                    setSelectedSeats={props.setSelectedSeats}
                    maxSeats={props.maxSeats}
                    removeSeat = {props.removeSeat}
                />
                : null}
        </>
    );
}

export default Seats;

   // [
    //   [
    //     { id: 1, number: 1, isSelected: true },
    //     { id: 2, number: 2 },
    //     null,
    //     { id: 3, number: "3", isReserved: true },
    //     { id: 4, number: "4" },
    //     null,
    //     { id: 5, number: 5 },
    //     { id: 6, number: 6 }
    //   ],
    //   [
    //     { id: 7, number: 1, isReserved: true },
    //     { id: 8, number: 2, isReserved: true },
    //     null,
    //     { id: 9, number: "3", isReserved: true },
    //     { id: 10, number: "4" },
    //     null,
    //     { id: 11, number: 5 },
    //     { id: 12, number: 6 }
    //   ],
    //   [
    //     { id: 13, number: 1 },
    //     { id: 14, number: 2 },
    //     null,
    //     { id: 15, number: 3, isReserved: true },
    //     { id: 16, number: 4 },
    //     null,
    //     { id: 17, number: 5 },
    //     { id: 18, number: 6 }
    //   ],
    //   [
    //     { id: 19, number: 1 },
    //     { id: 20, number: 2 },
    //     null,
    //     { id: 21, number: 3 },
    //     { id: 22, number: 4 },
    //     null,
    //     { id: 23, number: 5 },
    //     { id: 24, number: 6 }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],

    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ]
    // ];