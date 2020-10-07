import React from 'react';

import { Avatar, Button } from '@material-ui/core'

const sampleVolunteerData = [
  {
    id: 10,
    name: "Jan",
    surname: "Dol",
    dob: "06/08/1997",
    home: "Letna 8, Kosice",
    skills: 1,
    learnings: 1
  },
  {
    "id": 10,
    "name": "John",
    "surname": "Doe",
    "dob": "06/08/1997",
    "home": "Letna 8, Kosice",
    "accepted": true,
    "skills": 1,
    "learnings": 1
  },
  {
    "id": 11,
    "name": "Johnny",
    "surname": "Axy",
    "dob": "1994-05-24",
    "home": "182 Clapham High St, Clapham, London SW4 7UGG",
    "skills": 54,
    "learnings": 55
  },
  {
    "id": 12,
    "name": "Adam",
    "surname": "Mada",
    "dob": "6 billion",
    "home": "dddd",
    "skills": 56,
    "learnings": 57
  },
  {
    "id": 13,
    "name": "Adam",
    "surname": "Mada",
    "dob": "6 billion",
    "home": "dddd",
    "skills": 58,
    "learnings": 59
  }
];

export const sampleVolunteers = sampleVolunteerData.map( volunteer => {

  volunteer.avatar = (
    <Avatar alt={volunteer.name[0]}>
      {volunteer.name[0]}{volunteer.surname[0]}
    </Avatar>
  );

  volunteer.accept_request = (
    <Button variant="contained"
            color={volunteer.accepted ? "primary" : "default"}
            onClick={() => console.log(volunteer.name + "accepted!")}>
      Accept{volunteer.accepted && "ed"}
    </Button>
  )
  return volunteer;
});

export default [
  {
    handle: "avatar",
    title: "",
  },
  {
    handle: "name",
    title: "Name",
  },
  {
    handle: "surname",
    title: "Surname",
  },
  {
    handle: "dob",
    title: "Date Of Birth"
  },
  {
    handle: "accept_request",
    title: ""
  }
];