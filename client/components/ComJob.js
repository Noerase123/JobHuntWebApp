import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios'

const useStyles = makeStyles({
  card: {
    // minWidth: 275,
    minWidth: 175,
  },
});

export default function ComJob() {
  const classes = useStyles();
  const [job, setJob] = React.useState([])

  React.useEffect(() => {
    const apiUrl = 'http://localhost:3030/api/'

    Axios.get(apiUrl + 'job')
      .then(res => {
        console.log(res.data.data)
        setJob(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      {job.map(jo => (
        <Card className={classes.card}>
          <CardActionArea onClick={() => console.log(jo.id)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {jo.jobInfo.jobTitle}
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {jo.jobInfo.company}
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {jo.jobInfo.location} | {jo.jobInfo.salary} PHP/ month
          </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Saved
        </Button>
            <Button size="small" color="primary">
              Apply Now
        </Button>
          </CardActions>
        </Card>
      ))}

    </div>
  );
}