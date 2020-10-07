import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AppBar, Box, Button, Container, Field, Toolbar } from '@material-ui/core'
import { makeStyles, styled as uiStyled } from '@material-ui/styles'
import SwipeableViews from 'react-swipeable-views'

import RegistrationStep from './RegistrationStep'
import SkillsPicker from './SkillsPicker'
import PersonalityTest from './personality/PersonalityTest'
import ProgressBar from './ProgressBar'
import NPDetailsForm from './NPDetailsForm'

const slideNum = 3
const slideProgress = (index) => 100 * (index) / slideNum;

class NPRegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      details: {
        name: "Adam",
        surname: "Mada",
        dob: "6 billion",
        home: "dddd",
      },
      progress: slideProgress(0)
    };
  }

  handleViewChange(newIndex) {
    this.setState({
      index: newIndex,
      progress: slideProgress(newIndex)
    });
  }

  submitRegistration() {
    const url = 'https://gamma-group26.herokuapp.com/api/';
    const mainData = this.state.details;

    var data = new FormData()
    data.append('name', mainData.name)
    data.append('number', mainData.number)
    data.append('mission', mainData.mission)

    // We have nested async code, maybe it's possible to refactor
    axios.post(url + 'charities/', data, {headers: {'content-type': 'multipart/form-data'}})
      .then(charityInfo => {
        console.log(charityInfo)
        axios.post(url + 'users/', {
          username: mainData.username,
          password: mainData.password,
          charity: charityInfo.data.id
        })
      })
  }

  render() {
    return (
      <div>
        <ProgressBar progress={this.state.progress} />
        <Container maxWidth="xl">
          <SwipeableViews enableMouseEvents={true} index={this.state.index} onChangeIndex={(event) => this.handleViewChange(event)}>
            <RegistrationStep>
              <StepHeading>A few steps to connecting with Evolvunteers <span>✔</span></StepHeading>
              <h3>Please fill out the following details</h3>
              <NPDetailsForm handleChange={details => this.setState({ details: details })} />
              <Box pt={3}>
                <ForwardButton variant="contained" color="secondary" onClick={() => {
                  this.submitRegistration()
                  this.handleViewChange(1)
                }
                }>Next</ForwardButton>
              </Box>
            </RegistrationStep>
            <RegistrationStep progress={100}>
              <StepHeading>Congratulations! You are now "officially" a member of Evolvunteer! <span>️🎉</span></StepHeading>
              <Box pt={3}>
                <Link to="/index/login">
                  <ForwardButton variant="contained" color="secondary">View your Dashboard</ForwardButton>
                </Link>
              </Box>
            </RegistrationStep>
          </SwipeableViews>
        </Container>
      </div>
    )
  }
}

const ForwardButton = styled(Button)`
    display: block !important;
    margin-left: auto !important;
`;

const StepHeading = styled.h1`
    margin-top: 30px;
`;

export default NPRegistrationPage;