import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import EmployeeDetails from "./EmployeeDetails";
import API from "../utils/API";
import SearchForm from "./SearchForm";
import Emoji from "./Emoji";
import "./style.css"; 

class EmployeesContainer extends Component {
  state = {
    result: {},
    employees: [],
    search: ""
  };

  // When this component mounts, get API data and display
  componentDidMount() {
    API.getEmployees().then(res => {
      this.setState({ employees: res });
    });
  }

  handleInputChange = event => {
    const filter = event.target.value;
    const filteredEmployees = this.state.employees.filter(employee => {
      let values = Object.values(employee).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1; 
    });
    this.setState({
      "employees": filteredEmployees  
    });   
  };

  handleFormSubmit = event => {
    event.preventDefault();
    var employeeRecords = this.state.employees
    for(let i=0;i<employeeRecords.length;i++){
      for(let  j=0;j<employeeRecords.length;j++){
        if(employeeRecords[i].name < employeeRecords[j].name){
          var temp = employeeRecords[j];
          employeeRecords[j]= employeeRecords[i];
          employeeRecords[i] = temp
        }
      }
    }
    this.setState({
      "employees": employeeRecords 
    });  
    console.log(this.state.employees)
  };

  render() {
    return (
      <div>
        <Container>
        <SearchForm
      handleInputChange={this.handleInputChange}
     />
          <Row>
            <Col size="md-12">
                <Card>
                  <Row>
                    <Col size="md-1"><h5>Image</h5></Col>
                    <Col size="md-2"><h5>Name <button onClick={this.handleFormSubmit} className="btn"><Emoji symbol="💎" /></button></h5></Col>
                    <Col size="md-3"><h5>Phone</h5></Col>
                    <Col size="md-3"><h5>Email</h5></Col>
                    <Col size="md-3"><h5>DOB</h5></Col>
                  </Row>
                  {this.state.employees.map(employee => <EmployeeDetails key={employee.name} {...employee}/>)}
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )}
};

export default EmployeesContainer;
