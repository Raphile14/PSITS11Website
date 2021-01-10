// ReactJS Imports
import React from "react";
import { Link } from 'react-router-dom';

// Axios Imports
import axios from 'axios';

// Material UI imports
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Container, Grid, Card, CardContent, Button, IconButton, Tooltip, TextField, FormControlLabel, Checkbox, LinearProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

// Configuration Imports
import { SiteConfigProvider } from '../config/sites.config';
import LayoutConfigProvider from '../config/layout.config.js';

// Component Imports
import { TitleComponent } from './title';

// Other Imports
import '../assets/css/fonts.css';
import psitsLogo from '../assets/images/psits-logo-v2020-rgb-alpha-@1x.png';
import notificationVector from '../assets/images/10176.jpg';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden'
    },
    menuButton: {
        marginRight: theme.spacing(0),
        color: '#001BA9',
        fontFamily: 'Lato, sans-serif',
        fontSize: 15,
        fontWeight: 'bold',
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    logo: {
        flexGrow: 1,
        textAlign: 'center'
    },
    appbar: {
        background: '#fff',
        color: '#001BA9',
        padding: '10px 5px',
        borderBottom: '1px solid #cccccc'
        
    },
    menuItem: {
        color: '#001BA9',
        fontFamily: 'Lato, sans-serif',
        fontSize: 15,
        fontWeight: 800,
        padding: '8px 20px',
        borderRadius: 50,
        margin: '0px 5px'
    },
    nvb_ontainer_desktop: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    mnt_section_main: {
        height: '88.2vh',
        background: '#fff'
        
    },
    mnt_wrap: {
        fontFamily: 'Lato, sans-serif'
    },
    mnt_section_h1: {
        fontWeight: '200', 
        textTransform: 'uppercase',
        fontSize: 50, 
        marginTop: 110,
        color: '#3d3d3d',
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            fontSize: 45, 
            marginTop: 30,
            textAlign: 'center'
        }
    },
    mnt_section_h2: {
        fontWeight: '600',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 45,
        [theme.breakpoints.down('sm')]: {
            
            textAlign: 'center',
            fontSize: 15,
        }
    },
    mnt_section_right: {
        textAlign: 'left',
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            width: '100%'
        }
    },
    mnt_textfield_fullwidth: {
        width:'100%',
        marginBottom: 10
    },
    dialogTitle: {
        fontSize:20, 
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize:14
        }
    }
})

class Maintenance extends React.Component {
    launchDate = SiteConfigProvider.expectedLaunch;
    startDate = new Date(SiteConfigProvider.expectedLaunch);

