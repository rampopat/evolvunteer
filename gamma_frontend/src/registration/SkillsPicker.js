import React from 'react';
import styled, { css } from 'styled-components';

import { Container, Box, Grid, Card, Paper, Button } from '@material-ui/core'
import { withTheme } from '@material-ui/styles'
import Icon from '@material-ui/core/Icon';
import { skills } from './Skills'
import SkillCard from './SkillCard'

/* Several help functions */
const objectInsertArrayItem = (obj, item) => {
  obj[item.handle] = initialSkillValue;
  return obj;
}

const sumArray = array => array.reduce((acc, x) => acc + x, 0); 

const initialSkillValue = 0;
const skillPoints = 20;

function sumSkills (skills) {
  return sumArray(Object.keys(skills).map(handle => skills[handle]));
}

class SkillsPicker extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isSkillZero: true,
      isSkillCap: false,
      skills: skills.reduce(objectInsertArrayItem, {})
    };
  }

  changeSkill (handle, quantity) {
    const skillsUpdate = Object.assign({}, this.state.skills);
    skillsUpdate[handle] = this.state.skills[handle] + quantity;

    this.setState({ 
      isSkillCap: sumSkills(skillsUpdate) >= 20,
      isSkillZero: sumSkills(skillsUpdate) == 0,
      skills: skillsUpdate
    });

    this.props.onSkillChange(this.state.skills);
    console.log(this.state)
  }

  handlePlusClick (skillName) {
    if (this.state.isSkillCap) {
      return;
    } else {
      this.changeSkill(skillName, 1);
    }
  }

  handleMinusClick (handle) {
    if (this.state.skills[handle] == 0) {
      return;
    } else if (this.state.isSkillZero) {
      return;
    } else {
      this.changeSkill(handle, -1);
    }
  }

  render () {
    return (
      <Container>
        <PointsNumber pointsLeft={skillPoints - sumSkills(this.state.skills)} />              
        <Grid container justify="center" spacing={6}>
          { skills.map( skill => 
              (
                <Grid key={skill.name} item xs={6} md={4}>
                  <SkillCard {...skill}
                            handlePlusClick={handle => this.handlePlusClick(handle)}
                            handleMinusClick={handle => this.handleMinusClick(handle)}
                            skillPoints={this.state.skills[skill.handle]}
                            theme={this.props.theme}/>
                </Grid>
              )
          ) }
        </Grid>
      </Container>
    );
  }
};

class PointsNumber extends React.Component {
  render() {
    return(
      <PointsHeader> Points left: <Points>{ this.props.pointsLeft } / 20</Points></PointsHeader>
    );
  }
}

const PointsHeader = styled.h2`
  color: #888;
`;

const Points = styled.span`
  color: #444;
  font-weight: 600;
`;

const ForwardButton = styled(Button)`
    display: block !important;
    margin-left: auto !important;
`;

export default withTheme(SkillsPicker);
