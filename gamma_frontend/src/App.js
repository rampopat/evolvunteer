import React from 'react';
import styled from 'styled-components';
import RegistrationPage from './registration/RegistrationPage';
import Header from './header/Header';
import NPRegistrationPage from './registration/NPRegistrationPage';
import Search from './search/Search';
import Colors from './Colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme } from '@material-ui/core/styles'
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { orange, teal } from '@material-ui/core/colors'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import NPDashboard from './npdashboard/NPDashboard';
import LoginPage from './login/LoginPage';
import { create } from 'jss';
import NPEventPage from './registration/NPEventPage';
import LandingPage from './landing/LandingPage'


const volunteerTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange
  }
});

const nonProfitTheme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: teal
  }
});

class App extends React.Component {
  state = {
    results: [],
  }


  updateResults(results) {
    this.setState({
      results: results
    });

    console.log(results);
    return
  }

  userLogin(data) {
    localStorage.setItem('loginData', JSON.stringify(data))
  }

  render() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const user = loginData && loginData.user;
    const isNonProfit = user && user.charity;

    return (
      <Router forceRefresh>
        <StylesProvider injectFirst>
          <ThemeProvider theme={isNonProfit ? nonProfitTheme : volunteerTheme}>
            <Header loginData={JSON.parse(localStorage.getItem('loginData'))} />

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Amita" />
            <Route path="/index" exact component={LandingPage} />
            <Route path="/index/nonProfit" exact component={NPRegistrationPage} />
            <Route path="/index/volunteerRegistration" component={RegistrationPage} />
            <Route path="/index/dashboard" component={Dashboard}  />
            <Route path="/index/npdashboard" component={NPDashboard} />
            <Route path="/index/search" component={Search} />
            <Route path="/index/login" component={() => <LoginPage userLogin={(data) => this.userLogin(data)} />} />
            <Route path="/index/addEvent" component={NPEventPage} />
          </ThemeProvider>
        </StylesProvider>
      </Router>
    );
    // <Listings results={this.state.results} />
  }
}

const PageWrapper = styled.div`
    background-color: ${Colors.white};
`;

export default App;
