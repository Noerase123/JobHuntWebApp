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
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import MenuItem from '@material-ui/core/MenuItem'
const jwt = require('jsonwebtoken')

const useStyles = makeStyles(theme => ({
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
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ComProfile() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [basic, setBasic] = React.useState({})
    const [exps, setExps] = React.useState({})
    const [workexp, setWorkexp] = React.useState([])
    const [educ, setEduc] = React.useState([])
    const [ID, setId] = React.useState({})


    const [openGender, setOpenGender] = React.useState(false);

    const [openGenderc, setOpenGenderc] = React.useState(false);

    const [openMonth, setOpenMonth] = React.useState(false);

    const [openDate, setOpenDate] = React.useState(false);

    const [openYear, setOpenYear] = React.useState(false);

    const [openCode, setOpenCode] = React.useState(false);

    const handleClosec = () => {
        setOpenGenderc(false);
    };
    const handleOpenc = () => {
        setOpenGenderc(true);
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


    const URL = 'http://localhost:3030/'


    React.useEffect(() => {

        const apiUrl = URL + "api/applicant/emp/"

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

    const [openaddBasic, setAddBasic] = React.useState(false);
    const [openaddES, setOpenaddES] = React.useState(false);
    const [openaddWE, setOpenaddWE] = React.useState(false);
    const [openaddEduc, setOpenaddEduc] = React.useState(false);

    const [openeditBasic, setOpeneditBasic] = React.useState(false);
    const [openeditES, setOpeneditES] = React.useState(false);
    const [openeditWE, setOpeneditWE] = React.useState(false);
    const [openeditEduc, setOpeneditEduc] = React.useState(false);

    const [editworkexp, setEditworkexp] = React.useState({})
    const [editeduc, setEditeduc] = React.useState({})

    const handleCloseaddB = () => {
        setAddBasic(false)
    }

    const handleCloseaddES = () => {
        setOpenaddES(false);
    };

    const handleCloseES = () => {
        setOpeneditES(false)
    };

    const handleCloseBI = () => {
        setOpeneditBasic(false)
    }

    const handleCloseaddWE = () => {
        setOpenaddWE(false)
    }

    const handleCloseWE = () => {
        setOpeneditWE(false)
    }

    const handleCloseEduc = () => {
        setOpeneditEduc(false)
    }

    const handleCloseAddEduc = () => {
        setOpenaddEduc(false)
    }

    const addBasicInfo = () => {
        setAddBasic(true)
    }

    const editBasicInfo = () => {
        setOpeneditBasic(true)
    }

    const [first, setfirst] = React.useState('')
    const [last, setLast] = React.useState('')
    const [location, setlocation] = React.useState('')
    const [_code, _setCode] = React.useState('')
    const [number, setNumber] = React.useState(0)
    const [_month, _setMonth] = React.useState('')
    const [_date, _setDate] = React.useState('')
    const [_year, _setYear] = React.useState('')
    const [_gender, _setGender] = React.useState('')


    const addBasic = () => {

        const token = localStorage.getItem('token')
        const tok = jwt.decode(token)
        const id = tok.user._id

        const apiUrl = URL + `api/applicant/${id}`

        const payload = {
            "firstname": first,
            "lastname": last,
            "location": location,
            "contactNo": _code + number,
            "birthday": `${_month}/${_date}/${_year}`,
            "gender": _gender
        }

        Axios.post(apiUrl, payload)
            .then(res => {
                console.log(res.data)
                setAddBasic(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editBasic = (id) => {
        const apiUrl = URL + `api/applicant/${id}`
        const payload = [
            {
                "key": "firstname",
                "value": firstname
            },
            {
                "key": "lastname",
                "value": lastname
            },
            {
                "key": "location",
                "value": location
            },
            {
                "key": "contactNo",
                "value": contactNo
            },
            {
                "key": "birthday",
                "value": birthday
            },
            {
                "key": "gender",
                "value": gender
            }
        ]
        const token = localStorage.getItem('token')
        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        Axios.patch(apiUrl, payload, header)
            .then(res => {
                console.log(res.data)
                setOpeneditBasic(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editExpectedSalary = (id) => {
        localStorage.setItem('id_editExpectedSalary', id)
        setOpeneditES(true)
    }

    const [min, setmin] = React.useState(0)
    const [max, setmax] = React.useState(0)
    const [currency, setcurrency] = React.useState('')
    const [freq, setfreq] = React.useState('')

    const editES = () => {

        const id = localStorage.getItem('id_editExpectedSalary')

        const apiUrl = URL + 'api/expectedSalary/'

        const payload = [
            {
                "key": "minimum",
                "value": min,
            },
            {
                "key": "maximum",
                "value": max,
            },
            {
                "key": "currency",
                "value": currency,
            },
            {
                "key": "frequency",
                "value": freq
            },
        ]

        const token = localStorage.getItem('token')

        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.patch(apiUrl + id, payload, header)
            .then(res => {
                console.log(res)
                localStorage.removeItem('id_editExpectedSalary')
                setOpeneditES(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteEducation = (id) => {

        const apiUrl = URL + 'api/education/' + id

        const token = localStorage.getItem('token')

        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.delete(apiUrl, header)
            .then(res => {
                console.log(res.data.message)
                alert(res.data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editEducation = (id) => {
        console.log(id)
        // setOpeneditEduc(true)

        const token = localStorage.getItem('token')

        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const apiUrl = URL + 'api/education/'
        Axios.get(apiUrl + id, header)
            .then(res => {
                console.log(res.data)
                setEditeduc(res.data)
                setOpeneditEduc(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addExpectedSalary = () => {
        setOpenaddES(true);
    }

    const addES = () => {
        const apiUrl = URL + 'api/expectedSalary/'

        const payload = {
            "minimum": min,
            "maximum": max,
            "current": current,
            "frequency": freq
        }

        if (min !== "", max !== "", current !== "", freq !== "") {

            Axios.post(apiUrl + ID, payload)
                .then(res => {
                    console.log(res.data)
                    setOpenaddES(false)
                    alert(res.data.message)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            alert('Please Fill up the blank(s)')
            console.log(payload)
        }
    }

    const addWorkExperience = () => {
        setOpenaddWE(true)
    }

    const [_jobtitle, _setJobtitle] = React.useState('')
    const [_company, _setCompany] = React.useState('')
    const [_address, _setAddress] = React.useState('')
    const [_from, _setFrom] = React.useState('')
    const [_to, _setTo] = React.useState('')
    const [_current, _setCurrent] = React.useState(false)

    const editWE = () => {
        const id = localStorage.getItem('id_workexp')

        const apiUrl = URL + 'api/workExperience/' + id

        const payload = [
            {
                "key": "jobTitle",
                "value": _jobtitle,
            },
            {
                "key": "company",
                "value": _company,
            },
            {
                "key": "address",
                "value": _address,
            },
            {
                "key": "from",
                "value": _from,
            },
            {
                "key": "to",
                "value": _to,
            },
            {
                "key": "current",
                "value": _current
            }
        ]

        const token = localStorage.getItem('token')

        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.patch(apiUrl, payload, header)
            .then(res => {
                console.log(res)
                setOpeneditWE(false)
            })
            .catch(err => {
                console.log(err)
            })


    }

    const deleteWorkExperience = (id) => {

        const apiUrl = URL + 'api/workExperience/' + id

        const token = localStorage.getItem('token')

        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.delete(apiUrl, header)
            .then(res => {
                console.log(res.data.message)
                alert(rest.data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editWorkExperience = (id) => {
        localStorage.setItem('id_workexp', id)
        // setOpeneditWE(true)

        const token = localStorage.getItem('token')

        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const apiUrl = URL + 'api/workExperience/'
        Axios.get(apiUrl + id, header)
            .then(res => {
                console.log(res.data)
                setEditworkexp(res.data)
                setOpeneditWE(true)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const addWE = () => {
        const apiUrl = URL + 'api/workExperience/'

        const payload = {
            "jobTitle": _jobtitle,
            "company": _company,
            "address": _address,
            "from": _from,
            "to": _to,
            "current": _current
        }

        if (_jobtitle !== "" || _company !== "" || _address !== "" || _from !== "" || _to !== "") {

            Axios.post(apiUrl + ID, payload)
                .then(res => {
                    console.log(res.data)
                    setOpenaddWE(false)
                    alert(res.data.message)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            alert('Please Fill up the blank(s)')
            console.log(payload)
        }
    }

    const addEducation = () => {
        setOpenaddEduc(true)
    }

    const [educationAttained, setEducationAttained] = React.useState('')
    const [course, setCourse] = React.useState('')
    const [school, setSchool] = React.useState('')
    const [fromYear, setFromyear] = React.useState(0)
    const [grad, setGrad] = React.useState(false)
    const [disbtn, setDisbtn] = React.useState(false)

    const addEduc = () => {
        const apiUrl = URL + `api/education/${ID}`

        const payload = {
            "educationAttained" : educationAttained,
            "course" : course,
            "school" : school,
            "fromYear" : fromYear,
            "graduated" : grad
        }

        Axios.post(apiUrl, payload)
            .then(res => {
                console.log(res)
                setOpenaddEduc(false)
            })
            .catch(err => {
                console.log(err)
            })
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
                                        <Button variant="contained" onClick={editBasicInfo} className={classes.editBtns}>
                                            Edit Basic Info
                                        </Button>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={openeditBasic}
                                            onClose={handleCloseBI}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade in={openeditBasic}>
                                                <div className={classes.paper}>
                                                    <h2 id="transition-modal-title">Edit Basic Information</h2>
                                                    <TextField required label="Firstname" id="firstname" defaultValue={basic.firstname} value={basic.firstname} onChange={e => setFirstname(e.target.value)} />
                                                    <TextField required label="Lastname" id="lastname" defaultValue={basic.lastname} value={basic.lastname} onChange={e => setLastname(e.target.value)} /> <br /><br />
                                                    {/* <TextField required label="Email" id="email" defaultValue={basic.email} value={basic.email} onChange={e => setEmail(e.target.value)} /> */}
                                                    <TextField required label="Location" id="location" defaultValue={basic.location} value={basic.location} onChange={e => setLocation(e.target.value)} /> <br /> <br />
                                                    <TextField required label="Contact No." id="contactNo" defaultValue={basic.contactNo} value={basic.contactNo} onChange={e => setContactno(e.target.value)} />
                                                    <TextField required label="Birthday" id="birthday" defaultValue={basic.birthday} value={basic.birthday} onChange={e => setBirthday(e.target.value)} /> <br /> <br />
                                                    <TextField required label="Gender" id="gender" defaultValue={basic.gender} value={basic.gender} onChange={e => setGender(e.target.value)} /> <br /> <br />
                                                    <Button variant="contained" onClick={() => editBasic(ID)} >Done</Button>
                                                </div>
                                            </Fade>
                                        </Modal>
                                    </div>
                                ) : (
                                    <div>
                                        <p>No Content Available</p>
                                        <Button variant="contained" onClick={addBasicInfo} className={classes.editBtns}>
                                            Add Basic Info
                                        </Button>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={openaddBasic}
                                            onClose={handleCloseaddB}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade in={openaddBasic}>
                                                <div className={classes.paper}>
                                                    <h2 id="transition-modal-title">Add Basic Information</h2>

                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={6}>
                                                            <TextField required id="firstname" label="Firstname" fullWidth onChange={event => setfirst(event.target.value)} />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <TextField required id="lastname" label="Lastname" fullWidth onChange={event => setLast(event.target.value)} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField required id="location" label="Location" fullWidth onChange={event => setlocation(event.target.value)} />
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
                                                                style={{ width: '68%' }}
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
                                                                onClick={() => addBasic()}
                                                            >
                                                                Save
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Fade>
                                        </Modal>
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
                                    <Button variant="contained" onClick={() => editExpectedSalary(exps._id)} className={classes.editBtns}>
                                        Edit Expected Salary
                                    </Button>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={openeditES}
                                        onClose={handleCloseES}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={openeditES}>
                                            <div className={classes.paper}>
                                                <h2 id="transition-modal-title">Edit Expected Salary</h2>
                                                {/* <TextField required type="number" label="Minimum" defaultValue={exps.minimum} />
                                                <TextField required type="number" label="Maximum" defaultValue={exps.maximum} /> <br /><br />
                                                <TextField required label="Currency" defaultValue={exps.currency} />
                                                <TextField required label="Frequency" defaultValue={exps.frequency} /> <br /> <br />
                                                <Button variant="contained" onClick={editES} >Done</Button> */}

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField required id="minimum" label="Minimum" type="number" defaultValue={exps.minimum} fullWidth onChange={event => setmin(event.target.value)} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField required id="maximum" label="Maximum" type="number" defaultValue={exps.maximum} fullWidth onChange={event => setmax(event.target.value)} />
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
                                                                value={exps.currency}
                                                                onChange={event => setcurrency(event.target.value)}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>{exps.currency}</em>
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
                                                                value={exps.frequency}
                                                                onChange={event => setfreq(event.target.value)}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>{exps.frequency}</em>
                                                                </MenuItem>
                                                                <MenuItem value={'per month'}>Per Month</MenuItem>
                                                                <MenuItem value={'per hour'}>Per Hour</MenuItem>
                                                                <MenuItem value={'per year'}>Per Year</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            fullWidth
                                                            onClick={editES}
                                                        >
                                                            Save
                                                        </Button>
                                                    </Grid>
                                                </Grid>

                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                            ) : (
                                    <div>
                                        <p>No Content Available</p>
                                        <Button variant="contained" onClick={addExpectedSalary} className={classes.editBtns}>
                                            Add Expected Salary
                                        </Button>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={openaddES}
                                            onClose={handleCloseaddES}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade in={openaddES}>
                                                <div className={classes.paper}>
                                                    <h2 id="transition-modal-title">Add Expected Salary</h2>
                                                    <TextField required type="number" label="Minimum" />
                                                    <TextField required type="number" label="Maximum" /> <br /><br />
                                                    <TextField required label="Currency" />
                                                    <TextField required label="Frequency" /> <br /> <br />
                                                    <Button variant="contained" onClick={addES} >Done</Button>
                                                </div>
                                            </Fade>
                                        </Modal>
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

                                                <Button variant="contained" onClick={() => editWorkExperience(work._id)} className={classes.editBtns}>
                                                    Edit
                                                </Button>
                                                <Button variant="contained" onClick={() => deleteWorkExperience(work._id)} className={classes.editBtns}>
                                                    Delete
                                                </Button>
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    className={classes.modal}
                                                    open={openeditWE}
                                                    onClose={handleCloseWE}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                >
                                                    <Fade in={openeditWE}>
                                                        <div className={classes.paper}>
                                                            <h2 id="transition-modal-title">Edit Work Experience</h2>
                                                            <TextField required label="Job Title" defaultValue={editworkexp.jobTitle} />
                                                            <TextField required label="Company" defaultValue={editworkexp.company} /> <br /><br />
                                                            <TextField required label="Address" defaultValue={editworkexp.address} /> <br /><br />
                                                            <TextField required label="From" defaultValue={editworkexp.from} />
                                                            <TextField required label="To" defaultValue={editworkexp.to} /> <br /> <br />
                                                            <TextField required label="Current" defaultValue={editworkexp.current} /> <br /> <br />
                                                            <Button variant="contained" onClick={editWE} >Done</Button>
                                                        </div>
                                                    </Fade>
                                                </Modal>
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

                            <Button variant="contained" onClick={addWorkExperience} className={classes.editBtns}>
                                Add Work Experience
                            </Button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={openaddWE}
                                onClose={handleCloseaddWE}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={openaddWE}>
                                    <div className={classes.paper}>
                                        <h2 id="transition-modal-title">Add Work Experience</h2>
                                        <Grid container spacing={16} style={{ padding: '0px -20px' }}>
                                            <Grid item xs={12}>
                                                <TextField required id="jobTitle" label="Job Title" fullWidth onChange={event => _setJobtitle(event.target.value)} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField required id="company" label="Company" fullWidth onChange={event => _setCompany(event.target.value)} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField required id="companyAdd" label="Address" fullWidth onChange={event => _setAddress(event.target.value)} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField required id="from" label="From" type="date" fullWidth onChange={event => _setFrom(event.target.value)} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField required id="to" label="To" type="date" fullWidth onChange={event => _setTo(event.target.value)} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={_current}
                                                                // onChange={handleChange('checkedB')}
                                                                // value="checkedB"
                                                                color="primary"
                                                                onChange={event => _setCurrent(event.target.checked)}
                                                            />
                                                        }
                                                        label="Employed?"
                                                    />
                                                </FormGroup>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={addWE}
                                                >
                                                    Done
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </div>
                                </Fade>
                            </Modal>
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

                                                <Button variant="contained" onClick={() => editEducation(edu._id)} className={classes.editBtns}>
                                                    Edit
                                                </Button>
                                                <Button variant="contained" onClick={() => deleteEducation(edu._id)} className={classes.editBtns}>
                                                    Delete
                                                </Button>
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    className={classes.modal}
                                                    open={openeditEduc}
                                                    onClose={handleCloseEduc}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                >
                                                    <Fade in={openeditEduc}>
                                                        <div className={classes.paper}>
                                                            <h2 id="transition-modal-title">Edit Education</h2>
                                                            <TextField required label="Education Attained" defaultValue={editeduc.educationAttained} />
                                                            <TextField required label="Course" defaultValue={editeduc.course} /> <br /><br />
                                                            <TextField required label="School" defaultValue={editeduc.school} />
                                                            <TextField required type="number" label="From year" defaultValue={editeduc.fromYear} /> <br /> <br />
                                                            <TextField required label="Graduated" defaultValue={editeduc.graduated} /> <br /> <br />
                                                            <Button variant="contained" onClick={handleCloseEduc} >Done</Button>
                                                        </div>
                                                    </Fade>
                                                </Modal>
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

                            <Button variant="contained" onClick={() => addEducation()} className={classes.editBtns}>
                                Add Education Attainment
                            </Button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={openaddEduc}
                                onClose={handleCloseAddEduc}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={openaddEduc}>
                                    <div className={classes.paper}>
                                        <h2 id="transition-modal-title">Add Education Attainment</h2>
                                        {/* <TextField required label="Education Attained" />
                                        <TextField required label="Course" /> <br /><br />
                                        <TextField required label="School" />
                                        <TextField required type="number" label="From year" /> <br /> <br />
                                        <TextField required label="Graduated" /> <br /> <br />
                                        <Button variant="contained" onClick={handleCloseAddEduc} >Done</Button> */}

                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <FormControl className={classes.formControl} fullWidth>
                                                    <InputLabel id="demo-controlled-open-select-label">Educational Attainment</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        open={openGender}
                                                        onClose={handleClose}
                                                        onOpen={handleOpen}
                                                        value={educationAttained}
                                                        onChange={event => setEducationAttained(event.target.value)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={`Bachelor's Degree`}>Bachelor's Degree</MenuItem>
                                                        <MenuItem value={`Masteral's Degree`}>Masteral's Degree</MenuItem>
                                                        <MenuItem value={`Doctoral's Degree`}>Doctoral's Degree</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField required id="course" label="Course" fullWidth onChange={event => setCourse(event.target.value)} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField required id="school" label="School" fullWidth onChange={event => setSchool(event.target.value)} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField required id="fromYear" type="number" label="Year Started" fullWidth onChange={event => setFromyear(event.target.value)} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={grad}
                                                                // onChange={handleChange('checkedB')}
                                                                onChange={event => setGrad(event.target.checked)}
                                                                // value="checkedB"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="Graduated?"
                                                    />
                                                </FormGroup>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    onClick={addEduc}
                                                >
                                                    Save
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </div>
                                </Fade>
                            </Modal>

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