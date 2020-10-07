import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Box, Grid, Icon } from '@material-ui/core';

const SkillCard = ({ name, description, handle, skillPoints, theme, iconName, handlePlusClick, handleMinusClick }) => (
  <AdaptiveCard skillPoints={skillPoints}
                theme={theme}
                justify="center">
      <Grid container>
        <Grid item xs={10}>
          <Box padding={2}>
            <SkillPointDisplay>
              {
                skillPoints ?
                  <SkillNumber>{skillPoints}</SkillNumber> :
                  <SkillIcon icon={iconName}/>
              }
            </SkillPointDisplay>
            <SkillName>{name}</SkillName>
            <SkillDescription>{description}</SkillDescription>
          </Box>
        </Grid>
        <Grid item container direction="column" xs={2}>
          <Grid item xs={6}>
            <Incrementor variant="contained"
                         skillPoints={skillPoints}
                         onClick={() => handlePlusClick(handle)}>
              <Icon>add</Icon>
            </Incrementor>
          </Grid>
          <Grid item xs={6}>
            <Incrementor variant="contained"
                         skillPoints={skillPoints}
                         isNegative
                         onClick={() => handleMinusClick(handle)}>
              <Icon >remove</Icon>
            </Incrementor>
          </Grid>
        </Grid>
      </Grid>
  </AdaptiveCard>
);

const SkillInfo = css`
  color: #777;
  display: inline;
  margin: 0 auto;
  font-size: 2.5rem;
  line-height: 100%;
`;

const SkillPointDisplay = styled.div`
  & * {
    color: #777;
  }
  margin-bottom: 0;
`;

const SkillNumber = styled.h4`
  ${SkillInfo}
`;

const SkillIcon = styled(FontAwesomeIcon)`
  &&& {
    display: inline;
    text-align: left;
  }

  ${SkillInfo}
`;


const SkillName = styled.h4`
  color: #666666;
  font-size: 1.3rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const SkillDescription = styled.h5`
  color: #888888;
  margin-top: 0.2rem;
  margin-bottom: 0;
`;

const whiteBg = css`
  background-color: #fff;
  color: #aaa;

  :first-child {
    border-bottom: 1px solid #ddd;
  }
`;

const Incrementor = styled(Button)`
  background-color: #aaa;
  color: #fff;
  margin: 0;
  height: 100%;

  border-radius: 0;
  & * {
    border-radius: 0;
  }
  box-shadow: none;

  :first-child {
    border-bottom: 1px solid #bbb;
  }

  ${ ({ skillPoints }) => skillPoints > 0 && whiteBg }
`;

// Very messy linear gradient
// const steps = [0, 0.1, 0.2, 0.3, 0.4, 0.55, 0.65, 0.7, 0.8, 0.85, 0.93, 0.95, 0.96, 1];
const steps = [0, 0.6, 0.64, 0.6799999999999999, 0.72, 0.76, 0.8, 0.84, 0.88, 0.9199999999999999, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96];
const bg = [255, 255, 255];
const limit = [160, 200, 105];
const cardColor = (proportion) => `rgba(${bg[0] + (limit[0] - bg[0]) * proportion}, ${bg[1] + (limit[1] - bg[1]) * proportion}, ${bg[2] + (limit[2] - bg[2]) * proportion});`;

const AdaptiveCard = styled(Card)`
  transition: all 0.2s ease-in-out !important;

  background-color: ${ ({ skillPoints, theme }) => (skillPoints > 0 && theme.palette.secondary.light) };
  /* background-color: ${({ skillPoints }) => cardColor(steps[skillPoints])}; */

  :hover {
    transform: scale(1.05);
  }
`;

export default SkillCard