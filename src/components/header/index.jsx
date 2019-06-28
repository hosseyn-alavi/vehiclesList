import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Typography } from "@material-ui/core";



const useStyles = theme => ({
    appBar:{
      backgroundColor: theme.palette.primary.main ,
      position: "relative"
    }
  })
;

class Header extends Component {


  render() {
    const { classes } = this.props;
    return (
        <AppBar className={classes.appBar} >
          <Toolbar>
            <Typography> {this.props.title}</Typography>
          </Toolbar>
        </AppBar>
        )
         
  }
}

export default withStyles(useStyles)(Header);
