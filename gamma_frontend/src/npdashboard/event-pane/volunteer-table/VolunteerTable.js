import React from 'react';

import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import userFields, { sampleVolunteers } from './user-fields';
import VolunteerRow from './VolunteerRow'

class VolunteerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volunteers: null
    };
    console.log(process.env);
  }

  render() {
    console.log(this.props.volunteers)
    console.log(this.props.selectedId)
    if (this.props.volunteers.length != 0) {
      var volunteerList = this.props.volunteers[this.props.selectedId]

      console.log(volunteerList)
      volunteerList = volunteerList.map(volunteer => Object.assign(JSON.parse(volunteer.volunteer).fields,
        {
          accepted: volunteer.accepted, score: volunteer.score, volunteer: JSON.parse(volunteer.volunteer).pk,
          opportunity: volunteer.opportunity, signup: volunteer.signup_id
        }))
      volunteerList = volunteerList.filter(volunteer => volunteer.accepted === this.props.accepted)

      console.log(volunteerList)
    } else {
      volunteerList = []
    }

    return (
      <Paper height="100%" elevation={1}>
        <Table>
          <TableHead>
            {
              userFields.map(({ handle, title }) => (
                <TableCell key={handle}>{title}</TableCell>
              ))
            }
          </TableHead>

          <TableBody>
            {
              volunteerList.map((volunteer, id) => (
                <VolunteerRow key={volunteer.name + id}
                  volunteer={volunteer}
                  handleAccept={(volunteer) => this.props.handleAccept(volunteer)} />
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default VolunteerTable;