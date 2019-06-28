import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  CircularProgress,
} from "@material-ui/core";
import Done from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";

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
class VehiclesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: this.props.tableHead || [],
      filteredList: this.props.filteredList || [],
      loading: this.props.loading || false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredList: nextProps.filteredList,
      tableHead: nextProps.tableHead,
      loading: nextProps.loading
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {this.state.tableHead.length > 0 ? (
                this.state.tableHead.map(data => (
                  <TableCell align="left">{data}</TableCell>
                ))
              ) : (
                <div>No header found</div>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.filteredList.length > 0 ? (
              this.state.filteredList.map((row, key) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.VIN}</TableCell>
                  <TableCell align="left">{row.Reg}</TableCell>
                  <TableCell align="center">
                    {this.state.loading ? (
                      <CircularProgress size={24} />
                    ) : row.isAvailable ? (
                      <div style={{ color: "green" }}>
                        <Done />
                      </div>
                    ) : (
                      <div style={{ color: "red" }}>
                        <Clear />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div>No data found</div>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(VehiclesTable);
