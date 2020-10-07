import React, { useState } from 'react';
import styled from 'styled-components';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles'
import VolunteerTable from './volunteer-table/VolunteerTable';
import axios from 'axios'
import { API_ROOT, SKILLS } from '../../config'

const EventPane = ({ selectedId, theme, volunteers, reloadData }) => {
  const [tabIndex, setTabIndex] = useState(0);
  console.log(volunteers)

  function handleTabChange(event, newIndex) {
    setTabIndex(newIndex);
  }

  function handleAccept(volunteer = ({})) {
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    const url = 'https://gamma-group26.herokuapp.com/api/';
    const authHeader = { headers: { 'Authorization': 'JWT ' + loginData.token } }

    axios.delete(url + 'signups/' + volunteer.signup + '/', authHeader)
      .then(response => {
        console.log(volunteer)
        console.log(response)
        if (!volunteer.accepted) {
          axios.post(url + 'signups/', { volunteer: volunteer.volunteer, opportunity: volunteer.opportunity, accepted: true }, authHeader)
            .then(response => {
              reloadData()
            })
        } else {
          axios.post(url + 'verify/', { volunteer: volunteer.volunteer, opportunity: volunteer.opportunity }, authHeader)
            .then(response => {
              reloadData()
            })
        }
      })
  }

  return (
    <Paper>
      <PaneTabs value={tabIndex}
        theme={theme}
        onChange={handleTabChange}>
        <Tab label="Applicants" />
        <Tab label="Attendees" />
      </PaneTabs>
      {tabIndex === 0 && <VolunteerTable selectedId={selectedId} volunteers={volunteers} accepted={false} handleAccept={(volunteer) => handleAccept(volunteer)} />}
      {tabIndex === 1 && <VolunteerTable selectedId={selectedId} volunteers={volunteers} accepted={true} handleAccept={(volunteer) => handleAccept(volunteer)} />}
    </Paper>
  );
};

const PaneTabs = styled(Tabs)`
  ${ ({ theme }) => `
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.contrastText};
  `};
`;

export default withTheme(EventPane);