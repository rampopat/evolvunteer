import React, { Fragment, useState, useEffect } from 'react'
import Axios from 'axios'

import { Avatar, LinearProgress, Paper, Grid, Collapse, Button, TableRow, TableCell } from '@material-ui/core'
import { API_ROOT, SKILLS } from '../../../config'
import DetailsRow from './DetailsRow'

import userFields from './user-fields'

function generateExtraFields(volunteer = ({}), handleAccept) {
  volunteer.avatar = (
    <Avatar alt={volunteer.name[0]}>
      {volunteer.name[0]}{volunteer.surname[0]}
    </Avatar>
  );

  volunteer.accept_request = (
    <Button variant="contained"
      style={{"min-width": "90px"}}
      color={volunteer.accepted ? "primary" : "default"}
      onClick={(evt) => {
        evt.stopPropagation();
        handleAccept(volunteer);
      }}>
      {!volunteer.accepted ? "Accept" : "Verify"}
    </Button>
  );

  return volunteer;
}
/*
function handleAccept(volunteer = ({})) {
  const loginData = JSON.parse(localStorage.getItem('loginData'))
  const url = 'https://gamma-group26.herokuapp.com/api/';

  axios.post(url + 'signups/', {
    volunteer: volunteer.volunteer,
    opportunity: volunteer.opportunity,
    accepted: true
  },
    { headers: { 'Authorization': 'JWT ' + loginData.token } }).then(response => {
      console.log(volunteer)
      console.log(response)
    })

}
*/

function getSkillSet (skillId) {
  const url = API_ROOT;

  return Axios.get(url + 'api/skills/' + skillId)
    .then(response => {
      return response.data;
    });
}

const VolunteerRow = (props) => {
  const { volunteer, handleAccept } = props;
  const volComponents = generateExtraFields(volunteer, handleAccept);

  const [skills, setSkills] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    !skills && isClicked && getSkillSet(volunteer.skills)
      .then(skillValues => {
        setSkills(skillValues);
        setIsClicked(true);
        setIsFocused(true);
      });
  });

  const toggleFocus = () => {
    setIsFocused(!isFocused);
    setIsClicked(!isClicked);
  };

  return (
    <Fragment>
      <TableRow key={volunteer.id + volunteer.name} hover selected={isClicked} onClick={toggleFocus}>
        {
          userFields.map(({ handle }) => (
            <TableCell>{volComponents[handle]}</TableCell>
          ))
        }
      </TableRow>
      <TableRow>
        <TableCell padding={'none'} colSpan={12}>
          <Collapse hidden={!isFocused} in={isFocused}>
              <DetailsRow volunteer={volunteer} skills={skills} />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default VolunteerRow;