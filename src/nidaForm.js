import React, { Component } from "react";
import {
  Button,
  TextInputField,
  Heading,
  Pane,
  Text,
  Spinner
} from "evergreen-ui";
import axios from "axios";
class NidaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nid: "",
      info: {},
      forename: "",
      sirnames: "",
      dob: "",
      data_fetched: false,
      fetching: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({
      nid: e.target.value
    });
  }

  handleSubmit() {
    // console.log(this.state.nid);
    this.setState({
      data_fetched: false,
      fetching: true
    });
    let nid = this.state.nid;
    let code = "103";
    axios.get("http://localhost:3500/?doc=" + nid + "&code=" + code).then(d => {
      console.log(d.data);
      if (d.data.result.AuthenticateDocumentResult !== null) {
        this.setState({
          forename: d.data.result.AuthenticateDocumentResult.ForeName,
          sirnames: d.data.result.AuthenticateDocumentResult.Surnames,
          dob: d.data.result.AuthenticateDocumentResult.DateOfBirth,
          data_fetched: true,
          fetching: false,
          info: d.data.result.AuthenticateDocumentResult
        });
      } else {
        this.setState({
          forename: "-",
          sirnames: "-",
          dob: "-",
          data_fetched: true,
          fetching: false,
          info: d.data.result.AuthenticateDocumentResult
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Pane
          display="flex"
          width={600}
          padding={16}
          marginTop={50}
          marginLeft={50}
          background="tint2"
          borderRadius={3}
        >
          <Pane flex={1} alignItems="center">
            <TextInputField
              label="Enter the NID"
              name="nid"
              value={this.state.nid}
              placeholder="1198009..."
              height={24}
              width={160}
              marginRight={16}
              onChange={this.handleChange}
            />
            <br></br>
            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Pane>

          {this.state.fetching && (
            <Pane flex={1} height={30}>
              <Spinner delay={300} />
            </Pane>
          )}

          {this.state.data_fetched && (
            <Pane>
              <Text size={300}>Forename: {this.state.forename}</Text>
              <br />
              <Text size={300}>Surnames: {this.state.sirnames}</Text>
              <br />
              <Text size={300}>Date Of Birth: {this.state.dob}</Text>
              <br />
            </Pane>
          )}
        </Pane>
      </React.Fragment>
    );
  }
}

export default NidaForm;
