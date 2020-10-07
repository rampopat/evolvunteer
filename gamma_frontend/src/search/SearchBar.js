import React, { Component } from 'react'
import styled from 'styled-components'
import { AppBar, Toolbar, Grid, Box, Container, Paper, InputBase, IconButton, Button } from '@material-ui/core/'
import SearchIcon from '@material-ui/icons/Search'
import SearchBarAdvanced from './SearchBarAdvanced'
import PlacesAutocomplete from 'react-places-autocomplete';

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

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: skills,
      keyword: "",
      start_date: "",
      end_date: "",
      location: ""
    }
  }

  handleCheckChange(skillHandle, isChecked) {
    const filters = Object.assign(this.state.filters, {});
    filters[skillHandle] = isChecked;

    this.setState({ filters: filters });
  }

  handleCalendarChange(value) {
    const start = value[0]
    const end = value[1]
    var startMonth = start.getMonth()
    if (startMonth + 1 < 10) {
      startMonth = '0' + (startMonth + 1)
    }

    var endMonth = end.getMonth()
    if (endMonth + 1 < 10) {
      endMonth = '0' + (endMonth + 1)
    }
    console.log(start.getFullYear() + '-' + startMonth + '-' + start.getDate())
    console.log(end.getFullYear() + '-' + endMonth + '-' + end.getDate())
    this.setState({
      start_date: start.getFullYear() + '-' + startMonth + '-' + start.getDate(),
      end_date: end.getFullYear() + '-' + endMonth + '-' + end.getDate()
    })

    console.log(this.state)

  }

  sendRequest() {
    const url = 'https://gamma-group26.herokuapp.com/api/search/';
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    const query = {
      id: loginData.user.volunteer,
      keyword: this.state.keyword,
      skills: this.state.filters,
      headers: { 'Authorization': 'JWT ' + loginData.token },
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      location: this.state.location
    }

    this.props.sendRequest(url, query);
  }

  render() {
    return (
      <SearchBarBox>
        <SearchBarPaper elevation={1}>
          <SearchInput
            placeholder="e.g homeless"
            onChange={evt => this.setState({ keyword: evt.target.value })}
          />
          
            <SearchInput
              placeholder="e.g London"
              onChange={evt => this.setState({ location: evt.target.value })}
            />
          
          <SearchButton onClick={() => this.sendRequest()}>
            <SearchIcon />
          </SearchButton>

          <SearchBarAdvanced handleCheckChange={(skill, isChecked) => this.handleCheckChange(skill, isChecked)}
            handleCalendarChange={(start, end) => this.handleCalendarChange(start, end)}
            skillsChecked={this.state.filters} />
        </SearchBarPaper>
      </SearchBarBox>
    )
  }
}

const SearchBarBox = styled(Box)`
  position: fixed;
  right: 10px;
  top: 8px;
  max-width: 550px;
  z-index: 32768;
`;

const SearchBarPaper = styled(Paper)`
  margin-left: auto;
`;

const SearchInput = styled(InputBase)`
  flex: 1;
  padding: 0 10px;
`;

const SearchButton = styled(IconButton)`
`;

export default SearchBar
