import React from 'react'
import { Button, Popover, Checkbox, IconButton, FormControlLabel, FormGroup, FormControl, FormLabel} from '@material-ui/core'
import { usePopupState, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import { object } from 'prop-types';
import FilterListIcon from '@material-ui/icons/FilterList';

const skillNames = {
  "communication":"Communication",
  "technical":"Technical",
  "finance":"Finance",
  "marketing":"Marketing",
  "medical":"Medical",
  "teamwork":"Teamwork & Leadership",
  "problem_solving":"Problem Solving",
  "creativity":"Creativity",
  "craftmanship":"Craftsmanship"
};

const SearchBarAdvanced = ({ handleCheckChange, skills, handleCalendarChange }) => {
  const popupState = usePopupState({
    variant: 'popover'
  })

  
  return (
    <span>
      <IconButton {...bindTrigger(popupState)}>
        <FilterListIcon />
      </IconButton>
      <Popover
        keepMounted
        style={{ display: "flex" }}
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

        <Skills 
          style={{ flex: "1" }}
          handleCheckChange={handleCheckChange}
        />
        <Calendar 
          style={{ flex: "1" }}
          returnValue="range"
          selectRange="true"
          activeStartDate={new Date()}
          onChange={(value) => handleCalendarChange(value)}
        />
      </Popover>
    </span>
  )
}

const Skills = ({ handleCheckChange }) => {
  return (
    <SkillsContainer>
      <FormControl>
      <FormLabel>Desired Skills:</FormLabel>
      <FormGroup>
        { Object.keys(skillNames).map((handle) => (
            <FormControlLabel control={<Checkbox defaultChecked
                                                 value={handle} />}
                              key={handle}
                              onChange={event => handleCheckChange(handle, event.target.checked)}
                              label={skillNames[handle]} />
        )) }
      </FormGroup>
      </FormControl>
    </SkillsContainer>
  )
}

const SkillsContainer = styled.div`
  padding: 10px;
`;

export default SearchBarAdvanced
