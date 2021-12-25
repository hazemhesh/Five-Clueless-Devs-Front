import { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home.Page';
import Test from './Pages/Test.page';
import CreateFlight from './Components/CreateFlight';
import CreateUser from './Components/CreateUser'
import SearchFlight from './Components/SearchFlight';
import ViewFlightDetails from './Components/ViewFlightDetails';
import ViewUserDetails from './Components/ViewUserDetails';
import UpdateFlight from './Components/UpdateFlight';
import EditUser from './Components/EditUser';
import SearchFlightCriteria from './Components/SearchFlightCriteria';
import Navbar from './Components/NavBar';
import FlightSchedule from './Components/FlightSchedule';

import SearchFlightUser from './Components/SearchFlightUser';
import FlightSeats from './Components/FlightSeats/FlightSeats';

// import Login from './Components/Login';
import Register from './Components/Register';


import ViewDetailsUser from './Components/ViewDetailsUser';
import ReservedFlight from './Components/ReservedFlight';
import ViewSummary from './Components/ViewSummary';
import Confirmation from './Components/Confirmation';
import ReservationCancel from './Components/ReservationCancel';
import Login from './Components/Login';
import DeptUpdateReservation from './Components/DeptUpdateReservation';
import RetUpdateReservation from './Components/RetUpdateReservation';
import EditSeatsOutside from './Components/UpdateSeats/EditSeatsOutside';
import StripeCheckout from "react-stripe-checkout";
import Payment from './Components/Payment';
import ChangePassword from './Components/UserChangePassword';
function App() {

  return (
    <div className="App">

      <Router>
        <Navbar />
        <Switch>

          <Route exact path="/" component={SearchFlightUser} />


          <Route exact path="/admin-search" component={SearchFlightCriteria} />


          <Route path='/create-flight' component={CreateFlight} />
          <Route path='/search-user' component={SearchFlightUser} />
          <Route path='/update-flight/:id' component={UpdateFlight} />
          {/* <Route path='/search' component={SearchFlight} /> */}
          <Route path='/details/:id' component={ViewFlightDetails} />
          <Route path='/search' component={SearchFlightCriteria} />
          <Route path='/flight-schedule' component={FlightSchedule} />

          <Route path='/edit-user/:id' component={EditUser} />
          <Route path='/create-user' component={CreateUser} />
          <Route path='/user-details/:id' component={ViewUserDetails} />


          <Route path='/select-seats' component={FlightSeats} />
          <Route path='/search-user' component={SearchFlightUser} />

          <Route path='/details-user/:id' component={ViewDetailsUser} />
          <Route path='/Reserved-flights' component={ReservedFlight} />
          {/* <Route path='/summary/:idfrom/:idto' component={ViewSummary} /> */}
          <Route path='/summary/:reservationId' component={ViewSummary} />
          <Route path='/Resrevation-cancel' component={ReservationCancel} />
          <Route path='/Reservation-Update-Dept' component={DeptUpdateReservation} />
          <Route path='/Reservation-Update-Ret' component={RetUpdateReservation} />
          <Route path='/reserve' component={Confirmation} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <Route path='/editSeats/:reservationId' component={EditSeatsOutside} />
          <Route path='/pay' component={Payment} />
          <Route path='/passwordChange' component={ChangePassword} />


        </Switch>
      </Router>
    </div>
  );
}

export default App;
