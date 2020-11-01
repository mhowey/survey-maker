/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SimpleMenu from './SimpleMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <MenuIcon />
          </IconButton>
          <SimpleMenu anchorEl={anchorEl} handleClose={handleClose} />
          <Typography variant="h6" className={classes.title}>
            Survey Maker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
