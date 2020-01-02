import React from 'react';
import Router, { withRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Axios from 'axios'
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    // minWidth: 275,
    minWidth: 175,
  },
});

export default function ComJob() {
  const classes = useStyles();
  const [job, setJob] = React.useState([])
  const apiUrl = 'http://localhost:3030/api/'

  React.useEffect(() => {

    const params = new URLSearchParams(window.location.search)

    const userid = params.get('nu')

    const token = localStorage.getItem('token')

    const header = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    Axios.get(apiUrl + `application/${userid}/`, header)
      .then(res => {
        console.log(res.data.jobApps)
        setJob(res.data.jobApps)
      })
      .catch(err => {
        console.log(err)
      })
  }, 1000)

  const handleCancel = (id) => {

    const token = localStorage.getItem('token')

    const header = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    if (confirm('Discontinue your application?')) {
      Axios.delete(apiUrl + `application/${id}`, header)
      setTimeout(() => {
        Router.push('/jobs')
      }, 1000);
    }
  }

  return (
    <Paper variant="outlined" style={{ backgroundColor: '#e3e3e3' }}>

      {job.length > 0 ? (
        <Container>

          {job.map(jo => (
            <div>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {jo.jobTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {jo.company}
                    </Typography><br />
                    <Typography variant="body2" style={{ color: '#008B8B' }} component="p">
                      Applicant sent
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions fullWidth>
                  <Button size="small" color="primary">
                    Message
                  </Button>
                  <Button size="small" color="primary" onClick={() => handleCancel(jo._id)}>
                    Cancel
                  </Button>
                </CardActions>
              </Card>
              <br />
            </div>
          ))}

        </Container>
      ) : (
          <div>
            <h3 style={{padding: '20px'}}>No Application for the moment</h3>
          </div>
        )}

    </Paper>
  );
}