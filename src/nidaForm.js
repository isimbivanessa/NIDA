import React, { Component } from "react";
import {
  Button,
  TextInputField,
  
  Pane,
  Text,
  Spinner,
  Strong,
} from "evergreen-ui";
import axios from "axios";
import ProfileImage from "./ProfileImage";
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
      fetching: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({
      nid: e.target.value,
    });
  }

  handleSubmit() {
    // console.log(this.state.nid);
    this.setState({
      data_fetched: false,
      fetching: true,
    });
    let nid = this.state.nid;
    let code = "103";
    axios
      // .get("http://localhost:4000/?doc=" + nid + "&code=" + code)
      .get("http://localhost:4000/api/?doc=" + nid + "&code=" + code)
      .then((d) => {
        console.log(d.data);
        if (d.data.result.AuthenticateDocumentResult) {
          this.setState({
            forename: d.data.result.AuthenticateDocumentResult.ForeName,
            sirnames: d.data.result.AuthenticateDocumentResult.Surnames,
            dob: d.data.result.AuthenticateDocumentResult.DateOfBirth,
            Province: d.data.result.AuthenticateDocumentResult.Province,
            District: d.data.result.AuthenticateDocumentResult.District,
            Sector: d.data.result.AuthenticateDocumentResult.Sector,
            Cell: d.data.result.AuthenticateDocumentResult.Cell,
            Village: d.data.result.AuthenticateDocumentResult.Village,
            FatherName: d.data.result.AuthenticateDocumentResult.FatherNames,
            MotherName: d.data.result.AuthenticateDocumentResult.MotherNames,
            DateOfIssue: d.data.result.AuthenticateDocumentResult.DateOfIssue,
            CivilStatus: d.data.result.AuthenticateDocumentResult.CivilStatus,
            CountryOfBirth: d.data.result.AuthenticateDocumentResult.CountryOfBirth,
            IssueNumber: d.data.result.AuthenticateDocumentResult.IssueNumber,
            PlaceOfBirth: d.data.result.AuthenticateDocumentResult.PlaceOfBirth,
            PlaceOfIssue: d.data.result.AuthenticateDocumentResult.PlaceOfIssue,
            Sex: d.data.result.AuthenticateDocumentResult.Sex,
            Status: d.data.result.AuthenticateDocumentResult.Status,
            ApplicantType: d.data.result.AuthenticateDocumentResult.ApplicantType,
            ApplicationNumber: d.data.result.AuthenticateDocumentResult.ApplicationNumber,
            DocumentNumber: d.data.result.AuthenticateDocumentResult.DocumentNumber,
            DocumentType: d.data.result.AuthenticateDocumentResult.DocumentType,
            VillageID: d.data.result.AuthenticateDocumentResult.VillageID,
            data_fetched: true,
            fetching: false,
            info: d.data.result.AuthenticateDocumentResult,
            Photo: d.data.result.AuthenticateDocumentResult.Photo

          });
        } else {
          this.setState({
            forename: "-",
            sirnames: "-",
            dob: "-",
            data_fetched: true,
            fetching: false,
            info: d.data.result.AuthenticateDocumentResult,
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

         <div style={{display:'grid', rowGap:'10px'}}>
        {this.state.data_fetched && <ProfileImage photo={ this.state.Photo }/>}

{this.state.data_fetched && (
  <Pane>
    <Text size={300}><Strong>Forename:</Strong> {this.state.forename}</Text>
    <br />
    <Text size={300}><Strong>Surnames:</Strong> {this.state.sirnames}</Text>
    <br />
    <Text size={300}><Strong>Date Of Birth:</Strong> {this.state.dob}</Text>
    <br />
    <Text size={300}><Strong>Province:</Strong> {this.state.Province}</Text>
    <br />
    <Text size={300}><Strong>District:</Strong> {this.state.District}</Text>
    <br />
    <Text size={300}><Strong>Sector:</Strong> {this.state.Sector}</Text>
    <br />
    <Text size={300}><Strong>Cell:</Strong> {this.state.Cell}</Text>
    <br />
    <Text size={300}><Strong>Village:</Strong> {this.state.Village}</Text>
    <br />
    <Text size={300}><Strong>FatherName:</Strong> {this.state.FatherName}</Text>
    <br />
    <Text size={300}><Strong>MotherName:</Strong> {this.state.MotherName}</Text>
    <br />
    <Text size={300}><Strong>DateOfIssue:</Strong> {this.state.DateOfIssue}</Text>
    <br />
    <Text size={300}><Strong>CivilStatus:</Strong> {this.state.CivilStatus}</Text>
    <br />
    <Text size={300}><Strong>CountryOfBirth:</Strong> {this.state.CountryOfBirth}</Text>
    <br />
    <Text size={300}><Strong>IssueNumber:</Strong> {this.state.IssueNumber}</Text>
    <br />
    <Text size={300}><Strong>PlaceOfBirth:</Strong> {this.state.PlaceOfBirth}</Text>
    <br />
    <Text size={300}><Strong>PlaceOfIssue:</Strong> {this.state.PlaceOfIssue}</Text>
    <br />
    <Text size={300}><Strong>Sex:</Strong> {this.state.Sex}</Text>    
    <br />
    <Text size={300}><Strong>Status:</Strong> {this.state.Status}</Text>
    <br />
    <Text size={300}><Strong>ApplicantType:</Strong> {this.state.ApplicantType}</Text>
    <br />
    <Text size={300}><Strong>ApplicationNumber:</Strong> {this.state.ApplicationNumber}</Text>
    <br />
    <Text size={300}><Strong>DocumentNumber:</Strong> {this.state.DocumentNumber}</Text>
    <br />
    <Text size={300}><Strong>DocumentType:</Strong> {this.state.DocumentType}</Text>
    <br />
    <Text size={300}><Strong>VillageID:</Strong> {this.state.VillageID}</Text>
    <br />
  </Pane>
)}
         </div>
        </Pane>
      </React.Fragment>
    );
  }
}

export default NidaForm;
