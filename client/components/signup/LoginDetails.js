import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function LoginDetails() {
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