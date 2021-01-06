/**
 * Navbar (Partial)
 * @author jmquijano
 */

// React Imports
import React from "react";
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'; // React Redux

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, IconButton, Button, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Other Imports
import LayoutConfigProvider from '../../config/layout.config.js';
import '../../assets/css/fonts.css';
import psitsLogo from '../../assets/images/psits-logo-v2020-rgb-alpha-@1x.png';


const styles = theme => ({
    root: {
        flexGrow: 1
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
    }
})

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        console.log(classes);
        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar} elevation={0} position="sticky">
                    <Container maxWidth={LayoutConfigProvider.container.maxWidth}>
                        <Toolbar disableGutters={true}>
                            
                            <div className={classes.logo}>
                                <img src={psitsLogo} height="60px" width="auto" />
                            </div>
                            <div className={classes.nvb_ontainer_desktop}>
                                <Button className={classes.menuItem}>Home</Button>
                                <Button className={classes.menuItem}>About</Button>
                                <Button className={classes.menuItem}>Projects</Button>
                                <Button className={classes.menuItem}>Contact Us</Button>
                                <Button className={classes.menuItem}>Blog</Button>
                            </div>
                            <div>
                                <IconButton className={classes.menuButton}>
                                    <MenuIcon />
                                </IconButton>
                            </div>
                            
                        </Toolbar>
                    </Container>
                    
                </AppBar>
            </div>
            
        )
    }
}

export default withStyles(styles)(Navbar);

