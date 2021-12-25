import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory, Switch } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import "./FlightCard.css";
import UIButton from './UIButton/UIButton';
import './ViewUserDetails.css'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import LoadingPayment from './LoadingPayment/LoadingPayment';


const ViewUserDetails = () => {

  const [sent, setSent] = useState(false)
  const [text, setText] = useState("")

  const handleSend = async (e) => {
    setSent(true)
    try {

      console.log(user.email);
      //  BACKEND_URL + "users/search?userId=" + id)
      await axios.post(BACKEND_URL + "users/send_mail?userId=" + id, {
        text, to: user.email
      })
    } catch (error) {

      console.error(error)
    }
  }



  const history = useHistory();
  const [user, setUser] = useState({
    userId: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    homeAddress: '',
    countryCode: '',
    telephone: '',
    email: '',
    passportNumber: '',
    isAdmin: '',
    reservations: ''
  });
  let { id } = useParams();

  useEffect(() => {
    console.log("Print id: " + { id });
    axios
      .get(BACKEND_URL + "users/search?_id=" + id,{
        headers:{
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(res => {
        setUser(res.data[0] || {});
      })
      .catch(err => {
        console.log(err);
      })
  }
    , []);



  const onDeleteConfirm = () => {
    axios
      .delete(BACKEND_URL + "users/deleteUser?userId=" + id)
      .then(res => {
        history.push("/search");
      })
      .catch(err => {
        console.log("Error form ViewUserDetails_deleteClick");
        console.log(err);
      })
  };
  const [showConfirm, setConfirm] = useState(false);
  const setConfirmButton = () => {
    setConfirm(true)
    // setDelete(false)
  };

  const [showDelete, setDelete] = useState(true);
  const setDeleteButton = () => {
    showDelete(false)
  };

  const toggleDialog = () => {
    setConfirm(!showConfirm);
  }

  return (
    <div className="ViewFlight">
      <div className="container">
        <div className="row">
          <br />
          <div className="col-md-8 m-auto">
            <h1 style={{marginBottom:"15px"}} className="display-4 text-center">User's Record</h1>
            {/* <p className="lead text-center">
              View User's Info
            </p>
            <hr /> <br /> */}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className='view-user-card'>
              <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 500 }} className="table table-hover table-dark">
                  <TableBody>

                    <TableRow>
                      <TableCell><span className="info-header-font">Username</span></TableCell>
                      <TableCell align="right">{user?.username}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><span className="info-header-font">Email </span></TableCell>
                      <TableCell align="right">{user?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><span className="info-header-font">First Name </span></TableCell>
                      <TableCell align="right">{user?.firstName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><span className="info-header-font">Last Name </span></TableCell>
                      <TableCell align="right">{user?.lastName}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">1</th> */}
                      <TableCell><span className="info-header-font">Home Address </span></TableCell>
                      <TableCell align="right">{user?.homeAddress}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">1</th> */}
                      <TableCell><span className="info-header-font">Telephone Number </span></TableCell>
                      <TableCell align="right">{user?.telephone}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">1</th> */}
                      <TableCell><span className="info-header-font">Passport Number </span></TableCell>
                      <TableCell align="right">{user?.passportNumber}</TableCell>
                    </TableRow>

                    {/* <th scope="row">4</th> */}



                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-md-6">
          </div>

          <div className="col-md-6" style={{ margin: "10px" }}>
            {/* <Link to={`/update-flight/${id}`} className="btn btn-outline-info btn-lg btn-block">
              Edit Flights
            </Link>
            <br /> */}

            <UIButton
              onClick={() => history.push(`/edit-user/${id}`)}
              text={"Edit Information "}
              margin="10px"
            />

            {/* <Button
              onClick={() => history.push(`/edit-user/${id}`)}
              variant="outlined"
              style={{ marginRight: "10px" }}
            > Edit Information </Button> */}
            {/* <Button
              onClick={() => history.push(`/Reserved-flights`)}
              variant="outlined"
              style={{ marginRight: "10px" }}
            > View Reservations </Button> */}

            <UIButton
              onClick={() => history.push(`/Reserved-flights`)}
              text={"View Reservations"}
              margin="10px"
            />

            {/*showDelete ? <Button onClick={setConfirmButton} variant="outlined" color="error">Delete </Button> : null*/}
            {/* {showConfirm ? <Button onClick={onDeleteConfirm} variant="outlined" color="error">Confirm</Button> : null} */}

          </div>
        </div>
      </div>


      <div>

        <Dialog
          open={showConfirm}
          onClose={toggleDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this user?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={toggleDialog} variant="text">Cancel </Button>
            <Button onClick={onDeleteConfirm} variant="text" color="error">Delete</Button>
          </DialogActions>
        </Dialog>

      </div>


      {/* <div className="App">

			{!sent ? (
				<form onClick={handleSend}>
					<button type="button">Send Email</button>
				</form>
			) : (
				<h1>Email Sent</h1>
			)}
		</div> */}

    </div>
  )
}

export default ViewUserDetails;