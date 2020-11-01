/** @format */

import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

export default function SimpleMenu({ anchorEl, handleClose }) {
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <Link to="/">Surveys</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/dashboard">Dashboard</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/logout">Logout</Link>
      </MenuItem>
    </Menu>
  );
}
