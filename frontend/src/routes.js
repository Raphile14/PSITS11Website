/**
 * routes.js
 * This is responsible for parsing the JSON router config file.
 * NOTE: Components are imported in /config/routes.config.js file 
 * @author jmquijano
 */


// React JS Imports
import React from "react";

// React Router Dom Imports
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// React Helmet Imports
import Helmet from 'react-helmet';

// Configuration Imports
import { RouteConfigProvider } from './config/routes.config';
import { SiteConfigProvider } from './config/sites.config';
// Other Component Imports
import { TitleComponent } from './components/title';

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    {RouteConfigProvider.map((item, i) => {
                        return (  
                            <React.Fragment>
                                <TitleComponent title={item.title} />
                                <Route exact={item.exact} component={item.component} path={item.pathname} key={i} />
                            </React.Fragment>
                        );
                    })}
                </Switch>
            </Router>
        )
       
    }
}

export { Routes }