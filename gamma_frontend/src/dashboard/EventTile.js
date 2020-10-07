import React, { Component } from 'react'
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography, Box, Card, Button } from '@material-ui/core'
import styled from 'styled-components'

const EventTile = ({ eventName, taskName, timestamp, location, image, accepted }) => {
    return (
        <EventTileContainer accepted={accepted}>
        <ListItem key={eventName}  md={6} alignItems='center'>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={image} />
        </ListItemAvatar>
        <ListItemText
          primary={eventName + ' - ' + taskName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {location + ' - ' + timestamp}
              </Typography>              
            </React.Fragment>
          }          
        />
        </ListItem>
        <Divider />
        </EventTileContainer>
        // <ExperienceCard>
        //     <Wrapper>
        //         <Title>
        //             {eventName || "Cooking"}
        //         </Title>

        //         <Description>
        //             {taskName || "Insert description"}
        //         </Description>

        //         <Description>
        //             {timestamp || "Morning"}
        //         </Description>

        //         <Description>
        //             {location || "10 Downing Street"}
        //         </Description>
        //     </Wrapper>
        // </ExperienceCard>
    );
}

const ExperienceCard = styled(Card)`
    max-height: 100px;
    max-width: 1000px;

    transition: all 0.2s ease-in-out !important;

    :hover {

        transform: scale(1.05);
    }
`;

const EventTileContainer = styled.div`
  background-color: ${({accepted}) => accepted ? "#e4ffc0" : "white"};
`;

const Wrapper = styled(Box)`
    padding: 5px;
`;

const Title = styled.h3`
    text-align: center;
    margin-top: 2px;
    margin-bottom: 2px;
`;

const Description = styled.p`
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: center;
    color: #aaa;
`;

const BrowseButton = styled(Button)`
   display: block;
   margin-left: auto;
   margin-top: 6px;
   margin-bottom: 10px;
   margin-right: 6px;
`;

export default EventTile