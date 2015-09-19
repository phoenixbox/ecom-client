import React from 'react/addons';
import helpers from '../helpers.js';
import _ from 'lodash';
import CustomerNode from './customer-node.js';

function maxHeight() {
  // shim for dynamic height setting
  let app = document.getElementsByClassName('app')[0];
  let list = document.getElementsByClassName('event-list')[0];
  let slider = document.getElementsByClassName('radius-slider')[0];
  let header = document.getElementsByClassName('navbar')[0];
  let controls = document.getElementsByClassName('list-controls')[0];

  if (app && header && slider && list) {
    return app.getBoundingClientRect().height
           - header.getBoundingClientRect().height
           - list.getBoundingClientRect().height
           - slider.getBoundingClientRect().height
           - controls.getBoundingClientRect().height;
           - 25;
  } else {
    return 0;
  }
}

let CustomerList = React.createClass({
  propTypes: {
    customers: React.PropTypes.array,
    sortedCustomers: React.PropTypes.array,
    sortOrder: React.PropTypes.oneOf(['asc', 'desc']),
    sortBy: React.PropTypes.oneOf(['id', 'distance']),
    showAll: React.PropTypes.bool,
    origin: React.PropTypes.shape({
      latitude: React.PropTypes.number,
      longitude: React.PropTypes.number
    }),
    radius: React.PropTypes.number
  },

  customerNodes() {
    let customers = this.props.sortedCustomers;

    if (!this.props.showAll) {
      customers = helpers.filterByRange(customers, this.props.radius)
    }
    customers = _.sortByOrder(customers, [this.props.sortBy], [this.props.sortOrder])

    return _.map(customers, (sortedCust, i) => {
      let customer = _.find(this.props.customers, {user_id: sortedCust.id})
      let outsideRadius = sortedCust.distance > this.props.radius;

      return (
        <li key={i}>
          <CustomerNode key={i}
                      index={i}
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
