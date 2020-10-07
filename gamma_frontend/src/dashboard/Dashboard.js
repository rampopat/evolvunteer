import React, { Component } from 'react'

import ProfilePage from './ProfilePage'
import Header from '../header/Header'
import Colors from '../Colors'
import styled from 'styled-components'

export class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <ProfilePage />
      </DashboardContainer>
    )
  }
}

const DashboardContainer = styled.div`
`;

export default Dashboard
