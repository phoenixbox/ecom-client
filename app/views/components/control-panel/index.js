import React from 'react/addons';
import EventList from './event-list.js';
import CustomerList from './customer-list.js';
import ListControls from './list-controls';
import RadiusSlider from './radius-slider';
import _ from 'lodash';

let ControlPanel = React.createClass({
  propTypes: {
    customers: React.PropTypes.array,
    sortedCustomers: React.PropTypes.array,
    origin: React.PropTypes.shape({
      latitude: React.PropTypes.number,
      longitude: React.PropTypes.number,
    }),
    radius: React.PropTypes.number,
    updateRadius: React.PropTypes.func,
    sortBy: React.PropTypes.oneOf(['id', 'distance']),
    showAll: React.PropTypes.bool,
    sortOrder: React.PropTypes.oneOf(['asc', 'desc']),
    updateControl: React.PropTypes.func
  },

  render() {
    return (
      <div className="control-panel row">
        <EventList user={this.props.user} />
        <RadiusSlider value={this.props.radius}
               updateRadius={this.props.updateRadius} />
        <ListControls sortOrder={this.props.sortOrder}
                         sortBy={this.props.sortBy}
                  updateControl={this.props.updateControl}
                         radius={this.props.radius}
                        showAll={this.props.showAll} />
        <CustomerList customers={this.props.customers}
                sortedCustomers={this.props.sortedCustomers}
                      sortOrder={this.props.sortOrder}
                         sortBy={this.props.sortBy}
                      showAll={this.props.showAll}
                         origin={this.props.origin}
                         radius={this.props.radius} />
      </div>
    )
  }
})

export default ControlPanel;
