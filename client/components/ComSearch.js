import React from 'react';
import Router, { withRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios'
import { Container } from '@material-ui/core';
import jwt from 'jsonwebtoken'

const useStyles = makeStyles({
  card: {
    // minWidth: 275,
    minWidth: 175,
  },
});

export default function ComSearch() {
  const classes = useStyles();
  const [job, setJob] = React.useState([])
  const [count, setCount] = React.useState(false)
  const apiUrl = 'http://localhost:3030/api/'

  React.useEffect(() => {
    const apiUrlef = apiUrl + 'job/search'

    const query = new URLSearchParams(window.location.search)

    const search = query.get('q')

    Axios.get(apiUrlef + `?term=${search}`)
      .then(res => {
        console.log(res.data)
        setJob(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, 0)

  const selectID = (id) => {
    Router.push(`/jobDetails?g=${id}`)
  }

  const applyNow = (id) => {
    const token = localStorage.getItem('token')

    if (token === null) {
      Router.push('/login')
    }
    else {

      const tok = jwt.decode(token)
      const user = tok.user._id

      Axios.get(apiUrl + `application/job/${id}`)
        .then(res => {
          console.log(res.data)
          setCount(true)
        })
        .catch(err => {
          console.log(err)
        })

      const header = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }


      Axios.post(apiUrl + `application/${user}/${id}`, {}, header)
        .then(res => {
          console.log(res.data)
          alert(res.data.message)
        })
        .catch(err => {
          console.log(err)
          alert('conflict job user')
        })
    }
  }

  return (
    <Container>
      {job.map(jo => (
        <div>
          <Card className={classes.card}>
            <CardActionArea onClick={() => selectID(jo._id)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {jo.jobTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {jo.company}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {jo.location} | {jo.salary} PHP/ month
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Saved
              </Button>
              {count !== false ? (
                <Button size="small" color="primary" disabled>
                  Application Sent
                </Button>
              ) : (
                  <Button size="small" color="primary" onClick={() => applyNow(jo._id)}>
                    Apply Now
                </Button>
                )}

            </CardActions>
          </Card>
          <br />
        </div>
      ))}

    </Container>
  );
}