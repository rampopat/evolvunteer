import React, { Component } from 'react'
import styled from 'styled-components'
import { Box, Container, Grid } from '@material-ui/core'
import Axios from 'axios';

import SearchBar from '../search/SearchBar';
import ResultList from './ResultList';
import ResultInfo from './ResultInfo'

const opportunities = [
  {
    title: "Opportunity at UNICEF",
    description: "We'll ship you out to any place requiring humanitarian aid, at short notice",
    address: "968 Garratt Lane, Tooting",
    pk: 0
  },
  {
    title: "Farm volunteering",
    description: "You'll get to cuddle little goats!",
    address: "12 Brick Lane, London",
    pk: 1
  },
  {
    title: "Help my mum move her piano",
    description: "It's very heavy.",
    address: "12 London Road, Solihull",
    pk: 2
  },
  {
    title: "Help teach kids guitar!",
    description: "Help children realise their dream of becoming the next David Bowie",
    address: "12 London Road, Luton",
    pk: 3
  },
  {
    title: "You're a great person if you apply!",
    description: "We will surround you with praise and appreciation. Apply now!",
    address: "12 London Road, Epsom",
    pk: 4
  },
  {
    title: "Full Stack Dev volunteer opportunity for great exposure",
    description: "You'll work on a cosy cottage in the sunny hills of Devon",
    address: "12 London Road, Folkestone",
    pk: 5
  }
];

const skills = {
  "communication": true,
  "technical": true,
  "finance": true,
  "marketing": true,
  "medical": true,
  "teamwork": true,
  "problem_solving": true,
  "creativity": true,
  "craftmanship": true
};

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultFocusId: 0,
      resultsLoading: false,
      suggestions: opportunities,
      results: [],
      showResults: true,
      suggestionsTabActive: true
    }

    this.switchTab = this.switchTab.bind(this)
  }

  handleListItemClick(pk, isSuggestions) {
    this.setState({
      resultFocusId: pk,
      suggestionsTabActive: isSuggestions
    }, () => console.log(this.state));
  }

  componentDidMount() {
    this.getSuggestions();
  }

  getSuggestions() {
    const url = 'https://gamma-group26.herokuapp.com/api/search/';
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const query = {
      id: loginData.user.volunteer,
      skills: skills,
      keyword: "",
      start_date: "",
      end_date: "",
      location: ""
    };

    this.setState({
      resultsLoading: true
    });

    Axios.post(url, query)
      .then(opportunities => {
        const opportunityData = opportunities.data.map(opportunity => (JSON.parse(opportunity)))
        console.log(opportunityData)

        const opportunityDetails = opportunityData.map((opp, pk) =>
          Object.assign(JSON.parse(opp.opportunity).fields, { pk: pk, score: opp.score, opportunity: JSON.parse(opp.opportunity).pk }))

        console.log(opportunityDetails)
        this.setState({ 
          suggestions: opportunityDetails,
          results: opportunityDetails,
          resultsLoading: false
        })

      })
      .catch(err => {
        console.log(err);

        this.setState({
          resultsLoading: false
        });
      });
  }

  sendRequest(url, query) {
    this.setState({
      resultsLoading: true
    });

    Axios.post(url, query)
      .then(opportunities => {
        const opportunityData = opportunities.data.map(opportunity => (JSON.parse(opportunity)))
        console.log(opportunityData)

        const opportunityDetails = opportunityData.map((opp, pk) =>
          Object.assign(JSON.parse(opp.opportunity).fields, { pk: pk, score: opp.score, opportunity: JSON.parse(opp.opportunity).pk }))

        console.log(opportunityDetails)
        this.setState({
          results: opportunityDetails,
          resultsLoading: false
        });
      })
      .catch(err => {
        console.log(err);

        this.setState({
          resultsLoading: false
        });
      });
      /*
    Axios.post(url, query)
      .then(response => {
        const data = response.data.map(string => JSON.parse(string));
        data.map(string => string.opportunity = string.pk)
        const results = data.map((item, pk) => Object.assign({ opportunity: item[0].pk }, { pk: pk }, item[0].fields));
        results.map((res, pk) => res.pk = pk);
        console.log(results)
        this.setState({ results: results });
      })
      .catch(err => {
        console.log(err.response);
      });
      */
  }

  switchTab (itemsToShow) {
    var showResults = false
    itemsToShow === 'results' ? showResults = false : showResults = true

    this.setState({
      showResults: showResults
    });
  }

  render() {
    const result = this.state.results.find(({ pk }) => (pk === this.state.resultFocusId));
    const suggestion = this.state.suggestions.find(({ pk }) => (pk === this.state.resultFocusId));
    console.log(result)
    console.log(suggestion)
    return (
      <Box marginTop={2}>
        <SearchContainer maxWidth="lg">
          <SearchBar sendRequest={(url, query) => this.sendRequest(url, query)}
                     handleResults={results => this.setState({ results: results })} />
          <ResultGrid container marginTop={3} spacing={2}>
            <Grid item md={4}>
              <ResultList activeId={this.state.resultFocusId}
                          resultsLoading={this.state.resultsLoading}
                          handleListItemClick={(pk, isSuggestions) => this.handleListItemClick(pk, isSuggestions)}
                          suggestions={this.state.suggestions}
                          results={this.state.results}
                          switchTab={this.switchTab} />
            </Grid>
            <Grid item md={8}>
              <ResultInfo result={result} suggestion={suggestion} showResults={this.state.showResults}/>
            </Grid>
          </ResultGrid>
        </SearchContainer>
      </Box>
    )
  }
}

const SearchContainer = styled(Container)`
  padding: 0;
`;

const ResultGrid = styled(Grid)`
`;

export default Search
