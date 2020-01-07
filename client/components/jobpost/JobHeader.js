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

export default function JobHeader() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const [jobTitle, setJobTitle] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [from, setFrom] = React.useState(0)
  const [to, setTo] = React.useState(0)
  const [current, setCurrent] = React.useState(false)
  const [disbtn, setDisbtn] = React.useState(false)

  const addWork = () => {
    const apiUrl = 'http://localhost:3030/api/'

    const id = localStorage.getItem('applicant_id')

    const payload = {
      "jobTitle" : jobTitle,
      "company" : company,
      "address" : address,
      "from" : from,
      "to" : to,
      "current" : current
    }

    Axios.post(apiUrl + `workExperience/${id}`, payload)
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
        Work Experience
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField required id="jobTitle" label="Job Title" fullWidth onChange={event => setJobTitle(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField required id="company" label="Company" fullWidth onChange={event => setCompany(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField required id="companyAdd" label="Address" fullWidth onChange={event => setAddress(event.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="from" label="From" type="date" fullWidth onChange={event => setFrom(event.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="to" label="To" type="date" fullWidth onChange={event => setTo(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={current}
                  // onChange={handleChange('checkedB')}
                  // value="checkedB"
                  color="primary"
                  onChange={event => setCurrent(event.target.checked)}
                />
              }
              label="Employed?"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addWork}
            disabled={disbtn}
          >
            Save
          </Button>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}