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
import DetailsForm from './DetailsForm'

const slideNum = 3
const slideProgress = (index) => 100 * (index) / slideNum;

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      details: {
        name: "Adam",
        surname: "Mada",
        dob: "6 billion",
        home: "dddd",
        username: "hzoli42",
        password: "password"
      },
      progress: slideProgress(0),
      experiences: {
        communication: 0,
        technical: 0,
        finance: 0,
        marketing: 0,
        medical: 0,
        teamwork: 0,
        problem_solving: 0,
        creativity: 0,
        craftmanship: 0
      }
    };
  }

  handleViewChange(newIndex) {
    this.setState({
      index: newIndex,
      progress: slideProgress(newIndex)
    });
  }

  submitRegistration() {
    const skills = this.state.skills;
    console.log(skills);
    const url = 'https://gamma-group26.herokuapp.com/api/';

    const learnings = this.state.learnings;
    const experiences = this.state.experiences;
    const mainData = this.state.details;
    // We have nested async code, maybe it's possible to refactor

    var data = new FormData()
    const imageFile = mainData.image[mainData.image.length - 1]
    data.append('image', imageFile, imageFile.name);


    axios.post(url + 'skills/', skills).then(skillsResponse => {
      console.log(skillsResponse);
      mainData.skills = skillsResponse.data.id;
      axios.post(url + 'skills/', learnings).then(learningsResponse => {
        console.log(learningsResponse);
        mainData.learnings = learningsResponse.data.id;
        console.log(mainData)
        axios.post(url + 'skills/', experiences).then(experiencesResponse => {
          mainData.experiences = experiencesResponse.data.id;
          data.append('name', mainData.name)
          data.append('surname', mainData.surname)
          data.append('dob', mainData.dob)
          data.append('home', mainData.home)
          data.append('skills', mainData.skills)
          data.append('learnings', mainData.learnings)
          data.append('experiences', mainData.experiences)
          data.append('bio', mainData.bio)

          axios.post(url + 'volunteers/', data, { headers: { 'content-type': 'multipart/form-data' } }).then(userInfo => {
            axios.post(url + 'users/', {
              username: mainData.username,
              password: mainData.password,
              volunteer: userInfo.data.id
            })
          })
        })
      })
    })
  }

  render() {
    return (
      <div>
        <ProgressBar progress={this.state.progress} />
        <Container maxWidth="lg">
          <SwipeableViews enableMouseEvents={true} index={this.state.index} onChangeIndex={(event) => this.handleViewChange(event)}>
            <RegistrationStep>
              <StepHeading>A few steps to becoming an Evolvunteer <span>✔</span></StepHeading>
              <h3>To match with awesome opportunities, please fill out the following details</h3>
              <DetailsForm handleChange={details => this.setState({ details: details })} />
              <Box pt={3}>
                <ForwardButton variant="contained" color="secondary" onClick={() => this.handleViewChange(1)}>Next</ForwardButton>
              </Box>
            </RegistrationStep>

            <RegistrationStep progress={33}>
              <Container>
                <StepHeading>Tell us your strengths!</StepHeading>
              </Container>
              <SkillsPicker onSkillChange={skills => this.setState({ skills: skills })} />
              <Box pt={3}>
                <BackButton variant="contained" color="secondary" onClick={() => this.handleViewChange(0)}>Back</BackButton>
                <ForwardButton variant="contained" color="secondary" onClick={() => this.handleViewChange(2)}>Next</ForwardButton>
              </Box>
            </RegistrationStep>

            <RegistrationStep progress={50}>
              <StepHeading>Which skills would you like to <b>learn?</b></StepHeading>
              <SkillsPicker onSkillChange={skills => this.setState({ learnings: skills })} />
              <Box pt={3}>
                <BackButton variant="contained" color="secondary" onClick={() => this.handleViewChange(1)}>Back</BackButton>
                <ForwardButton variant="contained"
                  color="secondary"
                  onClick={() => {
                    this.submitRegistration();
                    this.handleViewChange(3)
                  }}>
                  Next
                            </ForwardButton>
              </Box>
            </RegistrationStep>

            <RegistrationStep progress={100}>
              <StepHeading>Congratulations! You are now "officially" a member of Evolvunteer! <span>️🎉</span></StepHeading>
              <Box pt={3}>
                <Link to="/index/login">
                  <ForwardButton variant="contained" color="secondary">View your Profile</ForwardButton>
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
    float: right;
`;

const BackButton = styled(Button)`
  float: left;
`;

const StepHeading = styled.h1`
    margin-top: 30px;
`;

export default RegistrationPage;