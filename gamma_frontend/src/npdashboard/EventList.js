import React from 'react';
import { Link } from 'react-router-dom'
import { Avatar, Paper, List, ListItem, ListItemText, Fab } from '@material-ui/core' ;
import AddIcon from '@material-ui/icons/Add'
import styled, { css } from 'styled-components';

const EventList = ({ opportunities, selectedId, handleItemClick, theme }) => (
  <EventListPaper>
    <List disablePadding
          m={0}>
    {
      opportunities.map( (opportunity, id) => (
        <EventListItem key={opportunity.title + id}
                      selected={selectedId === opportunity.id}
                      theme={theme}
                      onClick={() => handleItemClick(opportunity.id)}>
          <ListImgContainer>
            <Avatar src={"https://gamma-group26.herokuapp.com/media/" + opportunity.image} alt="WU" />
          </ListImgContainer>
          <ListItemText 
            primary={opportunity.title} 
            secondary={
              <EventDetails>
                <EventText>{opportunity.description.slice(0, 47)}...</EventText>
                <EventText>{opportunity.date} -- {opportunity.location}</EventText>
              </EventDetails> 
            }
          />
        </EventListItem>
      ))
    }
    </List>
    <Link to='/index/addEvent'>
      <AddEventFab color='secondary'
                  left='auto'
                  bottom={2}
                  right={2}>
        <AddIcon />
      </AddEventFab>
    </Link>
  </EventListPaper>
);

const EventListPaper = styled(Paper)`
  position: relative;
`;

const ListImgContainer = styled.div`
  margin-right: 24px;
`;

const EventListItem = styled(ListItem)`
  border-bottom: 1px solid #ddd;

  transition: all 0.17s ease-out;

  :last-child {
    border-bottom: none;
  }

  :hover {
    transform: scale(1.05);
  }
`;

const EventDetails = styled.div`
`;

const EventText = styled.div`
  line-height: 130%;
  margin-bottom: 5px;

  :last-child {
    margin-bottom: none;
  }
`;

const AddEventFab = styled(Fab)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(25%, 25%);
`;

export default EventList;