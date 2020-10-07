import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core'
import ImageUploader from 'react-images-upload'

class DetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      dob: "",
      home: "",
      username: "",
      login: "",
      image: "http://gamma-group26.herokuapp.com/media/default.png"
    }
    this.onDrop = this.onDrop.bind(this);
  }

  updateDetails(newState) {
    this.setState(newState, () => this.props.handleChange(this.state));
    console.log(this.state);
  }

  onDrop(picture) {
    this.setState({
      image: picture
    })
  }

  render() {

    return (
      <div>
        <WelcomeList style={{ color: "#666666" }}>
          <DetailsTextField
            type="standard-name"
            label="Name"
            margin="normal"
            variant="outlined"
            onChange={evt => this.updateDetails({ name: evt.target.value })}
          />
          <DetailsTextField
            type="standard-name"
            label="Surname"
            margin="normal"
            variant="outlined"
            onChange={evt => this.updateDetails({ surname: evt.target.value })}
          />
          <DetailsTextField
            id="date"
            label="Date of Birth"
            type="date"
            defaultValue="1994-05-24"
            variant="outlined"
            onChange={evt => this.updateDetails({ dob: evt.target.value })}
          />
          <DetailsTextField
            id="standard-multiline-flexible"
            label="Home Address"
            multiline
            rowsMax="4"
            variant="outlined"
            onChange={evt => this.updateDetails({ home: evt.target.value })}
          />
          <DetailsTextField
            type="standard-name"
            label="Bio"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={evt => this.updateDetails({ bio: evt.target.value })}
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
          <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={(picture) => this.onDrop(picture)}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            singleImage={true}
            maxFileSize={5242880}
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

export default DetailsForm;
