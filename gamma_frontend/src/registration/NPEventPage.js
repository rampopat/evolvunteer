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
import NPEventForm from './NPEventForm'
import { Redirect } from 'react-router'

const slideNum = 3
const slideProgress = (index) => 100 * (index) / slideNum;

class NPEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      redirect: false,
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

  submitLearningSkills() {

  }

  submitRegistration() {
    const skills = this.state.skills;
    console.log(skills);
    const url = 'https://gamma-group26.herokuapp.com/api/';
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    const header = { headers: { 'Authorization': 'JWT ' + loginData.token, 'content-type': 'multipart/form-data' } }

    const learnings = this.state.learnings;
    const mainData = this.state.details;

    var data = new FormData()
    const imageFile = mainData.image[mainData.image.length - 1]
    data.append('image', imageFile, imageFile.name);
    data.append('title', mainData.title)
    data.append('description', mainData.description)
    data.append('address', mainData.address)
    data.append('date', mainData.date)
    data.append('testimonial', mainData.testimonial)


    // We have nested async code, maybe it's possible to refactor
    axios.post(url + 'skills/', skills)
      .then(skillsResponse => {
        console.log(skillsResponse);
        mainData.skills = skillsResponse.data.id;
        mainData.charity = loginData.user.charity;
        console.log(mainData)
        data.append('skills', mainData.skills)
        data.append('charity', mainData.charity)
        return axios.post(url + 'opportunities/', data, header);
      })
      .then(res => {
        console.log(res)
        this.setState({ redirect: true })
      })
      .catch(err => { console.log(err); console.log(err.response) });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/index/npdashboard" />;
    }
    return (
      <div>
        <ProgressBar progress={this.state.progress} />
        <Container maxWidth="xl">
          <SwipeableViews enableMouseEvents={true} index={this.state.index} onChangeIndex={(event) => this.handleViewChange(event)}>
            <RegistrationStep>
              <StepHeading>Add Event/Task</StepHeading>
              <NPEventForm handleChange={details => this.setState({ details: details })} />
              <Box pt={3}>
                <ForwardButton variant="contained" color="secondary" onClick={() => this.handleViewChange(1)}>Next</ForwardButton>
              </Box>
            </RegistrationStep>
            <RegistrationStep progress={100}>
              <StepHeading>Add Event/Task</StepHeading>
              <h3>What composition of skills is required for this task?</h3>
              <SkillsPicker onSkillChange={skills => this.setState({ skills: skills })} />
              <Box pt={3}>
                <BackButton variant="contained" color="secondary" onClick={() => this.handleViewChange(0)}>Back</BackButton>
                <ForwardButton variant="contained" color="secondary" onClick={() => this.submitRegistration()}>Submit</ForwardButton>
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

const BackButton = styled(Button)`
  float: left;
`;

const StepHeading = styled.h1`
    margin-top: 30px;
`;

export default NPEventPage;