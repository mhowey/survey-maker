/** @format */

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { seedData } from '../data/seedData';
import { useLocalStorage } from '../hooks';
import { makeStyles, Button, Card, CardContent } from '@material-ui/core';
import PageTitle from './PageTitle';
import AddSurveyForm from './AddSurveyForm';

const useStyles = makeStyles({
  card: {
    width: '90vw',
    marginBottom: '20px',
  },
  completeBtn: {
    backgroundColor: 'aquamarine',
    color: 'green',
    marginRight: '10px',
  },
  inProgressBtn: {
    backgroundColor: 'green',
    color: 'aquamarine',
    marginRight: '10px',
  },
  notLaunchedBtn: {
    backgroundColor: 'darkolivegreen',
    color: 'white',
    marginRight: '10px',
  },
  allBtn: {
    backgroundColor: 'white',
    color: 'black',
    marginRight: '10px',
    marginLeft: '10px',
  },
});

const columns = memoize(() => [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Survey Name',
    selector: 'name',
    sortable: false,
  },
  {
    name: 'Start Date',
    selector: 'start_date',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
  },
]);

const conditionalRowStyles = [
  {
    when: row => row.status === 'Complete',
    style: {
      backgroundColor: 'aquamarine',
      color: 'green',
    },
  },
  {
    when: row => row.status === 'In Progress',
    style: {
      backgroundColor: 'green',
      color: 'aquamarine',
    },
  },
  {
    when: row => row.status === 'Not Launched',
    style: {
      backgroundColor: 'darkolivegreen',
      color: 'white',
    },
  },
];

const Surveys = () => {
  const classes = useStyles();

  const handleSave = newSurvey => {
    newSurvey.id = surveys.length + 1;
    setSurveys([newSurvey, ...surveys]);
  };
  const [surveys, setSurveys] = useLocalStorage('surveys', seedData);
  const [filtered, setFiltered] = useLocalStorage('surveys', surveys);
  const [filterName, setFilterName] = useState('SEE All');

  useEffect(() => {
    setFiltered(surveys);
    setFilterName('ALL');
  }, [surveys, setFiltered]);

  const filteredComplete = surveys.filter(
    survey => survey.status === 'Complete'
  );
  const filteredNotLaunched = surveys.filter(
    survey => survey.status === 'Not Launched'
  );
  const filteredInProgress = surveys.filter(
    survey => survey.status === 'In Progress'
  );

  return (
    <>
      <PageTitle>Surveys</PageTitle>
      <Card className={classes.card} elevation={5}>
        <CardContent>
          <AddSurveyForm onSave={handleSave} />
        </CardContent>
      </Card>
      <Card className={classes.card} elevation={5}>
        <CardContent>
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="300px"
            title="List of Surveys"
            columns={columns()}
            data={filtered}
            conditionalRowStyles={conditionalRowStyles}
            subHeader={true}
            subHeaderComponent={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>Filter by</h3>
                <Button
                  classes={{ root: classes.allBtn }}
                  onClick={e => {
                    setFilterName(e.target.innerText);
                    setFiltered(surveys);
                  }}
                  variant="contained"
                >
                  All
                </Button>
                <Button
                  classes={{ root: classes.notLaunchedBtn }}
                  onClick={e => {
                    setFilterName(e.target.innerText);
                    setFiltered(filteredNotLaunched);
                  }}
                  variant="contained"
                >
                  Not Launched
                </Button>
                <Button
                  classes={{ root: classes.inProgressBtn }}
                  onClick={e => {
                    setFilterName(e.target.innerText);
                    setFiltered(filteredInProgress);
                  }}
                  variant="contained"
                >
                  In Progress
                </Button>
                <Button
                  classes={{ root: classes.completeBtn }}
                  onClick={e => {
                    setFilterName(e.target.innerText);
                    setFiltered(filteredComplete);
                  }}
                  variant="contained"
                >
                  Complete
                </Button>
                <h3>Viewing: {filterName}</h3>
              </div>
            }
            subHeaderAlign={'left'}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Surveys;
