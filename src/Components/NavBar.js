import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./NavBar.css";


const Navbar = () => {
  const history = useHistory();
  const [userId, setUser] = useState();

  useEffect(() => {
    
    setUser(JSON.parse(localStorage.getItem('user'))?._id);
    setInterval(() =>{
      setUser(JSON.parse(localStorage.getItem('user'))?._id);
    }, 2000)
  }, [])

  //const [color, setColor] = useState('#596EB3');

  // const func = () => {
  //   if (window.location.href == "http://localhost:3000/") {
  //     setColor('#A48184')
  //   }
  //   else {
  //     setColor('#A48184')
  //   }
  // }




  return (

    <AppBar position="static" style={{ alignItems: 'flex-start', background: '#A48184', }}>

      {/* <Toolbar> */}
      <div className="toolbar">

        <div className="nav-logo-cont nav-logo" onClick={(e) => history.push('/')}>
          <img style={{ width: '35px', marginRight: '5px' }} src="https://img.icons8.com/fluency-systems-regular/48/000000/air-pilot-hat.png" />
          <p style={{ color: 'seashell', fontWeight: 'bolder', fontSize: '30px', marginBottom: '4px', marginRight: '00px' }}>Clueless Pilots</p>
        </div>

        <div className="nav-logo-cont">
          {userId ? <Button className="admin" color="inherit" onClick={(e) => history.push('/user-details/' + JSON.parse(localStorage.getItem('user'))?._id)}>View Profile</Button> : null}
          {userId ? <Button className="admin" color="inherit" onClick={(e) => history.push('/Reserved-flights')}>View Reservations</Button> : null}
          <Button className="admin" color="inherit" onClick={(e) => history.push('/')}>Search for Flights</Button>
        </div>

        {JSON.parse(localStorage.getItem('user'))?.isAdmin ? <div className="ayesm">
          <Button color="inherit" onClick={(e) => history.push('/admin-search')}> Admin Panel</Button>
          <Button color="inherit" onClick={(e) => history.push('/flight-schedule')}>Flight Schedule</Button>
          <Button color="inherit" onClick={(e) => history.push('/create-flight')}>Add Flight</Button>
        </div> : null}

        {userId ? <Button className="admin logout" color="inherit" onClick={(e) => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          history.push('/');
        }}>Logout</Button>
          :
          <div>
            <Button className="admin" color="inherit" onClick={(e) => history.push("/login")}>Login</Button>
            <Button className="admin" color="inherit" onClick={(e) => history.push("/register")}>Create Account</Button>
          </div>
        }

      </div>
      {/* </Toolbar> */}
    </AppBar>
  );
}

export default Navbar;