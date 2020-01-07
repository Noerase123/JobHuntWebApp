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
import Axios from 'axios'

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

export default function EmpInfo() {
  const classes = useStyles();
  const [openGender, setOpenGender] = React.useState(false);

  const [openMonth, setOpenMonth] = React.useState(false);

  const [openDate, setOpenDate] = React.useState(false);

  const [openYear, setOpenYear] = React.useState(false);

  const [openCode, setOpenCode] = React.useState(false);

  const hCloseCode = () => {
    setOpenCode(false);
  };
  const hOpenCode = () => {
    setOpenCode(true);
  };
  
  const handleClose = () => {
    setOpenGender(false);
  };
  const handleOpen = () => {
    setOpenGender(true);
  };

  const hCloseMonth = () => {
    setOpenMonth(false);
  };
  const hOpenMonth = () => {
    setOpenMonth(true);
  };

  const hCloseDate = () => {
    setOpenDate(false);
  };
  const hOpenDate = () => {
    setOpenDate(true);
  };

  const hCloseYear = () => {
    setOpenYear(false);
  };
  const hOpenYear = () => {
    setOpenYear(true);
  };

  const [first, setfirst] = React.useState('')
  const [last, setLast] = React.useState('')
  const [location, setlocation] = React.useState('')
  const [_code, _setCode] = React.useState('')
  const [number, setNumber] = React.useState(0)
  const [email, setEmail] = React.useState('')
  const [_month, _setMonth] = React.useState('')
  const [_date, _setDate] = React.useState('')
  const [_year, _setYear] = React.useState('')
  const [_gender, _setGender] = React.useState('')
  const [disbtn, setdisbtn] = React.useState(false)

  React.useEffect(() => {
    const id = localStorage.getItem('user_id')
    Axios.get(`http://localhost:3030/api/user/getOne/${id}`)
      .then(res => {
        console.log(res.data.username)
        setEmail(res.data.username)
      })
      .catch(err => {
        console.log(err)
      })
  },1000)

  const addEmpInfo = () => {
    const apiUrl = 'http://localhost:3030/api/'
    const user_id = localStorage.getItem('user_id')

    const payload = {
      "firstname" : first,
      "lastname" : last,
      "location" : location,
      "contactNo" : _code + number,
      "birthday" : `${_month}/${_date}/${_year}`,
      "gender" : _gender
    }

    Axios.post(apiUrl + `applicant/${user_id}`, payload) 
        .then(res => {
          console.log(res.data)
          setdisbtn(true)
          localStorage.setItem('applicant_id', res.data.applicant_id)
          localStorage.setItem('applicant', true)
        })
        .catch(err => {
          console.log(err)
        })
    
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Employee Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="firstname" label="Firstname" fullWidth onChange={event => setfirst(event.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="lastname" label="Lastname" fullWidth onChange={event => setLast(event.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField required id="location" label="Location" fullWidth onChange={event => setlocation(event.target.value)}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControlCode}>
            <InputLabel id="demo-controlled-open-select-label">code</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openCode}
              onClose={hCloseCode}
              onOpen={hOpenCode}
              value={_code}
              onChange={event => _setCode(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'63'}>+63</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            type="number"
            id="phone"
            label="Phone Number"
            style={{width: '68%'}}
            onChange={event => setNumber(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Month</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openMonth}
              onClose={hCloseMonth}
              onOpen={hOpenMonth}
              value={_month}
              onChange={event => _setMonth(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'January'}>January</MenuItem>
              <MenuItem value={'Febuary'}>Febuary</MenuItem>
              <MenuItem value={'March'}>March</MenuItem>
              <MenuItem value={'April'}>April</MenuItem>
              <MenuItem value={'May'}>May</MenuItem>
              <MenuItem value={'June'}>June</MenuItem>
              <MenuItem value={'July'}>July</MenuItem>
              <MenuItem value={'August'}>August</MenuItem>
              <MenuItem value={'September'}>September</MenuItem>
              <MenuItem value={'October'}>October</MenuItem>
              <MenuItem value={'November'}>November</MenuItem>
              <MenuItem value={'December'}>December</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl2}>
            <InputLabel id="demo-controlled-open-select-label">Date</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openDate}
              onClose={hCloseDate}
              onOpen={hOpenDate}
              value={_date}
              onChange={event => _setDate(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'01'}>01</MenuItem>
              <MenuItem value={'02'}>02</MenuItem>
              <MenuItem value={'03'}>03</MenuItem>
              <MenuItem value={'04'}>04</MenuItem>
              <MenuItem value={'05'}>05</MenuItem>
              <MenuItem value={'06'}>06</MenuItem>
              <MenuItem value={'07'}>07</MenuItem>
              <MenuItem value={'08'}>08</MenuItem>
              <MenuItem value={'09'}>09</MenuItem>
              <MenuItem value={'10'}>10</MenuItem>
              <MenuItem value={'11'}>11</MenuItem>
              <MenuItem value={'12'}>12</MenuItem>
              <MenuItem value={'13'}>13</MenuItem>
              <MenuItem value={'14'}>14</MenuItem>
              <MenuItem value={'15'}>15</MenuItem>
              <MenuItem value={'16'}>16</MenuItem>
              <MenuItem value={'17'}>17</MenuItem>
              <MenuItem value={'18'}>18</MenuItem>
              <MenuItem value={'19'}>19</MenuItem>
              <MenuItem value={'20'}>20</MenuItem>
              <MenuItem value={'21'}>21</MenuItem>
              <MenuItem value={'22'}>22</MenuItem>
              <MenuItem value={'23'}>23</MenuItem>
              <MenuItem value={'24'}>24</MenuItem>
              <MenuItem value={'25'}>25</MenuItem>
              <MenuItem value={'26'}>26</MenuItem>
              <MenuItem value={'27'}>27</MenuItem>
              <MenuItem value={'28'}>28</MenuItem>
              <MenuItem value={'29'}>29</MenuItem>
              <MenuItem value={'30'}>30</MenuItem>
              <MenuItem value={'31'}>31</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl3}>
            <InputLabel id="demo-controlled-open-select-label">Year</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openYear}
              onClose={hCloseYear}
              onOpen={hOpenYear}
              value={_year}
              onChange={event => _setYear(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'1990'}>1990</MenuItem>
              <MenuItem value={'1991'}>1991</MenuItem>
              <MenuItem value={'1992'}>1992</MenuItem>
              <MenuItem value={'1993'}>1993</MenuItem>
              <MenuItem value={'1994'}>1994</MenuItem>
              <MenuItem value={'1995'}>1995</MenuItem>
              <MenuItem value={'1996'}>1996</MenuItem>
              <MenuItem value={'1997'}>1997</MenuItem>
              <MenuItem value={'1998'}>1998</MenuItem>
              <MenuItem value={'1999'}>1999</MenuItem>
              <MenuItem value={'2000'}>2000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openGender}
              onClose={handleClose}
              onOpen={handleOpen}
              value={_gender}
              onChange={event => _setGender(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addEmpInfo}
            disabled={disbtn}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}