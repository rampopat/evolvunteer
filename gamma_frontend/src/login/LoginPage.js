import React, { Component, Fragment } from 'react'
import LoginForm from './LoginForm'
import { Button, Container } from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'
import {Redirect} from 'react-router'

export class LoginPage extends Component {
  constructor(props) {
    localStorage.removeItem('loginData')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('skills')
    localStorage.removeItem('volunteerSignups')
    super(props)
    this.state = {
      username: "hzoli42",
      password: "username",
      redirect: false
    }
  }

  login() {
    const url = 'https://gamma-group26.herokuapp.com/';
    console.log(this.state)

    axios.post(url + 'token-auth/', {
      username: this.state.username,
      password: this.state.password
    }).then(loginData => {
      this.props.userLogin(loginData.data) 
      if (loginData.data.user.charity != null) {
        this.setState({redirect: true, isCharity: true, loggedIn: true})
      } else {
        this.setState({redirect: true, loggedIn: true})
      }
    })
  }

  handleChange(details) {
    this.setState({
      username: details.username,
      password: details.password
    })
  }

  render() {
    if (this.state.redirect) {
      if (this.state.isCharity) {
        return <Redirect push to="/index/npdashboard" />;
      } else {
        return <Redirect push to="/index/dashboard" />;
      }
    }
    return (
      <LoginPageContainer>
        <LoginForm handleChange={(details) => this.handleChange(details)} />
        <Button variant="contained" color="secondary" onClick={() => this.login()}>
          Login
       </Button>
      </LoginPageContainer>
    )
  }
}

const LoginPageContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    max-width: 500px;
`;

export default LoginPage
