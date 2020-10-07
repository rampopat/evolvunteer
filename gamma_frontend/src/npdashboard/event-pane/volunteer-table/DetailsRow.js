import React, { Fragment, useState, useEffect } from 'react'
import Axios from 'axios'

import { LinearProgress, Paper, Box, Grid, Collapse, Button, TableRow, TableCell } from '@material-ui/core';
import styled from 'styled-components';
import { SKILLS } from '../../../config';

const ProgressBar = styled(LinearProgress)`
  margin-top: 17px;
  height: 13px;
  padding-right: 20px;
`;

const DetailsRow = ({ volunteer, skills }) => (
  <Fragment>
    <Box padding={3}>
      <Grid container
            spacing={3}>

        <Grid container item md={6}>
          { SKILLS.map( ({ handle, name }) => (
            <Fragment>
              <Grid item md={6}>
                <p key={handle}>
                  {name}:
                </p>
              </Grid>
              <Grid item md={6}>
                  { skills && (<ProgressBar color="primary" variant="determinate" value={skills[handle] * 100 / 10} />) }
              </Grid>
            </Fragment>
          )) }
        </Grid>

        <Grid item md={6}>
          <Paper elevation={0}>
            <p>
              {volunteer.bio}
            </p>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  </Fragment>
);

export default DetailsRow;