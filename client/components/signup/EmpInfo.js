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
  const [gender, setGender] = React.useState('');
  const [openGender, setOpenGender] = React.useState(false);

  const [month, setMonth] = React.useState('');
  const [openMonth, setOpenMonth] = React.useState(false);

  const [date, setDate] = React.useState('');
  const [openDate, setOpenDate] = React.useState(false);

  const [year, setYear] = React.useState('');
  const [openYear, setOpenYear] = React.useState(false);

  const [code, setCode] = React.useState('');
  const [openCode, setOpenCode] = React.useState(false);
  
  const handleChangec = event => {
    setCode(event.target.value);
  };

  const handleChangeg = event => {
    setGender(event.target.value);
  };

  const handleChangem = event => {
    setMonth(event.target.value);
  };

  const handleChanged = event => {
    setDate(event.target.value);
  };

  const handleChangey = event => {
    setYear(event.target.value);
  };

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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Employee Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Firstname" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Lastname" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField required id="expDate" label="Location" fullWidth />
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
              value={code}
              onChange={handleChangec}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'+63'}>+63</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            type="number"
            id="phone"
            label="Phone Number"
            style={{width: '68%'}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Email"
            fullWidth
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
              value={month}
              onChange={handleChangem}
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
              value={date}
              onChange={handleChanged}
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
              value={year}
              onChange={handleChangey}
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
              value={gender}
              onChange={handleChangeg}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}