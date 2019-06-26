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
import { AppBar, Typography, CircularProgress, InputLabel, Input, MenuItem, Select, Grid } from "@material-ui/core";
import Done from "@material-ui/icons/Done"
import Clear from "@material-ui/icons/Clear"


const useStyles = theme => ({
  root: {
    width: "100%",
    //marginTop: theme.spacing(10),
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
      loading:false,
      customerSelected:[],
      filteredList:[],
      statusSelected:null
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
    this.setState({ vehicles  , filteredList:vehicles});
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
      this.setState({vehicles:newVehicles , filteredList:newVehicles})
      this.filterByCustomer(this.state.customerSelected)
      setTimeout(()=>{this.setState({loading:false})},500)
    } , 10000) 
  }
  handleChangeFilterCustomer(event){
    this.setState({customerSelected:event.target.value})
    this.filterByCustomer(event.target.value)
    
  }

  filterByCustomer(list){
    if(list.length > 0){
      let filteredListByCustomer =[]
    list.map((data,index)=>{
      let dataList = this.state.vehicles.filter(vehicle =>(
        vehicle.customerId === data.id
      ))
      filteredListByCustomer = [...filteredListByCustomer , ...dataList]
    })
    this.setState({filteredList:filteredListByCustomer})
    }else{
      this.setState({filteredList:this.state.vehicles})
    }
  }

  handleChangeFilterStatus(){
    
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar style={{ backgroundColor: "blue" ,    position: "relative"}} >
          <Toolbar>
            <Typography> Vehicle List</Typography>
          </Toolbar>
        </AppBar>
          <Paper style={{marginTop:20}}>
         <Grid container justify="space-around">
         <Grid item style={{margin:10}}>
          <InputLabel htmlFor="select-multiple">Name</InputLabel>
        <Select
          multiple
          value={this.state.customerSelected}
          onChange={this.handleChangeFilterCustomer.bind(this)}
          input={<Input id="select-multiple" />}
          MenuProps={{
            PaperProps: {
              style: {
                //maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
          }}
        >
          {this.state.customers.map((name,index) => (
            <MenuItem key={index} value={name} //style={this.getStyles(name, personName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
          </Grid>
          <Grid item style={{marginTop:20}}> 
          <InputLabel>Avalibility</InputLabel>
          <Select
          native
          value={this.state.statusSelected}
          onChange={this.handleChangeFilterStatus.bind(this)}
          // inputProps={{
          //   name: 'age',
          //   id: 'age-native-simple',
          // }}
        >
          <option value="">All Vehicles</option>
          <option value={true}>Avalible</option>
          <option value={false}>Not Avalible</option>
        </Select>
          </Grid>
         </Grid>
          </Paper>
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
              {this.state.filteredList.map((row,key) => (
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
