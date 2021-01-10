// ReactJS Imports
import React from "react";
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// Material UI imports
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Container, Grid, Card, CardContent, Button, Tooltip, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
        width:'100%'
    }
})

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

class Extraterrestrial extends React.Component {
    constructor(props) {
        super(props);
    }

    themeConfig = createMuiTheme({
        palette: {
          primary: {
            main: '#001897',
          },
        },
    });



    render() {
        const { classes } = this.props;
        const qs = queryString.parse(this.props.location.search);
        
        return (
            <React.Fragment>
                <TitleComponent title={'Extraterrestrial'} />
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
                            <Typography variant={'h1'} style={{fontSize:40,fontWeight:'800', textAlign:'center'}}>
                                External Link
                            </Typography>
                            {qs.url ? <div>
                                <Typography variant={'h2'} style={{fontSize:20,fontWeight:'400', textAlign:'center', marginTop:15}}>
                                    You are about to visit a site not being controlled by PSITS XI, <br />which may have a different data privacy and protection policies.
                                </Typography>
                                <Typography variant={'h2'} style={{fontSize:15,fontWeight:'600', textAlign:'center', marginTop:30}}>
                                    {qs.url}
                                </Typography>
                                
                                <Button variant={'contained'} onClick={() => {
                                    window.open(qs.url);
                                }} style={{textAlign: 'center', marginTop: 30}} color="primary">Proceed</Button>
                            </div>
                            : 
                            <div>
                                <Typography variant={'h2'} style={{fontSize:20,fontWeight:'400', textAlign:'center', marginTop:15}}>
                                    URL parameter was not set.
                                </Typography>  
                            </div>}
                            
                        </Container>
                    </div>
                </ThemeProvider>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Extraterrestrial);
