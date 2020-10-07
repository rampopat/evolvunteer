import React, { Component } from 'react'
import { Paper, ButtonBase, Typography, Grid, Container, Divider, List, ListItemText, ListItem, ListItemAvatar, Avatar } from '@material-ui/core'
import styled from 'styled-components'
import Userinfo from './Userinfo'
import ExperienceTile from './ExperienceTile'
import axios from 'axios';
import EventTile from './EventTile';
import SuggestionsLink from './SuggestionsLink'
import { SKILLS } from '../config'

export class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileFetched: false
    };
    this.getProfile();
  }

  componentWillMount() {
    this.getProfile();
  }

  getProfile() {
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    const url = 'https://gamma-group26.herokuapp.com/api/';
    const authHeader = { headers: { 'Authorization': 'JWT ' + loginData.token } }

    console.log(loginData)

    axios.get(url + 'current_user/', authHeader).then(currentUser => {
      console.log(currentUser)
      axios.get(url + 'volunteers/' + currentUser.data.volunteer + '/', authHeader).then(currentInfo => {
        console.log(currentInfo)
        localStorage.setItem('userInfo', JSON.stringify(currentInfo.data))
        axios.get(url + 'skills/' + currentInfo.data.experiences, authHeader).then(currentSkills => {
          console.log(currentSkills)
          localStorage.setItem('skills', JSON.stringify(currentSkills.data))
          axios.post(url + 'volunteer_signups/', { id: loginData.user.volunteer }, authHeader).then(opportunities => {
            console.log(opportunities)
            localStorage.setItem('volunteerSignups', JSON.stringify(opportunities))
            this.setState({ profileFetched: true });
          })
        })
      })
    })
  }



  render() {


    if (this.state.profileFetched) {
      const skills = JSON.parse(localStorage.getItem('skills'));
      const skillValues = JSON.parse(localStorage.getItem('skills'));
      const events = JSON.parse(localStorage.getItem('volunteerSignups'))
      console.log(events)

      const experienceTiles = [
        <Grid key="communication" item md={6}>
          <ExperienceTile skill="Communication" level={skills.communication} />
        </Grid>,
        <Grid key="craftmanship" item md={6}>
          <ExperienceTile skill="Craftmanship" level={skills.craftmanship} />
        </Grid>,
        <Grid key="creativity" item md={6}>
          <ExperienceTile skill="Creativity" level={skills.creativity} />
        </Grid>,
        <Grid key="finance" item md={6}>
          <ExperienceTile skill="Finance" level={skills.finance} />
        </Grid>,
        <Grid key="marketing" item md={6}>
          <ExperienceTile skill="Marketing" level={skills.marketing} />
        </Grid>,
        <Grid key="medical" item md={6}>
          <ExperienceTile skill="Medical" level={skills.medical} />
        </Grid>,
        <Grid key="problem_solving" item md={6}>
          <ExperienceTile skill="Problem solving" level={skills.problem_solving} />
        </Grid>,
        <Grid key="teamwork" item md={6}>
          <ExperienceTile skill="Teamwork" level={skills.teamwork} />
        </Grid>,
        <Grid key="technical" item md={6}>
          <ExperienceTile skill="Technical" level={skills.technical} />
        </Grid>
      ]

      return (
        <ProfilePageContainer>
          <Grid container spacing={3} md={12} alignContent="center" >
            <Grid item md={3}>
              <Userinfo profile={JSON.parse(localStorage.getItem('userInfo'))} />
            </Grid>
            <Grid item container alignContent='flex-start' spacing={2} md={9}>
              <Grid item md={12}>
                <SuggestionsLink />
              </Grid>
              <Grid item spacing={2} md={12}> My Skills </Grid>
              <Divider />

              { SKILLS.map( skill => (
                  <Grid key={skill.handle} item md={4}>
                    <ExperienceTile skill={skill.name} level={skillValues[skill.handle]} />
                  </Grid>
              )) }

              <Grid item md={12}> My Events
                          <List >
                  {
                    events.data.map(event => (
                      console.log(event),
                      <EventTile eventName={JSON.parse(event.opp).fields.title}
                        taskName={JSON.parse(event.opp).fields.description}
                        timestamp={JSON.parse(event.opp).fields.date}
                        location={JSON.parse(event.opp).fields.address}
                        image={"https://gamma-group26.herokuapp.com/media/" + JSON.parse(event.opp).fields.image}
                        accepted={event.accepted} />
                    )
                    )
                  }
                </List>
              </Grid>
            </Grid>
          </Grid>
        </ProfilePageContainer>
      );
    } else {
      return null
    }
  }
}

const ProfilePageContainer = styled(Container)`
   margin-top: 20px;
`;

export default ProfilePage
