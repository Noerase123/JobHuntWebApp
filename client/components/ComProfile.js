import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Axios from 'axios'
const jwt = require('jsonwebtoken')

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
    editBtns: {
        backgroundColor: '#008B8B',
        color: '#fff'
    }
});

export default function ComJobDetails() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [basic, setBasic] = React.useState({})
    const [exps, setExps] = React.useState({})
    const [workexp, setWorkexp] = React.useState([])
    const [educ, setEduc] = React.useState([])

    React.useEffect(() => {

        const apiUrl = "http://localhost:3030/api/applicant/emp/"

        const token = localStorage.getItem('token')

        const tok = jwt.decode(token)
        //   console.log(tok.info._id)
        const id = tok.info._id

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        Axios.get(apiUrl + id, config)
            .then(res => {
                console.log(res.data.applicant)
                setBasic(res.data.applicant.basicInfo)
                setExps(res.data.applicant.expectedSalary)
                setWorkexp(res.data.applicant.workExp)
                setEduc(res.data.applicant.education)
            })
            .catch(err => {
                console.log(err)
            })
    }, 1000)

    return (
        <div>
            <Container>
                <Card className={classes.card}>
                    <CardContent>
                        <h3>Basic Information</h3>
                        <Paper style={{ padding: '10px', backgroundColor: '#e3e3e3' }}>
                            {basic.firstname || basic.lastname || basic.email || basic.contactNo
                                || basic.location || basic.birthday || basic.gender
                                ? (
                                    <div>
                                        <Typography variant="h5" component="h2">
                                            {basic.firstname} {basic.lastname}
                                        </Typography><br />
                                        <Typography className={classes.pos} color="textSecondary">
                                            {basic.email}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Contact No. : 0{basic.contactNo} <br />
                                            Birthday : {basic.birthday}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Location : {basic.location}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Gender : {basic.gender}
                                        </Typography>
                                        <Button variant="contained" className={classes.editBtns}>Edit Basic Info</Button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>No Content Available</p>
                                        <Button variant="contained" className={classes.editBtns}> Add Basic Info</Button>
                                    </div>
                             )}

                        </Paper><br />

                        <h3>Expected Salary</h3>
                        <Paper style={{ padding: '10px', backgroundColor: '#e3e3e3' }}>
                            {exps.minimum || exps.maximum || exps.currency || exps.frequency ? (
                                <div>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Minimum amount : {exps.minimum || 'No Content'}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Maximum amount : {exps.maximum || 'No Content'}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Currency : {exps.currency || 'No Content'}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Frequency demands :{exps.frequency || 'No Content'}
                                    </Typography>
                                    <Button variant="contained" className={classes.editBtns}>Edit Expected Salary</Button>
                                </div>
                            ) : (
                                    <div>
                                        <p>No Content Available</p>
                                        <Button variant="contained" className={classes.editBtns}>Add Expected Salary</Button>
                                    </div>
                                )}
                        </Paper><br />

                        <h3>Work Experience</h3>
                        <Paper style={{ padding: '10px', backgroundColor: '#e3e3e3' }}>
                            {workexp.length > 0 ? (
                                <div>
                                    {workexp.map(work => (
                                        <div>
                                            <Paper style={{ padding: '20px' }}>
                                                <Typography className={classes.pos}>
                                                    Title : {work.jobTitle}
                                                </Typography>
                                                <Typography className={classes.pos}>
                                                    Company : {work.company} <br />
                                                    Address : {work.address} <br />
                                                    from : {work.from} to: {work.to} <br />
                                                    current job : {work.current === true ? 'Yes' : 'No'}
                                                </Typography>

                                                <Button variant="contained" className={classes.editBtns}>Edit Basic Info</Button>
                                            </Paper>
                                            <br />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                    <div>
                                        <p>No Content Available</p>
                                        <Button variant="contained" className={classes.editBtns}>Add Work Experience</Button>
                                    </div>
                                )}
                        </Paper> <br />

                        <h3>Education Attainment</h3>
                        <Paper style={{ padding: '10px', backgroundColor: '#e3e3e3' }}>
                            {educ.length > 0 ? (
                                <div>
                                    {educ.map(edu => (
                                        <div>
                                            <Paper style={{ padding: '20px' }}>
                                                <Typography className={classes.pos}>
                                                    School : {edu.school}
                                                </Typography>
                                                <Typography className={classes.pos}>
                                                    Educational Attained : {edu.educationAttained} <br />
                                                    Course : {edu.course} <br />
                                                    from year : {edu.fromYear}
                                                    Graduate : {edu.graduated === true ? 'Yes' : 'No'}
                                                </Typography>

                                                <Button variant="contained" className={classes.editBtns}>Edit Basic Info</Button>
                                            </Paper>
                                            <br />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                    <div>
                                        <p>No Content Available</p>
                                        <Button variant="contained" className={classes.editBtns}>Add Education Attainment</Button>
                                    </div>
                                )}


                        </Paper>

                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    );
}