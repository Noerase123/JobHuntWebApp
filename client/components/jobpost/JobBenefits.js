import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Axios from 'axios';
const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControlCode: {
    // marginTop: '-16px',
    minWidth: 80,
  },
  formControl: {
    marginTop: '-16px',
    minWidth: 100,
  },
  formControl2: {
    marginTop: '-16px',
    minWidth: 60,
  },
  formControl3: {
    marginTop: '-16px',
    minWidth: 100,
  },
}));

export default function JobBenefits() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const [flexitime, setFlexitime] = React.useState(false)
  const [paidHolidays, setPaidHolidays] = React.useState(false)
  const [paidSickLeave, setPaidSickLeave] = React.useState(false)
  const [workFromHome, setWorkFromHome] = React.useState(false)
  const [paidVacationLeave, setPaidVacationLeave] = React.useState(false)
  const [medicalInsurance, setMedicalInsurance] = React.useState(false)
  const [freeLunch, setFreeLunch] = React.useState(false)
  const [disbtn, setDisbtn] = React.useState(false)

  const addBenefits = () => {
    const apiUrl = 'http://localhost:3030/api/'

    const id = localStorage.getItem('jobID')

    const payload = {
      "flexitime" : flexitime,
      "paidHolidays" : paidHolidays,
      "paidSickLeave" : paidSickLeave,
      "workFromHome" : workFromHome,
      "paidVacationLeave" : paidVacationLeave,
      "medicalInsurance" : medicalInsurance,
      "freeLunch" : freeLunch,
      
    }

    Axios.post(apiUrl + `jobBenefits/${id}`, payload)
        .then(res => {
          console.log(res.data)
          setDisbtn(true)
        })
        .catch(err => {
          console.log(err)
        })
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        What benefits are available at your Job Post?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={flexitime}
                  // onChange={handleChange('checkedB')}
                  // value="checkedB"
                  color="primary"
                  onChange={event => setFlexitime(event.target.checked)}
                />
              }
              label="Flexi Time"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={paidHolidays}
                  // onChange={handleChange('checkedB')}
                  // value="checkedB"
                  color="primary"
                  onChange={event => setPaidHolidays(event.target.checked)}
                />
              }
              label="Paid Holiday"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={paidSickLeave}
                  // onChange={handleChange('checkedB')}
                  // value="checkedB"
                  color="primary"
                  onChange={event => setPaidSickLeave(event.target.checked)}
                />
              }
              label="Paid Sick Leave"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={workFromHome}
                  // onChange={handleChange('checkedB')}
                  // value="checkedB"
                  color="primary"
                  onChange={event => setWorkFromHome(event.target.checked)}
                />
              }
              label="Work from home"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={paidVacationLeave}
                  // onChange={handleChange('checkedB')}
                  // value="checkedB"
                  color="primary"
                  onChange={event => setPaidVacationLeave(event.target.checked)}
                />
              }
              label="Paid Vacation Leave"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={medicalInsurance}
                  // onChange={handleChange('checkedB')}
                  // value="checkedB"
                  color="primary"
                  onChange={event => setMedicalInsurance(event.target.checked)}
                />
              }
              label="Medical Insurance"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={freeLunch}
                  // onChange={handleChange('checkedB')}
                  // value="checkedB"
                  color="primary"
                  onChange={event => setFreeLunch(event.target.checked)}
                />
              }
              label="Free Lunch"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addBenefits}
            disabled={disbtn}
          >
            Save
          </Button>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}