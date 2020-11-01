/** @format */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import 'date-fns';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  error: {
    color: 'red',
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: '15px',
  },
  statusSelect: {
    width: '200px',
  },
}));
const AddSurveyForm = ({ onSave }) => {
  const [status, setStatus] = useState('Not Launched');
  const [selectedDate, setSelectedDate] = useState();
  const [error, setError] = useState('');
  const classes = useStyles();
  return (
    <form
      onFocus={e => setError('')}
      onKeyUp={e => setError('')}
      onSubmit={e => {
        e.preventDefault();
        if (e.target.name.value !== '' && selectedDate !== undefined) {
          onSave({
            name: e.target.name.value,
            start_date: selectedDate,
            status: status,
          });
          e.target.name.value = '';
          setSelectedDate(undefined);
          setStatus('Not Launched');
          document.getElementById('dateField').value = undefined;
        } else {
          setError('All fields are Required...');
        }
      }}
    >
      <Grid container justify="space-evenly">
        <Grid item>
          <TextField
            variant="outlined"
            label="name"
            name="name"
            type="text"
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            id="dateField"
            label="Start Date"
            type="date"
            onChange={e => {
              setSelectedDate(e.target.value);
            }}
            defaultValue={new Date()}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel htmlFor="status-select">
            Status:{' '}
            <Select
              displayEmpty={true}
              name="status-select"
              className={classes.statusSelect}
              variant="outlined"
              inputProps={{}}
              labelId="simple-select-label"
              id="simple-select"
              value={status}
              onChange={e => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value="Not Launched">Not Launched</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </InputLabel>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Add Survey
          </Button>
        </Grid>
      </Grid>
      <div className={classes.error}>{error}</div>
    </form>
  );
};

AddSurveyForm.propTypes = {
  onSave: PropTypes.func,
};
export default AddSurveyForm;
