// ReactJS Imports
import React from "react";

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';


// Configuration Imports
import LayoutConfigProvider from '../config/layout.config.js';

// Other Imports
import Navbar from './partials/navbar';
import peopleVector from '../assets/images/vector-people-codes-@1x.svg';

const styles = theme => ({
    hp_hero_section: {
        background: 'transparent', 
        ...LayoutConfigProvider.homepage.hp_hero_section
    },
    hp_hero_section_container: {
        maxWidth: 750
    },
    hp_hero_section_title: {
        fontFamily: 'Rockwell',
        fontSize: 60,
        fontWeight: 500,
        lineHeight: 0.8,
        color: '#001BA9',
        padding: '0px 0px 15px 0px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 40
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 30
        }
    },
    hp_hero_section_title_variant2: {
        color: '#D92424'
    },
    hp_hero_section_description: {
        maxWidth: '500px',
        color: '#656E9B',
        fontFamily: 'Lato, sans-serif',
        fontWeight: 'bold',
        fontSize: 18,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        }
    }
})

class Home extends React.Component {
    themeConfig = createMuiTheme({
        palette: {
          primary: {
            main: '#001897',
          },
        },
    });

    render() {
        const { classes } = this.props;

        return (
            <ThemeProvider theme={this.themeConfig}>
                <React.Fragment>
                    <Navbar />
                </React.Fragment>
                <div style={{marginTop:0}}>
                    <div className={classes.hp_hero_section}>
                        <Container maxWidth={LayoutConfigProvider.container.maxWidth} style={{marginTop:0}}>
                            <img src={peopleVector} style={LayoutConfigProvider.homepage.hp_hero_section_image} />
                            <Container className={classes.hp_hero_section_container} maxWidth={false}>
                                <Typography className={classes.hp_hero_section_title} variant={'h5'}>
                                    <b className={classes.hp_hero_section_title_variant2}>Lorem</b> ipsum dolor sit <br />
                                    amet <b className={classes.hp_hero_section_title_variant2}>consectetuer</b>.
                                </Typography>
                                <Typography className={classes.hp_hero_section_description} variant={'p'}>
                                    Lorem ipsum dolor sit amet, 
                                    consectetuer adipiscing elit. 
                                    Aenean commodo ligula eget dolor. 
                                    Aenean massa. 
                                    Cum sociis natoque penatibus et magnis dis parturient montes, 
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
                                    pretium quis, sem. Nulla consequat massa quis enim. Donec pede.
                                </Typography>
                            </Container>
                            
                        </Container>
                    </div>
                </div>
            </ThemeProvider>
            
        )
    }
}

export default withStyles(styles)(Home);
