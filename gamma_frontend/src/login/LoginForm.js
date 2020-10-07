import React from 'react';
import styled from 'styled-components';
import { TextField, Container } from '@material-ui/core'

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }

  updateDetails(newField) {
    this.setState(newField, () => this.props.handleChange(this.state));
  }

  render() {
    return (
      <WelcomeList style={{ color: "#666666" }}>
          <DetailsTextField
            type="standard-name"
            label="Username"
            margin="normal"
            variant="outlined"
            onChange={evt => this.updateDetails({ username: evt.target.value })}
          />
          <DetailsTextField
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            onChange={evt => this.updateDetails({ password: evt.target.value })}
          />
      </WelcomeList>
    );
  }
}

const WelcomeList = styled(Container)`
    margin-top: 30px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    padding: 0;
`;

const DetailsTextField = styled(TextField)`
    flex: 1;
`;

export default LoginForm;
