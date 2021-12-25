import { CircularProgress, Fab, Paper, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './LoadingPayment.css'

const LoadingPayment = ({ text }) => {
    return (
        <div className="loading-div">
            <div className="loading-content">
                <Paper style={{padding: '30px 0'}}>
                    {text == 'success' ?
                        <>
                            <Fab
                                aria-label="save"
                                color="green"
                                disabled
                                className="success-loading"
                            >
                                <CheckIcon />
                            </Fab>
                            <Typography variant="h5" marginTop={'15px'}>
                                {"Transaction Succeeded"}
                            </Typography>
                        </>
                        :
                        text == 'error' ?
                            <>
                                <Fab
                                    aria-label="save"
                                    disabled
                                    className="error-loading"
                                >
                                    <PriorityHighIcon />
                                </Fab>
                                <Typography variant="h5" marginTop={'15px'}>
                                    {'Transaction Failed'}
                                </Typography>
                            </>
                            :
                            <>
                                <CircularProgress size={'55px'} style={{'color': '#A48184'}} />
                                <Typography variant="h5" marginTop={'15px'}>
                                    Processing {text}...
                                </Typography>
                            </>
                    }
                </Paper>
            </div>


        </div>
    );
}

export default LoadingPayment;