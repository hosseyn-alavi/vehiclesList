import React, { Component } from "react";
import * as Api from "../../api/api";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  InputLabel,
  Input,
  MenuItem,
  Select,
  Grid
} from "@material-ui/core";
import Header from "../../components/header";
import VehiclesTable from "../../components/table";

const useStyles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  statusSelect:{
    margin: "20px 80px 20px 0px",
    [theme.breakpoints.down("xs")]: {
      margin: "20px 80px 20px 80px",
    }
    
  }
  
});
class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeaders: [
        "Customer Name",
        "Customer Address",
        "Vehicle VIN",
        "Vehicle Reg",
        "Availability"
      ],
      customers: [],
      vehicles: [],
      loading: false,
      customerSelected: [],
      filteredList: [],
      statusSelected: ""
    };
  }

  componentDidMount() {
    //get customers list as first action
    this.getCustomers();
  }

  getCustomers = async () => {
   try{
     //get costomers from server and keep them in state
    const data = await Api.getAllCustomers();
    this.setState({ customers: data });
    //call getVehicles function after successfuly getting customera
    this.getVehicles();
    //call interval function for get vehicles statuses
    this.getStatus();
   }catch{
     alert("something wrong with server")
   }
  };

  getVehicles = async () => {
    const data = await Api.getAllVehicles();
    const customers = this.state.customers;

    //set every vehicle for each customer
    let vehicles = data.map((value, index) => {
      const customer = customers.find(function(element) {
        return element.id === value.customerId;
      });
      //set random availability for vehicles at first init
      let randomAvailability = Math.random() >= 0.5;
      return {
        ...value,
        ...customer,
        isAvailable: randomAvailability
      };
    });
    this.setState({ vehicles, filteredList: vehicles });
  };

  getStatus = async () => {
    //it should be interval to keep alive getting status and show to client during the app is run
    await setInterval(() => {
      //set loading because it may take time to get status
      this.setState({ loading: true });
      let vehicles = this.state.vehicles;
      //make a new list of vehicles with new status
      let newVehicles = vehicles.map((data, index) => ({
        ...data,
        isAvailable: Math.random() >= 0.5
      }));
      this.setState({ vehicles: newVehicles, filteredList: newVehicles });
      //call filter function because the list may be filtered before
      this.filterList(this.state.customerSelected, this.state.statusSelected);
      //a fake loading with 500 ms , because in real world this action may takes time and client
      //shuld see a loading show
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }, 60000);
  };

  //this function keeps customers selected in state for filer and call filter function 
  handleChangeFilterCustomer(event) {
    this.setState({ customerSelected: event.target.value });
    this.filterList(event.target.value, this.state.statusSelected);
  }

  //the main filter function
  //we can get customers and status for filter from state but the state update hase delay to update
  //and we need to run this function immediately after user select filters , the patameters shuold
  //should pass as argument to function
  filterList(list, isAvailable) {
    let dataList = [];
    //first filter list by status
    if (isAvailable === "true") {
      dataList = this.state.vehicles.filter(
        vehicle => vehicle.isAvailable === true
      );
    } else if (isAvailable === "false") {
      dataList = this.state.vehicles.filter(
        vehicle => vehicle.isAvailable === false
      );
    } else {
      dataList = this.state.vehicles;
    }

    //filter status filtered list with customers selected
    if (list.length > 0) {
      let filteredListByCustomer = [];
      let newList = [];
      list.map((data, index) => {
        newList = dataList.filter(vehicle => vehicle.customerId === data.id);
        filteredListByCustomer = [...filteredListByCustomer, ...newList];
        return(index)
      });
      this.setState({ filteredList: filteredListByCustomer });
    } else {
      this.setState({ filteredList: dataList });
    }
  }

//keep the status selected and call filter function 
  handleChangeFilterStatus(event) {
    this.setState({ statusSelected: event.target.value });
    this.filterList(this.state.customerSelected, event.target.value);
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <Header title="Customer Vehicles List" />
        <Paper style={{ marginTop: 20 }}>
          <Grid container justify="space-between">
            <Grid item style={{ margin: "20px 0px 20px 80px" }}>
              <InputLabel htmlFor="select-multiple">Customer Name</InputLabel>
              <Select
                fullWidth
                multiple
                value={this.state.customerSelected}
                onChange={this.handleChangeFilterCustomer.bind(this)}
                input={<Input id="select-multiple" />}
                MenuProps={{
                  PaperProps: {
                    style: {width: 250}
                  }
                }}
              >
                {this.state.customers.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item className={classes.statusSelect}>
              <InputLabel>Availability</InputLabel>
              <Select
                native
                value={this.state.statusSelected}
                onChange={this.handleChangeFilterStatus.bind(this)}
              >
                <option value="">All Vehicles</option>
                <option value={true}>Avalible</option>
                <option value={false}>Not Avalible</option>
              </Select>
            </Grid>
          </Grid>
        </Paper>
        <VehiclesTable
          tableHead={this.state.tableHeaders}
          filteredList={this.state.filteredList}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(VehicleList);
