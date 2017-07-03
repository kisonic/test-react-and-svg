import React, { Component } from 'react';

import YearChart from './YearChart';

import './App.css';

const data = {
  '2015-01-01': {
    rate: 76.9,
    changes: 0.2,
  },
  '2015-01-05': {
    rate: 71.65,
    changes: -5.25,
  },
  '2015-01-30': {
    rate: 70.48,
    changes: -1.17,
  },
  '2015-02-01': {
    rate: 74.82,
    changes: 4.34,
  },
  '2015-02-03': {
    rate: 62.37,
    changes: -12.45,
  },
  '2015-02-07': {
    rate: 62.37,
    changes: 0,
  },
  '2015-02-09': {
    rate: 58.03,
    changes: -4.34,
  },
  '2015-02-11': {
    rate: 60.11,
    changes: 2.08,
  },
  '2015-02-25': {
    rate: 60.15,
    changes: 0.4,
  },
  '2015-02-28': {
    rate: 59.82,
    changes: -0.33,
  },
  '2015-03-05': {
    rate: 60.07,
    changes: 0.25,
  },
  '2015-03-08': {
    rate: 58.9,
    changes: -1.17,
  },
  '2015-03-10': {
    rate: 64.33,
    changes: 5.43,
  },
  '2015-04-02': {
    rate: 57.89,
    changes: -6.44,
  },
  '2015-04-30': {
    rate: 55.92,
    changes: -1.97,
  },
  '2015-05-07': {
    rate: 59.97,
    changes: 2.05,
  },
  '2015-05-30': {
    rate: 60.27,
    changes: 0.3,
  },
  '2015-06-09': {
    rate: 58,
    changes: -2.27,
  },
  '2015-06-13': {
    rate: 62.22,
    changes: 4.22,
  },
  '2015-06-15': {
    rate: 62.2,
    changes: -0.02,
  },
  '2015-06-18': {
    rate: 58.87,
    changes: -3.33,
  },
  '2015-06-20': {
    rate: 40.11,
    changes: -18.76,
  },
  '2015-06-21': {
    rate: 40.01,
    changes: -0.1,
  },
  '2015-06-23': {
    rate: 40.01,
    changes: 0,
  },
  '2015-06-24': {
    rate: 38.74,
    changes: -1.27,
  },
  '2015-07-04': {
    rate: 38.74,
    changes: 0,
  },
  '2015-07-17': {
    rate: 19.96,
    changes: -18.78,
  },
  '2015-08-01': {
    rate: 19.93,
    changes: -0.03,
  },
  '2015-09-01': {
    rate: 40,
    changes: 20.07,
  },
  '2015-10-01': {
    rate: 38,
    changes: -2,
  },
  '2015-11-01': {
    rate: 37,
    changes: -1,
  },
  '2015-12-31': {
    rate: 67,
    changes: 30,
  },
};

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <YearChart
          data={ data }
        />
      </div>
    );
  }
}
