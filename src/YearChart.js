import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

import Tooltip from './Tooltip';

import './YearChart.css';

moment.locale('ru');

const chartWidth = 810;
const chartHeight = 200;
const chartPaddingLeft = 35;
const chartPaddingTop = 25;

export default class YearChart extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    sectionsX: PropTypes.number.isRequired,
    sectionsY: PropTypes.number.isRequired,
  };

  static defaultProps = {
    sectionsX: 364,
    sectionsY: 4,
  };

  state = {
    hoveredItem: {},
  };

  constructor(props) {
    super(props);

    this.setValuesFromProps(props);
  }

  componentWillReceiveProps(newProps) {
    this.setValuesFromProps(newProps);
  }

  setValuesFromProps = ({ data, sectionsX, sectionsY }) => {
    const rates = Object.values(data).map(item => item.rate);
    const maxRate = Math.max(...rates);

    this.roundYValue = Math.ceil(maxRate / sectionsY);
    this.maxY = maxRate % this.roundYValue ? maxRate + (this.roundYValue - (maxRate % this.roundYValue)) : maxRate;
    this.stepX = chartWidth / sectionsX; // in pixels
    this.stepY = chartHeight / this.maxY; // in pixels
  };

  getXByDate = date =>
    (moment(date).dayOfYear() - 1) * this.stepX;

  getYByRate = rate =>
    chartHeight - (rate * this.stepY);

  hadnleMouseEnter = ([date, { rate, changes }]) => this.setState({
    hoveredItem: {
      date,
      rate,
      changes,
    },
  });

  hadnleMouseLeave = () => this.setState({
    hoveredItem: {},
  });

  render() {
    const { data, sectionsY } = this.props;
    const { hoveredItem } = this.state;

    const dates = Object.keys(data);
    const entries = Object.entries(data);

    const year = moment(dates[0]).format('YYYY');

    return (
      <svg className='chart' viewBox='0 0 865 280'>
        <svg width='845'>
          { Array(sectionsY + 1).fill(0).map((item, index) => {
            const y = chartHeight / sectionsY * index + chartPaddingTop;

            return (
              <g key={ index }>
                <text className='chart__y-title' textAnchor='end' x='25' y={ y }>
                  { this.maxY - (this.roundYValue * index) }
                </text>
                <line
                  x1={ chartPaddingLeft }
                  y1={ y }
                  x2='100%'
                  y2={ y }
                  stroke='#E6E7E9'
                  strokeWidth='1'
                />
              </g>
            );
          }) }
        </svg>
        <svg width={ chartWidth } height={ chartHeight } x={ chartPaddingLeft } y={ chartPaddingTop }>
          <polyline
            fill='none'
            stroke='#9ABBD3'
            strokeWidth='2'
            points={ entries.reduce((points, [date, { rate }]) => [
              ...points, `${this.getXByDate(date)},${this.getYByRate(rate)}`
            ], []).join(' ') }
          />
          { hoveredItem.date ?
            <g>
              <Tooltip
                date={ hoveredItem.date }
                rate={ hoveredItem.rate }
                changes={ hoveredItem.changes }
                x={ this.getXByDate(hoveredItem.date) + 140 < chartWidth ?
                  this.getXByDate(hoveredItem.date) :
                  this.getXByDate(hoveredItem.date) - 140
                }
                y={ this.getYByRate(hoveredItem.rate) - 60 <= 0 ?
                  this.getYByRate(hoveredItem.rate) + 7 :
                  this.getYByRate(hoveredItem.rate) - 60
                }
              />
              <line
                x1={ this.getXByDate(hoveredItem.date) }
                y1={ this.getYByRate(hoveredItem.rate) }
                x2={ this.getXByDate(hoveredItem.date) }
                y2='100%'
                stroke='#E6E7E9'
                strokeWidth='1'
                strokeDasharray="5"
              />
              <circle
                r='4'
                cx={ this.getXByDate(hoveredItem.date) }
                cy={ this.getYByRate(hoveredItem.rate) }
                fill='#9ABBD3'
                stroke='#F5F6F7'
                strokeWidth='2'
              />
            </g> : null
          }
          <g>
            { entries.map(([date, { rate }], index) => {
              const prevX = index ? this.getXByDate(dates[index - 1]) : 0;
              const middleX = this.getXByDate(date);
              const nextX = dates[index + 1] ? this.getXByDate(dates[index + 1]) : 0;
              const x = (prevX + middleX) / 2;
              const width = nextX ? ((middleX + nextX) / 2) - x : middleX - x;
              return (
                <rect
                  key={ index }
                  width={ width }
                  height='100%'
                  x={ x }
                  y='0'
                  className='chart__x-section'
                  onMouseEnter={ () => this.hadnleMouseEnter(entries[index]) }
                  onMouseLeave={ this.hadnleMouseLeave }
                />
              );
            }) }
          </g>
        </svg>
        <svg width={ chartWidth } x={ chartPaddingLeft } y={ chartHeight + chartPaddingTop + 10 }>
          { Array(12).fill(0).map((item, index) =>
            <text
              key={ index }
              className='chart__x-title'
              textAnchor='middle'
              x={ chartWidth / 12 * index + chartWidth / 24 }
              y='1em'
            >
              { moment().month(index).format('MMMM') }
            </text>
          ) }
        </svg>
        <text
          className='chart__year'
          textAnchor='start'
          x='50'
          y='270'
        >
          { year }
        </text>
      </svg>
    );
  }
}
