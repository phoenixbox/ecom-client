import React from 'react/addons';
import _ from 'lodash';
import moment from 'moment';
import classnames from 'classnames';

let EventCard = React.createClass({
  propTypes: {
    occasion: React.PropTypes.string,
    invited_count: React.PropTypes.number,
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

    return moment().set(time).format('ll');
  },

  eventStatus() {
    if (this.props.cancelled) {
      return <div className="event-state">cancelled</div>
    }
  },

  render() {
    let stripeClasses = classnames({
      'stripe': true,
      'cancel': this.props.cancelled
    })

    return (
      <div className="event-card">
        <div className={stripeClasses}></div>
        <div className="content">
          <div className="title">{this.props.occassion}</div>
          <div className="invited-count">{`Invite Count: ${this.props.invited_count}`}</div>
          {this.eventStatus()}
          <div className="timestamp">{this.timestamp()}</div>
        </div>
      </div>
    )
  }
})

export default EventCard
