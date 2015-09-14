import React from 'react/addons';
import _ from 'lodash';
import moment from 'moment';
import classnames from 'classnames';

let EventCard = React.createClass({
  propTypes: {
    occasion: React.PropTypes.string,
    invitedCount: React.PropTypes.number,
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    day: React.PropTypes.number,
    cancelled: React.PropTypes.bool
  },

  timestamp() {
    let time = {
      'year': this.props.year,
      'month': this.props.month,
      'day':this.props.day
    }

    return moment().set(time).format('llll');
  },

  render() {
    let stripeClasses = classnames({
      'stripe': true,
      'col-xs-1': true,
      'cancel': this.props.cancelled
    })

    return (
      <div className="event-card">
        <div className={stripeClasses}></div>
        <div className="content col-xs-11">
          <div className="title">{this.props.occassion}</div>
          <div className="invited-count">{this.props.invitedCount}</div>
          <div className="timestamp">{this.timestamp()}</div>
        </div>
      </div>
    )
  }
})

export default EventCard
