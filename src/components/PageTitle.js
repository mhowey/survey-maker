/** @format */

import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  headerText: {
    padding: '20px',
    alignSelf: 'left',
  },
});

const PageTitle = ({ children }) => {
  const classes = useStyles();
  return (
    <div style={{ alignSelf: 'flex-start' }}>
      <Typography className={classes.headerText} variant="h3">
        {children}
      </Typography>
    </div>
  );
};

export default PageTitle;
