import React, { Component } from "react";
import * as Api from "../../api/api";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AppBar, Typography, CircularProgress } from "@material-ui/core";
import Done from "@material-ui/icons/Done"
import Clear from "@material-ui/icons/Clear"


const useStyles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(10),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      vehicles: [],
      loading:false
    };
  }

  createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = async () => {
    const data = await Api.getAllCustomers();
    this.setState({ customers: data });
    this.getVehicles();
    this.getStatus();
  };

  getVehicles = async () => {
    const data = await Api.getAllVehicles();
    const customers = this.state.customers;
    let vehicles = data.map((value, index) => {
      const customer = customers.find(function(element) {
        return element.id === value.customerId;
      });
      let randomAvalibility = Math.random() >= 0.5;
      return {
        ...value,
        ...customer,
        isAvalible:randomAvalibility
      };
    });
    this.setState({ vehicles });
  };

  getStatus = async ()=>{
    
    await setInterval(()=>{
      this.setState({loading:true})
      let vehicles = this.state.vehicles

      let newVehicles = vehicles.map((data,index)=>(
        {
          ...data,
          isAvalible:Math.random() >= 0.5
        }
      ))
      this.setState({vehicles:newVehicles})
      setTimeout(()=>{this.setState({loading:false})},500)
    } , 5000) 
  }

  render() {
    const { classes } = this.props;
    
    
    return (
      <div>
        <AppBar style={{ backgroundColor: "blue" }} position="fixed">
          <Toolbar>
            <Typography> Vehicle List</Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell align="left">Customer Address</TableCell>
                <TableCell align="left">Vehicle VIN</TableCell>
                <TableCell align="left">Vehicle Reg</TableCell>
                <TableCell align="left">Is Avalible</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.vehicles.map((row,key) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.VIN}</TableCell>
                  <TableCell align="left">{row.Reg}</TableCell>
                  <TableCell align="center">{this.state.loading ? <CircularProgress size={24}/> 
                  : row.isAvalible ?  
                  <div style={{color:"green"}}><Done /></div>
                  : <div style={{color:"red"}}><Clear /></div>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(VehicleList);
