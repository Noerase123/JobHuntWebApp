import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from 'axios'

export default function LoginDetails() {

  const [username, setUsername] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [confirm, setConfirm] = React.useState('')

  const addUser = () => {

    const apiUrl = "http://localhost:3030/api/user/"

    const payload = {
      "username": username,
      "password": pass
    }

    if (confirm === pass) {
      Axios.post(apiUrl, payload)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Login Details
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Username/Email"
            fullWidth
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(event) => setPass(event.target.value)}
            autoComplete="password"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="confirmpassword"
            name="confirmpassword"
            label="Confirm Pasword"
            type="password"
            fullWidth
            onChange={(event) => setConfirm(event.target.value)}
            autoComplete="confirmpassword"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Save Password"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}