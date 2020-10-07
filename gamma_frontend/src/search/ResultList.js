import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled, { css } from 'styled-components';
import { withTheme } from '@material-ui/styles'
import { Box, Avatar, Tabs, Tab, List, ListItem, ListItemText, Paper, CircularProgress } from '@material-ui/core';

import ResultPopup from './ResultPopup'
import SearchResults from './results/SearchResults'

const ResultList = (props) => {
  const { theme, activeId, results, suggestions, resultsLoading, handleListItemClick, switchTab } = props;
  const [tabIndex, setTabIndex] = useState(0);
  console.log(results)
  console.log(suggestions)

  useEffect( () => {
      props.results.length !== 0 && setTabIndex(1);
    },
    [props.results]
  );

  function handleTabChange (event, newIndex) {
    setTabIndex(newIndex);
    newIndex === 0 ? switchTab('results') : switchTab('suggestions')
  };

  const tabContent = [
    <SearchResults opportunities={suggestions}
                   isSuggestions={true}
                   activeId={activeId}
                   handleListItemClick={handleListItemClick}
                   />,

    <SearchResults opportunities={results}
                   activeId={activeId}
                   handleListItemClick={handleListItemClick}
                   />
  ];

  return (
    <BoxWrapper maxHeight="100vh">
      <ContainingPaper>
        { resultsLoading && (
          <ProgressWrapper>
            <CircularProgress size={60}
                              thickness={6} />
          </ProgressWrapper>
        ) } 

        <Content loading={resultsLoading}>
          <SearchModeTabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Suggestions" />
            <Tab label="Search" />
          </SearchModeTabs>

          <SwipeableViews index={tabIndex}>
            {tabContent}
          </SwipeableViews>
        </Content>
      </ContainingPaper>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)`
  max-height: calc(100vh - 120px);
`;

const ContainingPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Content = styled.div`
  ${ ({ loading }) => loading && "opacity: 0.4" }
`;

const ProgressWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
`;

const SearchModeTabs = withTheme(styled(Tabs)`
  background-color: ${ ({ theme }) => theme.palette.primary.light };
  color: ${ ({ theme }) => theme.palette.primary.contrastText };
`);

export default ResultList;