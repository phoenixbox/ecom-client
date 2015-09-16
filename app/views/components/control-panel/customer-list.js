import React from 'react/addons';
import helpers from '../helpers.js';
import _ from 'lodash';
import CustomerNode from './customer-node.js';

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
      <ul className="customer-list">
        {this.customerNodes()}
      </ul>
    )
  }
})

export default CustomerList;