    state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: false,
        notifyModalOpen: false,
        submitBtnDisabled: true,
        email: null,
        firstName: null,
        lastName: null,
        emailHasError: false,
        emailHelperText: null,
        firstNameHasError: false,
        firstNameHelperText: null,
        lastNameHasError: false,
        lastNameHelperText: null,
        loading: false,
        showConfirm: false,
        emailDisabled: false,
        firstNameDisabled: false,
        lastNameDisabled: false,
        privacyCheckboxDisabled: false
    };

    constructor (props) {
        super(props);
        this.countDownId = null;
        
    }

    componentDidMount() {
        this.countDownId = setInterval(this.timerInit, 1000);

        
    }

    componentWillUnmount() {
        if (this.countDownId) {
            clearInterval(this.countDownId);
        }
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    timerInit = () => {
        const startDate = this.startDate;
        // console.log(startDate);

        const now = new Date().getTime();
        if (!startDate) {
          this.setState({ expired: true });
          return;
        }
        const countDownStartDate = new Date(startDate).getTime();
        const distance = countDownStartDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        // For countdown is finished
        if (distance < 0) {
          clearInterval(this.countDownId);
          this.setState({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            expired: true
          });
          return;
        }
        this.setState({ days, hours, minutes, seconds, expired: false });
    };

    pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    themeConfig = createMuiTheme({
        palette: {
          primary: {
            main: '#001897',
          },
        },
    });

    handleNotifyModalOpen = () => {
        this.setState({
            notifyModalOpen: true
        });
    }

    handleNotifyModalClose = () => {
        this.setState({
            notifyModalOpen: false
        });
    }

    notifySubmit = () => {
        this.setState({
            emailHasError: false,
            emailHelperText: null,
            firstNameHasError: false,
            firstNameHelperText: null,
            lastNameHasError: false,
            lastNameHelperText: null
        });

        if (!this.validateEmail()) {
            this.setState({
                emailHasError: true,
                emailHelperText: "Email address must be a valid format.",
            });
        }

        if (!this.state.firstName) {
            this.setState({
                firstNameHasError: true,
                firstNameHelperText: "First name must not be empty.",
            });
        }
        
        if (!this.state.lastName) {
            this.setState({
                lastNameHasError: true,
                lastNameHelperText: "Last name must not be empty.",
            });
        }
        
        if (this.validateEmail() && this.state.firstName && this.state.lastName) {
            this.axiosSubscribeNewsletter()
                .then((res) => {
                    let response = res.data;

                    if (response.success) {
                        this.setState({
                            email: null,
                            firstName: null,
                            lastName: null,
                            submitBtnDisabled: true,
                            showConfirm: true,
                            emailDisabled: true,
                            firstNameDisabled: true,
                            lastNameDisabled: true,
                            privacyCheckboxDisabled: true,
                            submitBtnDisabled: true
                        });

                        setTimeout(() => {
                            this.setState({
                                notifyModalOpen: false
                            });
                        }, 5000);
                        
                    } else {
                        this.setState({
                            emailHasError: true,
                            emailHelperText: response.message
                        });
                    }

                    this.setState({loading: false});

                })
                .catch((error) => {

                });
        }
    }

    axiosSubscribeNewsletter = async () => {
        this.setState({loading: true});

        let payload = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        return await axios({
            method: 'post',
            url: SiteConfigProvider.api_baseurl + 'newsletter/subscribe/new',
            data: payload
        });
    }

    validateEmail = () => {
        let email = this.state.email;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        const { classes } = this.props;
        // console.log(this.state.loading);
        return (
            <React.Fragment>
                <TitleComponent title={'Maintenance'} />
                <ThemeProvider theme={this.themeConfig}>
                    <div className={classes.mnt_wrap}>
                        <div className={classes.root}>
                            <AppBar className={classes.appbar} elevation={0} position="sticky">
                                <Container maxWidth={LayoutConfigProvider.container.maxWidth}>
                                    <Toolbar disableGutters={true}>
                                        
                                        <div className={classes.logo}>
                                            <img src={psitsLogo} height="60px" width="auto" />
                                        </div>
                        
                                        
                                        
                                    </Toolbar>
                                </Container>
                                
                            </AppBar>
                        </div>
                        <Container maxWidth={LayoutConfigProvider.container.MaxWidth} style={{marginTop:25, textAlign: 'center'}}>
                            <Typography variant={'h1'} className={classes.mnt_section_h1}>
                                Coming Soon
                            </Typography>
                            <Typography variant={'h2'} className={classes.mnt_section_h2}>
                                We are creating something awesome!
                            </Typography>
                            
                            <Grid spacing={2} container justify={'center'} >
                                <Grid item>
                                    <Card elevation={2} style={{width:100, textAlign:'center'}}>
                                        <CardContent>
                                            <Typography variant={'h3'}>
                                                {this.pad(this.state.days, 2)}
                                            </Typography>
                                            <Typography>
                                                Days
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card style={{width:100, textAlign:'center'}}>
                                        <CardContent>
                                            <Typography variant={'h3'}>
                                                {this.pad(this.state.hours, 2)}
                                            </Typography>
                                            <Typography>
                                                Hours
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card style={{width:100, textAlign:'center'}}>
                                        <CardContent>
                                            <Typography variant={'h3'}>
                                                {this.pad(this.state.minutes, 2)}
                                            </Typography>
                                            <Typography>
                                                Minutes
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card style={{width:100, textAlign:'center'}}>
                                        <CardContent>
                                            <Typography variant={'h3'}>
                                                {this.pad(this.state.seconds, 2)}
                                            </Typography>
                                            <Typography>
                                                Seconds
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            
                            <Button variant="contained" color="primary" style={{marginTop:35}} onClick={this.handleNotifyModalOpen}>Notify Me</Button>
                            
                            
                        </Container>
                                
                        <Dialog
                            open={this.state.notifyModalOpen}
                            TransitionComponent={this.Transition}
                            keepMounted
                            onClose={this.handleNotifyModalClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            style={{minWidth: 300, width: '100%'}}
                            maxWidth={'lg'}
                        >
                            {this.state.loading && <LinearProgress color="primary" style={{height: 5}} />}
                            
                            <DialogTitle id="alert-dialog-slide-title">
                                <Grid container alignItems="center">
                                    <Grid item md={6} xs={10}>
                                        <Typography variant={'h5'} className={classes.dialogTitle} style={{}}>
                                            {"Be one of the first to be notified."}
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item md={6} xs={2} style={{textAlign:'right'}}>
                                        <IconButton style={{padding: 5}} onClick={this.handleNotifyModalClose}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                
                                
                                
                            </DialogTitle>
                            <DialogContent>
                                <Grid container justify="center" alignContent="center" alignItems="center" style={{maxWidth:850, width: '100%'}}>
                                    
                                    <Grid item md={6} xs={12} style={{textAlign:'center'}}>
                                        <img src={notificationVector}  style={{textAlign:'right', maxWidth: 500, width: '100%'}} height={'100%'} />
                                        <Tooltip style={{marginBottom:35}} title="People vector created by pch.vector - www.freepik.com" placement="top">
                                            <Button onClick={() => {
                                                window.open('/extraterrestrial?url=https://www.freepik.com/vectors/people', '_blank');
                                            }}>

                                                Image Attribution

                                            </Button>
                                        </Tooltip>
                                        
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        {this.state.showConfirm && (
                                            <Typography style={{textAlign: 'center', fontSize: 14, fontWeight: 600, marginBottom: 25, color: '#4f4f4f'}}>
                                                <Typography style={{fontSize: 18,fontWeight:600}}>Success!</Typography> 
                                                We will be updating you once the site is available.
                                            </Typography>
                                        )}
                                        
                                        <form style={{width: '100%'}}>
                                            <TextField className={classes.mnt_textfield_fullwidth} label="Email Address" 
                                                disabled={this.state.emailDisabled}
                                                variant="outlined"
                                                error={this.state.emailHasError}
                                                helperText={this.state.emailHelperText}
                                                value={this.state.email}	 
                                                onChange={(event) => {
                                                    this.setState({
                                                        email: event.target.value
                                                    })
                                                }}
                                            />
                                            <TextField className={classes.mnt_textfield_fullwidth} label="First Name"
                                                disabled={this.state.firstNameDisabled} 
                                                variant="outlined"
                                                error={this.state.firstNameHasError}
                                                helperText={this.state.firstNameHelperText}
                                                value={this.state.firstName}
                                                onChange={(event) => {
                                                    this.setState({
                                                        firstName: event.target.value
                                                    })
                                                }} 
                                            />
                                            <TextField className={classes.mnt_textfield_fullwidth} label="Last Name" 
                                                disabled={this.state.lastNameDisabled}
                                                variant="outlined"
                                                error={this.state.lastNameHasError}
                                                helperText={this.state.lastNameHelperText}
                                                value={this.state.lastName}
                                                onChange={(event) => {
                                                    this.setState({
                                                        lastName: event.target.value
                                                    })
                                                }} 
                                            />

                                            <div style={{marginTop:15,marginBottom:20}}>
                                                <Typography style={{fontSize:13,marginBottom:5,marginLeft:30}}>
                                                    <a style={{color:'#000',textDecoration:'none'}} href="https://privacy.psits11.org" target="__blank">
                                                        Read our <b>Data Privacy Statement</b>.
                                                    </a>
                                                </Typography>
                                                <FormControlLabel 
                                                    color="primary" size={'small'} 
                                                    control={<Checkbox disabled={this.state.privacyCheckboxDisabled} onChange={(event) => {
                                                        if (event.target.checked) {
                                                            this.setState({
                                                                submitBtnDisabled: false
                                                            });
                                                        } else {
                                                            this.setState({
                                                                submitBtnDisabled: true
                                                            });
                                                        }
                                                    }} color="primary" name="checkedC" />} 
                                                    label={<Typography style={{fontSize:14}}>I have read and acknowledged the data privacy statement of PSITS XI.</Typography>}
                                                />
                                                
                                            </div>
                                        </form>
                                        <Button disabled={this.state.submitBtnDisabled} onClick={this.notifySubmit} style={{marginTop:0,marginBottom:15}}  variant="outlined" color="primary">
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                                
                            </DialogContent>
                        </Dialog>
                    </div>
                </ThemeProvider>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Maintenance);
