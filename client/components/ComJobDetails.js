import React from 'react';
import Router, { withRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios'
import { Container, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: 850,
  },
  header: {
    padding: '20px'
  }
});

export default function ComJobDetails() {
  const classes = useStyles();
  const [jobTitle, setJobTitle] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [salary, setSalary] = React.useState(0)
  const [fullTime, setFullTime] = React.useState(false)

  const [jobdesc, setJobdesc] = React.useState('')
  const [quali, setQuali] = React.useState('')

  const [flexi, setFlexi] = React.useState(false)
  const [holi, setHoli] = React.useState(false)
  const [sickleave, setSickleave] = React.useState(false)
  const [home, setHome] = React.useState(false)
  const [vacaleave, setVacaleave] = React.useState(false)
  const [medInsur, setMedInsur] = React.useState(false)
  const [freelunch, setFreelunch] = React.useState(false)

  const [level, setLevel] = React.useState(0)
  const [industry, setIndustry] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [vacancy, setVacancy] = React.useState(0)
  const [education, setEducation] = React.useState(0)
  const [web, setWeb] = React.useState('')
  const [res, setRes] = React.useState('')
  const [office, setOffice] = React.useState('')

  const [about, setAbout] = React.useState('')
  const [year, setYear] = React.useState(0)

  const apiUrl = 'http://localhost:3030/api/'

  var urlParams = new URLSearchParams(window.location.search);

  let param = urlParams.get('g');

  React.useEffect(() => {

    Axios.get(apiUrl + `job/all/${param}`)
      .then(res => {
        const data = res.data.Job
        setJobTitle(data.header.jobTitle)
        setCompany(data.header.company)
        setLocation(data.header.location)
        setSalary(data.header.salary)
        setFullTime(data.header.fullTime)

        setJobdesc(data.JobInfo.jobDescription)
        setQuali(data.JobInfo.qualification)

        setFlexi(data.JobBenefits.flexitime)
        setHoli(data.JobBenefits.paidHolidays)
        setSickleave(data.JobBenefits.paidSickLeave)
        setHome(data.JobBenefits.workFromHome)
        setVacaleave(data.JobBenefits.paidVacationLeave)
        setMedInsur(data.JobBenefits.medicalInsurance)
        setFreelunch(data.JobBenefits.freeLunch)

        setLevel(data.JobSummary.jobLevel)
        setIndustry(data.JobSummary.industry)
        setCategory(data.JobSummary.jobCategory)
        setVacancy(data.JobSummary.vacancy)
        setEducation(data.JobSummary.education)
        setWeb(data.JobSummary.website)
        setRes(data.JobSummary.responseAccuracy)
        setOffice(data.JobSummary.officeAddress)

        setAbout(data.AboutCompany.overview)
        setYear(data.AboutCompany.yearStarted)

      })
      .catch(err => {
        console.log(err)
      })
  }, 1000)

  const educ = (education) => {

    switch (education) {
      case 1:
        return <span>Bachelor's Degree</span>
      case 2:
        return <span>Master's Degree</span>
      case 3:
        return <span>Doctoral's Degree</span>
    }
  }

  const jobLevel = (level) => {

    switch (level) {
      case 1:
        return <span>Entry Level / Fresh Graduate</span>
      case 2:
        return <span>Mid Level / Associate</span>
      case 3:
        return <span>Senior Level</span>
    }
  }

  return (
    <div>
      <Container>
        <Card className={classes.card}>
          <CardContent>
            <Paper className={classes.header}>
              <Typography gutterBottom variant="h5" component="h2">
                {jobTitle}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {company} <br />
                {location} <br />
                {salary} <br />
                {fullTime === true ? 'Full-Time' : 'Part-Time'} <br />
              </Typography>
            </Paper>
            <br />
            {jobdesc ? (
              <div>
                <h3>Job Description</h3>
                <Typography variant="body2" color="textSecondary" component="p">
                  {jobdesc}
                </Typography>
              </div>
            ) : (
                ''
              )}
            {quali ? (
              <div>
                <h3>Job Qualification</h3>
                <Typography variant="body2" color="textSecondary" component="p">
                  {jobdesc}
                </Typography>
              </div>
            ) : (
                ''
              )}

            <br />
            {sickleave ? (
              <div>
                <Paper className={classes.header}>
                  <h3>Job Benefits</h3>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {flexi === true ? <p>Flexible Time</p> : ''}
                    {holi === true ? <p>Paid Holidays</p> : ''}
                    {sickleave === true ? <p>Paid Sick Leave</p> : ''}
                    {home === true ? <p>Work from Home</p> : ''}
                    {vacaleave === true ? <p>paid Vacation Leave</p> : ''}
                    {medInsur === true ? <p>Medical Insurance</p> : ''}
                    {freelunch === true ? <p>Free Lunch</p> : ''}
                  </Typography>
                </Paper>
              </div>
            ) : (
                ''
              )}
            <br />
            {office ? (
              <div>
                <Paper className={classes.header}>
                  <h3>Job Summary</h3>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Job Level : {jobLevel(level)} <br />
                    Industry : {industry} <br />
                    Job Category : {category} <br />
                    Vacancy : {vacancy} <br />
                    Education : {educ(education)} <br />
                    Website : {web} <br />
                    Response Accuracy : {res} <br />
                    Office Address : {office}
                  </Typography>
                </Paper>
              </div>
            ) : (
                ''
              )}
            <br />
            <h3>About the company</h3>
            {about ? (
              <div>
                <Typography variant="body2" color="textSecondary" component="p">
                  In year {year}. {about}
                </Typography>
              </div>
            ) : (
                <div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    No overview at the moment...
                  </Typography>
                </div>
              )}
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Saved
          </Button>
            <Button size="small" color="primary">
              Apply Now
          </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}