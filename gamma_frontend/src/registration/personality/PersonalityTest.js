import React from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const answers = ["I prefer to stay indoors",
               "Adventure is my middle name",
               "I once watched all of Friends at once",
               "Do you have a cigarette?"];

const PersonalityTest = () => {
  return (
    <Container>
        <Grid container justify="center" spacing={6}>
            { answers.map(value => (
                <Grid key={value} item xs={6}>
                    <ChoiceCard>
                        <CardTitle>{value}</CardTitle>
                    </ChoiceCard>
                </Grid>
            )) }
        </Grid>
    </Container>
  );
};

const ChoiceCard = styled(Card)`
    height: 100px;
    transition: all 0.2s ease-in-out !important;
    padding: 25px;

    background-color: #f0f0f0;

    :hover {
        transform: scale(1.05);
    }
`;

const CardTitle = styled.h4`
  color: #666666;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 10px;
`;

export default PersonalityTest;