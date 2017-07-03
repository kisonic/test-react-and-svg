import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';
import numeral from 'numeral';
import 'numeral/locales';

import './Tooltip.css';

moment.locale('ru');
numeral.locale('ru');

export default class Tooltip extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    changes: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  render() {
    const { date, rate, changes, x, y } = this.props;

    return (
      <foreignObject x={ x } y={ y } width='140' height='60'>
        <div className='tooltip'>
          <div className='tooltip__date'>{ moment(date).format('DD MMMM YYYY') }</div>
          <div>
            <span className='tooltip__rate'>$ { numeral(rate).format('0,0[.]00') }</span>
            { changes > 0 ?
              <span className='tooltip__green'>
                <span className='tooltip__small'>&#9650;</span> { numeral(changes).format('0,0[.]00') }
              </span> :
              changes ?
                <span className='tooltip__red'>
                  <span className='tooltip__small'>&#9660;</span> { numeral(changes).format('0,0[.]00') }
                </span> : null
            }
          </div>
        </div>
      </foreignObject>
    );
  }
}
