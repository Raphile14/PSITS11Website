import React from 'react';
import './App.css';
import { Routes } from './routes';
import { SiteConfigProvider } from './config/sites.config';
import Maintenance from './components/maintenance';
import Extraterrestrial from './components/extraterrestrial';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function ExtraterrestrialMaintenance() {
  
  return (
    <Router>
      <Switch>
        <Route exact={true} component={Extraterrestrial} path={'/extraterrestrial'} />
        <Route path={'*'} component={Maintenance} />
        
      </Switch>
    </Router>
  )
}

function App() {
  React.useEffect(() => {
    
  }, []);

  
  if (SiteConfigProvider.maintenance) {
    return (
      <React.Fragment>
        <ExtraterrestrialMaintenance />
      </React.Fragment>
      
    );
  }

  return <Routes />;

}

export default App;
