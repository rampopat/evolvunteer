import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Fab, Grid, Icon, Paper, Typography, Button } from '@material-ui/core';
import { withTheme } from '@material-ui/styles'
import styled from 'styled-components';

const FloatingFab = styled(Fab)`
  position: fixed;
  color: ${ ({ palette }) => palette.primary.contrastText };
  bottom: 36px;
  right: 36px;

  transition: transform 0.2s ease-out;

  :hover {
    transform: rotate(7deg);
  }
`;

const SuggestionsLink = ({ theme: { palette } }) => {
  return (
    <Paper elevation={0}>
      <Box marginLeft="auto" justify="right">
        <Link to='/index/search'>
          <FloatingFab variant="extended"
                       color="secondary"
                       palette={palette}
                       size="large">
            <Icon>favorite</Icon> <span style={{paddingLeft: 5}}>Suggestions</span>
          </FloatingFab>
        </Link>
      </Box>
    </Paper>
  );
}

export default withTheme(SuggestionsLink);