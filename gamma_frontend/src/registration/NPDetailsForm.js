import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core'
import ImageUploader from 'react-images-upload'


class NPDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      dob: "",
      home: ""
    }
  }

  updateDetails(newField) {
    this.setState(newField, () => this.props.handleChange(this.state));
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <WelcomeList style={{ color: "#666666" }}>
          <DetailsTextField
            type="standard-name"
            label="Organisation Name"
            margin="normal"
            variant="outlined"
            onChange={evt => this.updateDetails({ name: evt.target.value })}
          />
          <DetailsTextField
            type="standard-number"
            label="Registration Number"
            margin="normal"
            full width
            variant="outlined"
            onChange={evt => this.updateDetails({ number: evt.target.value })}
          />
          <DetailsTextField
            type="standard-name"
            label="Organisation Role/Mission"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={evt => this.updateDetails({ mission: evt.target.value })}
          />
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
      </div>
    );
  }
}

const WelcomeList = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
`;

const DetailsTextField = styled(TextField)`
    flex: 1;
    margin: 13px 0;
`;

export default NPDetailsForm;
