import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Grid, Box } from '@material-ui/core'
import Axios from 'axios';

import { API_ROOT } from '../config'
import EventList from './EventList';
import EventPane from './event-pane/EventPane'

const opportunities = [
  {
    title: "Opportunity at UNICEF",
    description: "We'll ship you out to any place requiring humanitarian aid, at short notice",
    pk: 0
  },
];

function getOpportunities() {
  const opportunityUrl = API_ROOT + `api/charity_signups/`;
  const loginData = JSON.parse(localStorage.getItem('loginData'))
  const authHeader = { headers: { 'Authorization': 'JWT ' + loginData.token } }

  const promise = Axios.post(opportunityUrl, { id: loginData.user.charity }, authHeader)
    .then(signupsResponse => {
      const signups = signupsResponse.data;
      console.log(signups)

      const opportunities = []
      signups.forEach(signup => {
        opportunities.push(JSON.parse(signup.opportunity).fields)
      })
      opportunities.map((opp, index) => opp.id = index);

      const volunteers = []
      signups.forEach(signup => {
        const volunteerList = []
        const opportunityId = JSON.parse(signup.opportunity).pk
        signup.volunteers.forEach(volunteer => {
          var volunteerObject = JSON.parse(volunteer)
          volunteerObject.opportunity = opportunityId
          volunteerList.push(volunteerObject)

        })
        volunteers.push(volunteerList)
      })
      console.log(volunteers)

      return [opportunities, volunteers];
    })

  return promise;
}

export class NPDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: 0,
      opportunities: opportunities,
      dataFetched: false
    }
  }

  componentDidMount() {
    const promise = getOpportunities();
    promise.then(opportunities => {
      this.setState({ opportunities: opportunities[0], volunteers: opportunities[1], dataFetched: true });
      console.log(this.state.opportunities)
      console.log(this.state.volunteers)
    });
  }

  handleListItemClick(pk) {
    this.setState({
      selectedId: pk
    });
  }

  reloadData() {
    const promise = getOpportunities();
    promise.then(opportunities => {
      this.setState({ opportunities: opportunities[0], volunteers: opportunities[1], dataFetched: true });
      console.log(this.state.opportunities)
      console.log(this.state.volunteers)
    });
  }

  render() {
    if (this.state.dataFetched) {
      return (
        <Box marginTop={2}>
          <DashboardContainer maxWidth="lg">
            <Grid container spacing={1}>
              <Grid item md={4}>
                <EventList selectedId={this.state.selectedId}
                  handleItemClick={(id) => this.handleListItemClick(id)}
                  opportunities={this.state.opportunities} />
              </Grid>
              <Grid item md={8}>
                <EventPane selectedId={this.state.selectedId} volunteers={this.state.volunteers} reloadData={() => this.reloadData()}/>
              </Grid>
            </Grid>
          </DashboardContainer>
        </Box>
      )
    } else {
      return null
    }
  }
}

const DashboardContainer = styled(Container)`
  padding: 0;
`;

export default NPDashboard
