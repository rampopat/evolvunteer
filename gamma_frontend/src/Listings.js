import React from 'react';
import styled from 'styled-components';

import JobListing from './listings/JobListing';

const opportunities = [
    {title: "Opportunity at UNICEF"},
    {title: "Farm volunteering"},
    {title: "Help my mum move her piano"},
    {title: "Help teach kids guitar!"},
    {title: "You're a terrible person if you don't apply to this!"},
    {title: "Full Stack Dev volunteer opportunity for great exposure"}
];

const Listings = ({ results }) => {
    const resultListings = results ? results.map(result => JobListing(result)) : null;
    const isSearchQuery = results.length > 0;

    return (
        <ListingsContainer>
            {resultListings}
            {opportunities.map(opportunity => (<JobListing {...opportunity} isSearchQuery={isSearchQuery} />))}
        </ListingsContainer>
    );
};

const ListingsContainer = styled.div`
`;

export default Listings;