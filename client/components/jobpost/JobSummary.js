import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    // marginTop: '',
    minWidth: 265,
  },
}));

export default function JobSummary() {
  const classes = useStyles();
  const [openGender, setOpenGender] = React.useState(false);

  const handleClose = () => {
    setOpenGender(false);
  };
  const handleOpen = () => {
    setOpenGender(true);
  };

  const [openGenderc, setOpenGenderc] = React.useState(false);

  const handleClosec = () => {
    setOpenGenderc(false);
  };
  const handleOpenc = () => {
    setOpenGenderc(true);
  };

  const [jobLevel, setJobLevel] = React.useState(0)
  const [industry, setIndustry] = React.useState('')
  const [jobCategory, setJobCategory] = React.useState('')
  const [vacancy, setVacancy] = React.useState(0)
  const [education, setEducation] = React.useState(0)
  const [website, setWebsite] = React.useState('')
  const [officeAddress, setOfficeAddress] = React.useState('')
  const [disbtn, setDisbtn] = React.useState(false)
  const responseAccuracy = '97%'

  const addES = () => {
    const apiUrl = 'http://localhost:3030/api/'

    const id = localStorage.getItem('jobID')

    const payload = {
      "jobLevel": jobLevel,
      "industry": industry,
      "jobCategory": jobCategory,
      "vacancy": vacancy,
      "education": education,
      "website": website,
      "responseAccuracy": responseAccuracy,
      "officeAddress": officeAddress,
    }

    Axios.post(apiUrl + `jobSummary/${id}`, payload)
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
        Expected Salary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Job Level</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openGenderc}
              onClose={handleClosec}
              onOpen={handleOpenc}
              value={jobLevel}
              onChange={event => setJobLevel(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Entry Level</MenuItem>
              <MenuItem value={2}>Associate Level</MenuItem>
              <MenuItem value={3}>Mid Level</MenuItem>
              <MenuItem value={4}>Senior Level</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="industry" label="Industry" fullWidth onChange={event => setIndustry(event.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="jobCategory" label="Job Category" fullWidth onChange={event => setJobCategory(event.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="vacancy" label="Vacancy" type="number" fullWidth onChange={event => setVacancy(event.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Education</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openGender}
              onClose={handleClose}
              onOpen={handleOpen}
              value={education}
              onChange={event => setEducation(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Bachelor's Degree</MenuItem>
              <MenuItem value={2}>Masteral's Degree</MenuItem>
              <MenuItem value={3}>Doctoral's Degree</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="website" label="Website" fullWidth onChange={event => setWebsite(event.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="officeAddress" label="Office Address" fullWidth onChange={event => setOfficeAddress(event.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addES}
            disabled={disbtn}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}