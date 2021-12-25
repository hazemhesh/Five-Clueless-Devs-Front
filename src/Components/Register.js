import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL } from '../API/URLS'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button, Step, StepButton, Stepper } from '@mui/material';
import './Register.css';
import UIButton from './UIButton/UIButton';


const steps = ['Account Details', 'Personal Details', 'Travel Details'];
const Register = () => {


	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState({});
	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};


	const handleErrors = () => {


		if (activeStep == 0) {
			let e = initialError;

			if (username && email && password) {
				if (!(email.includes('@') && email.includes("."))) {
					e = { ...e, email: "email must be in form example@mail.com" }
					setError(e)
					return false;
				}
				handleComplete();
				return true;
			} else {
				const newCompleted = completed;
				newCompleted[activeStep] = false;
				setCompleted(newCompleted);

				if (!username) {
					e = { ...e, username: "username cannot be empty" }
				}
				if (!email) {
					e = { ...e, email: "email cannot be empty" }
				}
				if (!password) {
					e = { ...e, password: "password cannot be empty" }
				}
				setError(e)
				return false;
			}
		} else if (activeStep == 1) {
			handleComplete();
			return true;
		}
		return true;
	}

	const handleNext = () => {
		if (handleErrors()) {
			setError(initialError);
			const newActiveStep =
				isLastStep() && !allStepsCompleted()
					? // It's the last step, but not all steps have been completed,
					// find the first step that has been completed
					steps.findIndex((step, i) => !(i in completed))
					: activeStep + 1;
			setActiveStep(newActiveStep);
		}
	};

	const handleStep = (step) => () => {
		if (handleErrors()) {
			setActiveStep(step);
		}
	};

	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
	};

	const history = useHistory()
	const [userId, setUserId] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [homeAddress, setHomeAddress] = useState('')
	const [countryCode, setcountryCode] = useState('')
	const [telephone, setTelephone] = useState('')
	const [passportNumber, setPassportNumber] = useState('')

	let initialError = {
		username: "",
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		homeAddress: "",
		countryCode: "",
		telephone: "",
		passportNumber: "",
	}

	const [error, setError] = useState({
		username: "",
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		homeAddress: "",
		countryCode: "",
		telephone: "",
		passportNumber: "",
	})

	async function registerUser() {
		if (completed[0] != true) {
			setActiveStep(0);
			return;
		}
		if (completed[1] != true) {
			setActiveStep(1);
			return;
		}


		try {
			const response = await fetch(BACKEND_URL + 'users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					email,
					password,
					firstName,
					lastName,
					homeAddress,
					countryCode,
					telephone,
					passportNumber,
				}),
			})
			const data = await response.json()
			console.log(data);
			if (data.message && data.message == 'email taken') {
				setError({ ...error, email: 'This email is already registered' });
				const newCompleted = completed;
				newCompleted[0] = false;
				setCompleted(newCompleted);
				setActiveStep(0);
			}
			else if (data.status === 'ok') {
				history.push('/login')
			}
		} catch (error) {
			console.log(error);
		}
	}

	if (activeStep == 0) {
		return (
			<div>
				<h1 style={{ marginBottom: '15px' }}>Register</h1>
				<div className='stepper'>
					<Stepper nonLinear alternativeLabel activeStep={activeStep}>
						{steps.map((label, index) => (
							<Step key={label} completed={completed[index]}>
								<StepButton color="inherit" onClick={handleStep(index)}>
									{label}
								</StepButton>
							</Step>
						))}
					</Stepper>
				</div>

				<div className='register-container' >
					<div className='register-box-container'>
						<TextField
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							placeholder="Username"
							label="Username"
							helperText={error.username}
							error={error.username}
						/>

						<TextField
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Email"
							label="Email"
							type="email"
							helperText={error.email}
							error={error.email}
						/>

						<TextField
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Password"
							label="Password"
							helperText={error.password}
							error={error.password}
						/>

						<UIButton
							onClick={handleNext}
							text={"Next"}
							margin="10px"
						/>

					</div>
				</div>
			</div>

		)
	} else if (activeStep == 1) {
		return (
			<div>
				<h1 style={{ marginBottom: '15px' }}>Register</h1>
				<div className='stepper'>
					<Stepper nonLinear alternativeLabel activeStep={activeStep}>
						{steps.map((label, index) => (
							<Step key={label} completed={completed[index]}>
								<StepButton color="inherit" onClick={handleStep(index)}>
									{label}
								</StepButton>
							</Step>
						))}
					</Stepper>
				</div>

				<div className='register-container' >
					<div className='register-box-container'>
						<TextField
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							type="text"
							placeholder="First Name"
							label='First Name'
						/>
						<TextField
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							type="text"
							placeholder="Last Name"
							label="Last Name"
						/>

						<TextField
							value={telephone}
							onChange={(e) => setTelephone(e.target.value)}
							placeholder="Telephone"
							label="Telephone"
						/>

						<UIButton
							onClick={handleNext}
							text={"Next"}
							margin="10px"
						/>
					</div>
				</div>
			</div>
		)
	} else {

		return (
			<div>
				<h1 style={{ marginBottom: '15px' }}>Register</h1>
				<div className='stepper'>
					<Stepper nonLinear alternativeLabel activeStep={activeStep}>
						{steps.map((label, index) => (
							<Step key={label} completed={completed[index]}>
								<StepButton color="inherit" onClick={handleStep(index)}>
									{label}
								</StepButton>
							</Step>
						))}
					</Stepper>
				</div>

				<div className='register-container' >
					<div className='register-box-container'>
						<TextField
							value={homeAddress}
							onChange={(e) => setHomeAddress(e.target.value)}
							placeholder="Home Address"
							label="Home Address"
						/>
						<TextField
							value={countryCode}
							onChange={(e) => setcountryCode(e.target.value)}
							placeholder="Country Code"
							label="Country Code"
						/>

						<TextField
							value={passportNumber}
							onChange={(e) => setPassportNumber(e.target.value)}
							placeholder="Passport Number"
							label="Passport Number"
						/>

						<UIButton
							onClick={registerUser}
							text={"Register"}
							margin="10px"
						/>
						{/* <input type="submit" value="Register" /> */}
					</div>
				</div>
			</div>

		)
	}
}

export default Register;