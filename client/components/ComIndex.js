import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import { Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Img from "react-image";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '200px',
    backgroundColor: '#e3e3e3',
    [theme.breakpoints.down('sm')]: {
      padding: '200px 100px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '200px 50px'
    },
  },
  paper: {
    padding: '10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  images: {
    position: 'absolute', 
    margin: '-200px', 
    width: '100%', 
    height: '89%', 
    opacity: 0.7
  }
}));

export default function ComIndex() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
      <Img className={classes.images} src="http://localhost:3030/uploads/2019-12-29T13:14:12.301Zmacos.jpg" />
      <Typography style={{position: 'relative'}} variant="h4" gutterBottom>
        Find your Career now and here!
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <TextField id="standard-basic" label="Search Job" fullWidth />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" style={{ padding: '20px' }}>Search</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}