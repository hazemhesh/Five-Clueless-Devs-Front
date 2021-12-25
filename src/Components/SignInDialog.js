import { createTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { BACKEND_URL } from "../API/URLS";
import UIButton from "./UIButton/UIButton";

const SignInDialog = ({ show, setShow, setConfirm }) => {

    const toggle = () => {
        setShow(!show);
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
                // setConfirm();
                toggle();
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

    return (
        <div>
            <Dialog
                open={show}
                onClose={toggle}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You must Login first"}
                </DialogTitle>
                <DialogContent>

                    <Box component="form" noValidate onSubmit={loginUser} sx={{ mt: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth:'300px' }}>
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

                        <UIButton
                            type={"submit"}
                            text={"Sign In"}
                            margin={'10px 0'}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SignInDialog;