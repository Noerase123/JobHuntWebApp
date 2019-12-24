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
    // marginTop: '',
    minWidth: 265,
  },
}));

export default function ExpectedSalary() {
  const classes = useStyles();
  const [gender, setGender] = React.useState('');
  const [openGender, setOpenGender] = React.useState(false);

  const handleChangeg = event => {
    setGender(event.target.value);
  };

  const handleClose = () => {
    setOpenGender(false);
  };
  const handleOpen = () => {
    setOpenGender(true);
  };

  const [currency, setCurrency] = React.useState('');
  const [openGenderc, setOpenGenderc] = React.useState(false);

  const handleChangec = event => {
    setCurrency(event.target.value);
  };

  const handleClosec = () => {
    setOpenGenderc(false);
  };
  const handleOpenc = () => {
    setOpenGenderc(true);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Expected Salary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="minimum" label="Minimum" type="number" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="maximum" label="Maximum" type="number" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Currency</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openGenderc}
              onClose={handleClosec}
              onOpen={handleOpenc}
              value={currency}
              onChange={handleChangec}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Phillipines Peso'}>Phillipines Peso</MenuItem>
              <MenuItem value={'US Dollars'}>US Dollars</MenuItem>
              <MenuItem value={'Singapore Dollar'}>Singapore Dollar</MenuItem>
              <MenuItem value={'Euro Pound'}>Euro Pound</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Frequency</InputLabel>
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
              <MenuItem value={'per month'}>Per Month</MenuItem>
              <MenuItem value={'per hour'}>Per Hour</MenuItem>
              <MenuItem value={'per year'}>Per Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}