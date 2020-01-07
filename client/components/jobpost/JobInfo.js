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

export default function JobInfo() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const [jobDescription, setJobDescription] = React.useState('')
  const [qualification, setQualification] = React.useState('')
  const [disbtn, setDisbtn] = React.useState(false)

  const jobInfoPost = () => {
    const apiUrl = 'http://localhost:3030/api/'

    const id = localStorage.getItem('jobID')

    const payload = {
      "jobDescription": jobDescription,
      "qualification": qualification
    }

    Axios.post(apiUrl + `jobInfo/${id}`, payload)
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
          <TextField
            required
            id="jobDescription"
            label="Job Description"
            multiline
            rows="5"
            fullWidth
            onChange={event => setJobDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="qualification"
            label="Job Qualification"
            multiline
            rows="5"
            fullWidth
            onChange={event => setQualification(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={jobInfoPost}
            disabled={disbtn}
          >
            Save
          </Button>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}