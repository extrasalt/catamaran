import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/PersonOutline';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { navigate } from 'hookrouter';
import Header from '../Header';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegistrationForm() {
  const classes = useStyles();

  const [userDetails, setUserDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = event => {
    setUserDetails({ ...userDetails, [event.target.name]:   event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:4000/volunteer", {
      method: "POST",
      body: JSON.stringify(userDetails)
    })
    .then((response) => {
      setMessage('User registered successfully.');
      setOpen(true);
      navigate('/signin');
    })
    .catch((error) => {
      setMessage('Error while registering a new user. Please try again in sometime.');
      setOpen(true);
    });
  }

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>  
          <Typography component="h1" variant="h5">
            Volunteer Registration
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormLabel component="legend">First Name</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              onChange={handleChange}
              autoFocus
            />
            <FormLabel component="legend">Last Name</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              onChange={handleChange}
              autoFocus
            />
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup name="gender" onChange={handleChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <FormLabel component="legend">Email Address</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={handleChange}
              autoFocus
            />
            <FormLabel component="legend">Password</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              type="password"
              onChange={handleChange}
            />
            <FormLabel component="legend">Contact Number</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              id="phone"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{ message }</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}
