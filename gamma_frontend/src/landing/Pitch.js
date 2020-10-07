import React from 'react';
import { Box, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Section = styled.section`
    color: white;
    /* margin: 0 3%; */
    position: absolute;
    top: 60%;
    left: 50%;
    width: 1000px;
    transform: translateX(-50%);
    font-size: 1.8vw;

    @media (max-width: 1000px) {
        top: 55%;
        font-size: 1.9vw;
    }
    @media (max-width: 800px) {
        top: 60%;
        font-size: 3.2vw;
        margin: 0 4em;
        text-align: center;
    }
`;

const ForwardButton = styled(Button)`
    /* display: block !important; */
    /* margin-left: auto !important;  */
    display: block;
    font-size: 18px;
    letter-spacing: 1.4px;
    font-weight: 600;
    margin: 0 20px;
    padding: 12px 2em;
    color: white;
    cursor: pointer;
    text-decoration: none;
    vertical-align: middle;
    border-radius: 2px;
    user-select: none;
    text-align: center;
    border: 0;

    &:hover {
      background-color: #585CD2;
    }
`;

const Title = styled.h1`
    font-size: 3em;
    margin: 0 0 0.2em;
    font-weight: 700;
`;

const Subtitle = styled.p`
    margin: 5em 0 0.5em;
    font-weight: 300;
`;

const pitch = () => {
    return (
      <Section>
        {/* <Title>See what's next.</Title> */}
        {/* <Subtitle>GET STARTED AS</Subtitle> */}
        <Grid container justify="flex-end">
          <Grid item md={4}>
            <ForwardButton href='/index/nonProfit'
                           variant="contained"
                           color="primary" >
              I'm an Organisation
            </ForwardButton>
          </Grid>
          <Grid item md={4}>
            <ForwardButton href='/index/volunteerRegistration'
                           variant="contained"
                           color="primary" >
              I'm a Volunteer
            </ForwardButton>
          </Grid>
          <Grid item md={4}>
            <ForwardButton href='/index/search'
                           variant="contained"
                           color="primary" >
              Find Opportunities
            </ForwardButton>
          </Grid>
        </Grid>
      </Section>
    )
}

export default pitch;
