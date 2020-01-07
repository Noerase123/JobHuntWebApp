import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

export default function AboutCompany() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const [overview, setOverview] = React.useState('')
  const [yearStarted, setYearStarted] = React.useState(0)
  const [disbtn, setDisbtn] = React.useState(false)

  const Postoverview = () => {
    const apiUrl = 'http://localhost:3030/api/'

    const id = localStorage.getItem('jobID')

    const payload = {
      "overview": overview,
      "yearStarted": yearStarted
    }

    Axios.post(apiUrl + `company/${id}`, payload)
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
        Tell us something about your Company.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
           variant="outlined" 
            required
            id="overview"
            label="Overview of the Company"
            multiline
            rows="5"
            fullWidth
            onChange={event => setOverview(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
           variant="outlined" 
            required
            id="yearStarted"
            label="Year Started"
            multiline
            type="number"
            rows="5"
            fullWidth
            onChange={event => setYearStarted(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={Postoverview}
            disabled={disbtn}
          >
            Save
          </Button>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}