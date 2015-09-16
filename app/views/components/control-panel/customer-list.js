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
    sortOrder: React.PropTypes.oneOf(['asc', 'desc']),
    origin: React.PropTypes.shape({
      latitude: React.PropTypes.string,
      longitude: React.PropTypes.string
    }),
    radius: React.PropTypes.number
  },

  getInitialState() {
    return {
      sortedCustomers: []
    }
  },

  customerNodes() {
    return _.map(this.state.sortedCustomers, (sortedCust, i) => {
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

  componentWillReceiveProps(nextProps) {
    let existingCustIds = _.map(this.props.customers,(cust) => {return cust.user_id})
    let newCustIds = _.map(nextProps.customers,(cust) => {return cust.user_id})
    let sameMembers = _.isEmpty(_.xor(existingCustIds, newCustIds));

    if (!sameMembers) {
      let sortedCustomers = helpers.sortByDistanceWithOrder(nextProps.customers, this.props.origin, this.props.sortOrder)
      this.setState({sortedCustomers: sortedCustomers})
    }
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
