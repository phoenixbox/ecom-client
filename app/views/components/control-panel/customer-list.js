import React from 'react/addons';
import helpers from '../helpers.js';
import _ from 'lodash';
import CustomerNode from './customer-node.js';

function maxHeight() {
  let app = document.getElementsByClassName('app')[0];
  let list = document.getElementsByClassName('event-list')[0];
  let slider = document.getElementsByClassName('radius-slider')[0];
  let header = document.getElementsByClassName('navbar')[0];

  if (app && header && slider && list) {
    return app.getBoundingClientRect().height
           - header.getBoundingClientRect().height
           - list.getBoundingClientRect().height
           - slider.getBoundingClientRect().height;
  } else {
    return 0;
  }
}

let CustomerList = React.createClass({
  propTypes: {
    customers: React.PropTypes.shape({
      name: React.PropTypes.string,
      latitude: React.PropTypes.string,
      longitude: React.PropTypes.string
    }),
    sortedCustomers: React.PropTypes.shape({
      user_id: React.PropTypes.number,
      distance: React.PropTypes.number
    }),
    sortOrder: React.PropTypes.oneOf(['asc', 'desc']),
    origin: React.PropTypes.shape({
      latitude: React.PropTypes.string,
      longitude: React.PropTypes.string
    }),
    radius: React.PropTypes.number
  },

  customerNodes() {
    return _.map(this.props.sortedCustomers, (sortedCust, i) => {
      let customer = _.find(this.props.customers, {user_id: sortedCust.id})
      let outsideRadius = sortedCust.distance > this.props.radius;

      return (
        <li key={i}>
          <CustomerNode index={i}
                        {...customer}
                     distance={sortedCust.distance}
                 outsideRadius={outsideRadius} />
        </li>
      )
    })
  },

  render() {
    return (
      <div className="customer-list" style={{height: `${maxHeight()}px`}}>
        <ul className="list">
          {this.customerNodes()}
        </ul>
      </div>
    )
  }
})

export default CustomerList;
