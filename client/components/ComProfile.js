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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export default function ComProfile() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [basic, setBasic] = React.useState({})
    const [exps, setExps] = React.useState({})
    const [workexp, setWorkexp] = React.useState([])
    const [educ, setEduc] = React.useState([])
    const [ID, setId] = React.useState({})

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

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
                setId(res.data.applicant.id)
            })
            .catch(err => {
                console.log(err)
            })
    }, 1000)

    const editBasicInfo = (id) => {
        console.log(`this is my id bitch ${id}`)
    }

    const editExpectedSalary = (id) => {

    }

    const editWorkExperience = (id) => {

    }

    const editEducation = (id) => {

    }

    const addExpectedSalary = () => {
        console.log('addExpectedSalary')
        setOpen(true);
    }

    const addWorkExperience = () => {

    }

    const addEducation = () => {

    }

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
                                        <Button variant="contained" onClick={() => editBasicInfo(ID)} className={classes.editBtns}>Edit Basic Info</Button>
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
                                        <Button variant="contained" onClick={addExpectedSalary} className={classes.editBtns}>Add Expected Salary</Button>
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
                                    </div>
                                )}

                            <Button variant="contained" className={classes.editBtns}>Add Work Experience</Button>
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
                                                    from year : {edu.fromYear} <br />
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
                                    </div>
                                )}

                            <Button variant="contained" className={classes.editBtns}>Add Education Attainment</Button>

                        </Paper>


                        {open ? (
                            <div>
                                <Modal
                                    aria-labelledby="spring-modal-title"
                                    aria-describedby="spring-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                        <div className={classes.paper}>
                                            <h2 id="spring-modal-title">Spring modal</h2>
                                            <p id="spring-modal-description">react-spring animates me.</p>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        ) : (
                            ''
                        )}

                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    );
}