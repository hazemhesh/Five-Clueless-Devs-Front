import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeatPicker from "react-seat-picker";

class SeatMap extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here! 
    this.state = {
      loading: false,
      selectedSeats: this.props.selectedSeats
    };
  }

  componentDidUpdate() {
    this.props.setSelectedSeats(this.state.selectedSeats);
  }


  addSeatCallbackContinousCase = (
    { row, number, id },
    addCb,
    params,
    removeCb
  ) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        let tmpSeat = this.state.selectedSeats;
        if (removeCb) {
          await new Promise(resolve => setTimeout(resolve, 750));
          tmpSeat = tmpSeat.filter((s) => s.number !== `${params.row}${params.number}`)
          // this.setState({ selectedSeats: seats });
          this.props.removeSeat(params.id - 1);
          console.log(
            `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
          );
          removeCb(params.row, params.number);
        }
        await new Promise(resolve => setTimeout(resolve, 750));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        tmpSeat = tmpSeat.concat([{ number: `${row}${number}`, id: id - 1 }])
        //const newTooltip = `Click to remove this seat`;
        addCb(row, number, id);
        this.setState({ loading: false, selectedSeats: tmpSeat });
        console.log(tmpSeat)
      }
    );
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 750));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        const seats = this.state.selectedSeats.filter((s) => s.number !== `${row}${number}`)
        this.setState({ loading: false, selectedSeats: seats });
        this.props.removeSeat(id - 1);
        // console.log(this.state.selectedSeats)
      }
    );
  };

  render() {

    const { loading } = this.state;
    return (
      <div>
        {/* <h1>Seat Picker Continuous Case</h1> */}
        <div>
          <SeatPicker
            addSeatCallback={this.addSeatCallbackContinousCase}
            removeSeatCallback={this.removeSeatCallback}
            rows={this.props.rows}
            maxReservableSeats={this.props.maxSeats}
            
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{ multiline: true }}
            continuous
          />
        </div>
      </div>
    );
  }
}
export default SeatMap;
