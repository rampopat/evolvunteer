import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core'
import ImageUploader from 'react-images-upload'


class NPEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      address: "",
      date: "",
      image: ""
    }
    this.onDrop = this.onDrop.bind(this)
  }

  updateDetails(newField) {
    this.setState(newField, () => this.props.handleChange(this.state));
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
            label="Event Name"
            margin="normal"
            variant="outlined"
            onChange={evt => this.updateDetails({ title: evt.target.value })}
          />
          <DetailsTextField
            type="standard-name"
            label="Task Description"
            margin="normal"
            full width
            variant="outlined"
            onChange={evt => this.updateDetails({ description: evt.target.value })}
          />
          <DetailsTextField
            type="standard-name"
            label="Testimonial"
            margin="normal"
            full width
            variant="outlined"
            onChange={evt => this.updateDetails({ testimonial: evt.target.value })}
          />
          <DetailsTextField
            type="date"
            label="Date"
            defaultValue="2017-05-24"
            margin="normal"
            variant="outlined"
            onChange={evt => this.updateDetails({ date: evt.target.value })}
          />
          <DetailsTextField
            type="standard-name"
            label="Duration in hours"
            margin="normal"
            variant="outlined"
            onChange={evt => this.updateDetails({ duration: evt.target.value })}
          />
          <DetailsTextField
            type="standard-name"
            label="Location"
            margin="normal"
            full width
            variant="outlined"
            onChange={evt => this.updateDetails({ address: evt.target.value })}
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

export default NPEventForm;
