import React from 'react';
import styled, { css } from 'styled-components';
import { List, ListItem, ListItemText, Box } from '@material-ui/core';

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../../assets/organisations', false, /\.(png|jpe?g|svg)$/));

const SearchResults = ({ isSuggestions, opportunities, handleListItemClick, activeId }) => (
      <Wrapper suggestions={isSuggestions}>
        <List width='100%' margin={0} disablePadding spacing={2}>
        {
            opportunities.map( ( result => (
            <Result isActive={result.pk === activeId} 
                    m={2}
                    key={result.pk}
                    onClick={() => handleListItemClick(result.pk, isSuggestions)}>
              <ListImgContainer>
                <ListImg src={"https://gamma-group26.herokuapp.com/media/" + result.image} alt="WU" />
              </ListImgContainer>
              <ListItemText primary={result.title}
                            secondary={result.description.substring(0, 35) + '...' || "lecę bo życie jest złeeee"} />
               
              <MatchText primary={Math.floor(result.score * 100) + "% match"}/>
            </Result>
            )))
        }
        </List>
      </Wrapper>
);

const Wrapper = styled(Box)`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100%;
`;

const ListImgContainer = styled.div`
  margin-right: 24px;
`;

const ListImg = styled.img`
  max-width: 64px;
  opacity: 0.8;
  object-fit: contain;
`;

const active = css`
  background-color: #dddddd;
`;

const Result = styled(ListItem)`
  padding 11px 32px;
  border-bottom: 1px solid #eeeeee;

  transition: all 0.16s ease-out;

  :hover {
    transform: scale(1.08);
  }

  :last-child {
     border-bottom: none;
  }

  ${ ({ isActive }) => isActive && active }}
`;

const MatchText = styled(ListItemText)`
  /* position: absolute;
  top: 0;
  right: 0; */
  opacity: 0.6;
  font-size: 0.8rem;
`;


export default SearchResults;