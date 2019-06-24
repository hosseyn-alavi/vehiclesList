import React, { Component } from "react";
import * as Api from "../../api/api";
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar, IconButton, Typography } from "@material-ui/core";
import MaterialTable from 'material-table';

export default class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ],
      data: [
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        {
          name: 'Zerya Betül',
          surname: 'Baran',
          birthYear: 2017,
          birthCity: 34,
        },
      ],
    };
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = async () => {
    const data = await Api.getAllCustomers();
    this.setState({ customers: data });
  };

  render() {
    return (
      <div>
        <AppBar
        style={{backgroundColor:"blue"}}
          position="fixed"
        >
          <Toolbar> 
             
          <Typography> Vehicle List</Typography>
          </Toolbar>
          </AppBar>
          <MaterialTable
      title="Editable Example"
      columns={this.state.columns}
      data={this.state.data}
    //   editable={{
    //     onRowAdd: newData =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           const data = [...state.data];
    //           data.push(newData);
    //           setState({ ...state, data });
    //         }, 600);
    //       }),
    //     onRowUpdate: (newData, oldData) =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           const data = [...state.data];
    //           data[data.indexOf(oldData)] = newData;
    //           setState({ ...state, data });
    //         }, 600);
    //       }),
    //     onRowDelete: oldData =>
    //       new Promise(resolve => {
    //         setTimeout(() => {
    //           resolve();
    //           const data = [...state.data];
    //           data.splice(data.indexOf(oldData), 1);
    //           setState({ ...state, data });
    //         }, 600);
    //       }),
    //   }}
    />
        
        {this.state.customers.map((prop, key) => (
          <div>{prop.name}</div>
        ))}
      </div>
    );
  }
}
