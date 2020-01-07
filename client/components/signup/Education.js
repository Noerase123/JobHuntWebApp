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

export default function Education() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };


  const [openGender, setOpenGender] = React.useState(false);

  const handleClose = () => {
    setOpenGender(false);
  };
  const handleOpen = () => {
    setOpenGender(true);
  };

  const [educationAttained, setEducationAttained] = React.useState('')
  const [course, setCourse] = React.useState('')
  const [school, setSchool] = React.useState('')
  const [fromYear, setFromyear] = React.useState(0)
  const [grad, setGrad] = React.useState(false)
  const [disbtn, setDisbtn] = React.useState(false)

  const addEducation = () => {
    const apiUrl = 'http://localhost:3030/api/'

    const id = localStorage.getItem('applicant_id')

    const payload = {
      "educationAttained": educationAttained,
      "course": course,
      "school": school,
      "fromYear": fromYear,
      "graduated": grad
    }

    Axios.post(apiUrl + `education/${id}`, payload)
      .then(res => {
        console.log(res.data)
        setDisbtn(true)
        localStorage.removeItem('applicant_id')
        localStorage.removeItem('user_id')
        localStorage.removeItem('login')
        localStorage.removeItem('applicant')
        alert('success')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-controlled-open-select-label">Educational Attainment</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openGender}
              onClose={handleClose}
              onOpen={handleOpen}
              value={educationAttained}
              onChange={event => setEducationAttained(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={`Bachelor's Degree`}>Bachelor's Degree</MenuItem>
              <MenuItem value={`Masteral's Degree`}>Masteral's Degree</MenuItem>
              <MenuItem value={`Doctoral's Degree`}>Doctoral's Degree</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField required id="course" label="Course" fullWidth onChange={event => setCourse(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField required id="school" label="School" fullWidth onChange={event => setSchool(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField required id="fromYear" type="number" label="Year Started" fullWidth onChange={event => setFromyear(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={grad}
                  // onChange={handleChange('checkedB')}
                  onChange={event => setGrad(event.target.checked)}
                  // value="checkedB"
                  color="primary"
                />
              }
              label="Graduated?"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addEducation}
            disabled={disbtn}
          >
            Save
          </Button>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}