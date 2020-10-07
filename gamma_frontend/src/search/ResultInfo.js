import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { Divider, Fab, Grid, Box, Paper, Icon, Container } from '@material-ui/core'
import axios from 'axios';
import EventMap from './result-info/EventMap'

const defaultResult = {
  date: "No date specified",
  address: undefined, // otherwise the map searches for "no address specified"
  title: "No results found",
  description: "Please use a different search query",
  opportunity: 1,
  testimonial: ""
}

function apply(opportunity) {
  const loginData = JSON.parse(localStorage.getItem('loginData'))
  const url = 'https://gamma-group26.herokuapp.com/api/';
  console.log(opportunity)

  axios.post(url + 'signups/', {
    volunteer: loginData.user.volunteer,
    opportunity: opportunity,
    accepted: false,
  },
    { headers: { 'Authorization': 'JWT ' + loginData.token } })
    .then(response => {
      console.log("success applying!");
      console.log(response);
    }
    );
}


const ResultInfo = (props) => {
  console.log(props)
  const displayedResult = props.result || defaultResult

  const resultInfo = [
    {
      title: displayedResult.title,
      description: displayedResult.description,
      opportunity: displayedResult.opportunity,
      testimonial: displayedResult.testimonial
    },
    {
      value: displayedResult.date,
      icon: faCalendarDay
    },
    {
      value: displayedResult.address,
      icon: faMapMarker
    }
  ];

  const suggestionInfo = [
    {
      title: props.suggestion.title,
      description: props.suggestion.description,
      opportunity: props.suggestion.opportunity,
      testimonial: props.suggestion.testimonial
    },
    {
      value: props.suggestion.date,
      icon: faCalendarDay
    },
    {
      value: props.suggestion.address,
      icon: faMapMarker
    }
  ];

  const infoFields = props.showResults ? resultInfo : suggestionInfo;

  return (
    <ResultContainer>

      <InfoPaper>
        <EventMap address={displayedResult.address} />

        <Box padding={4}>

          <Title style={{ marginTop: 0 }}>
            {infoFields[0].title || "No title supplied "}
          </Title>

          <DetailsList>
            {infoFields.map(({ value, icon }, id) =>
              value &&
              <DetailsListItem key={id}>
                <FontAwesomeIcon icon={icon} />
                <span> {value}</span>
              </DetailsListItem>
            )}
          </DetailsList>

          <Divider />

          <Description>
            {infoFields[0].description || "Sample description"}
          </Description>

          <TestimonialContainer>
            <Testimonial>
              {'"' + infoFields[0].testimonial + '"'}
            </Testimonial>
          </TestimonialContainer>

        </Box>

        <SubmitFAB variant="extended"
          color="secondary"
          onClick={() => apply(infoFields[0].opportunity)}>
          <SubmitIcon>send</SubmitIcon>
          Apply
        </SubmitFAB>
      </InfoPaper>
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  color: #333;
  margin-top: 0;
`;

const InfoPaper = styled(Paper)`
  position: relative;
  max-height: calc(100vh - 100px);
`;

const DetailsList = styled.ul`
  color: #777;
`;

const DetailsListItem = styled.li`
  margin-bottom: 11px;

  :last-child {
    margin-bottom: 0;
  }
`;

const Description = styled.p`
  line-height: 130%;
  text-align: justify;
`;

const SubmitFAB = styled(Fab)`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(30%, 50%);
`;

const SubmitIcon = styled(Icon)`
  margin-right: 8px;
`;

const Testimonial = styled.p`
  margin-top: 30px;
  line-height: 130%;
  font-family: Amita, cursive;
  font-weight: bold;
  font-size: 30px;
`;

const TestimonialContainer = styled(Container)`
`;

export default ResultInfo;