import { Link } from "react-router-dom";
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL } from '../API/URLS'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import Input from "./Input";
import { containerClasses } from "@mui/material";
import { useEffect } from "react";
import UIButton from './UIButton/UIButton';



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()
  useEffect(() => {
    let user = localStorage.getItem('user')
    if (user)
      history.push("/")

  } , [])

  async function loginUser(event) {
    event.preventDefault()
    setEmailError("")
    setPassError("")
    try {
      const response = await fetch(BACKEND_URL + 'users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })


      const data = await response.json()
      console.log(data.user)
      if (data.user) {

        localStorage.setItem('token', data.token)

        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("userId", JSON.stringify(data.user.userId))
        window.location.href = '/'
      } else {

        if (email == "") {
          setEmailError("Email cannot be left empty")
        }


        if (password == "") {
          setPassError("Password cannot be left empty")
        }
        if (password != "" && email != "") {
          setPassError("Invalid Email or Password")
          setEmailError(true)
        }
      }
    } catch (err) { console.log(err) }
  }
  const theme = createTheme();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPassError] = useState("");
  const [errorEP, setErrorEP] = useState("")


  const validate = () => {
    let temp = {}
    temp.email = (/$|.+@.+..+/).test(email) ? "" : "Email is not valid"

    setEmailError(
      "Invalid email"
    )
    return Object.values(temp).every(x => x == "")
  }
  return (

    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: 'calc(100vh - 70px);' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(http://www.skyblue.aero/wp-content/uploads/2019/08/banner-flights.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#296081' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={loginUser} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                autoFocus
                error={emailError !== ""}
                helperText={emailError}


              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"

                error={passwordError !== ""}
                helperText={passwordError}

              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              
                <UIButton
                  type={"submit"}
                  text={"Sign In"}
                  margin={'10px 0'}
                />
              

              <Grid container style={{marginTop:'25px'}}>
                <Grid item>
                  <Link to="/Register">
                    {"Don't have an account? Sign Up"}
                  </Link>

                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );

}

export default Login