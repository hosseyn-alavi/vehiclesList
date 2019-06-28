import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Grid, Switch } from "@material-ui/core";

const useStyles = theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    position: "relative"
  }
});
class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography> {this.props.title}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end" alignItems="center">
                <Grid item>
                  <Typography component="span">Swedish</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={this.props.isEnglish}
                    onChange={this.props.changeLang}
                    color="default"
                    inputProps={{ "aria-label": "checkbox with default color" }}
                  />
                </Grid>
                <Grid item>
                  <Typography component="span">English</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(Header);
