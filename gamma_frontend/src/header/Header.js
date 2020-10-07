import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

import SearchBar from '../search/SearchBar'

import { HomeLink, NavButton } from './HeaderSections'

const navButtons = {
  search: <NavButton to='/index/search' label='Search' />,
  dashboard: <NavButton to='/index/dashboard' label='Dashboard' />,
  npdashboard: <NavButton to='/index/npdashboard' label='Dashboard' />,
  login: <NavButton to='/index/login' label='Login' />,
  addEvent: <NavButton to='/index/addEvent' label='Add Event' />,
  logout: <NavButton to='/index/login' label='Logout' />,
  register: <NavButton to='/index/volunteerRegistration' label='Register' />
}

export class Header extends Component {
  render() {
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    const { volunteer, charity } = this.props.loginData ? this.props.loginData.user : { volunteer: null, charity: null };

    return (
      <HeaderBar>
        <Toolbar>
          <HomeLink />
          {!this.props.loginData && navButtons.login}
          {!this.props.loginData && navButtons.register}
          {volunteer && navButtons.search}
          {volunteer && navButtons.dashboard}
          {charity && navButtons.npdashboard}
          {charity && navButtons.addEvent}
          {this.props.loginData && navButtons.logout}
          <LoginInfo>
          </LoginInfo>
        </Toolbar>

      </HeaderBar>
    );
  }
}

const HeaderBar = styled(AppBar)`
  /* background-color: #faafaa; */
    position: sticky;
  `;

const LoginInfo = styled(Box)`
  text-align: right
  align: right
`;

export default Header
