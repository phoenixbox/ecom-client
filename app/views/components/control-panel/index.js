import React from 'react/addons';
import EventForm from './event-form.js';
import EventList from './event-list.js';
import CustomerList from './customer-list.js';
import RadiusSlider from './radius-slider';
import _ from 'lodash';

let ControlPanel = React.createClass({
  propTypes: {
    customers: React.PropTypes.array,
    origin: React.PropTypes.shape({
      latitude: React.PropTypes.number,
      longitude: React.PropTypes.number,
    }),
    radius: React.PropTypes.number,
    updateRadius: React.PropTypes.func
  },

  getInitialState() {
    return {
      sortOrder: 'asc'
    }
  },

  render() {
    return (
      <div className="control-panel row">
        <EventForm />
        <EventList user={this.props.user} />
        <RadiusSlider value={this.props.radius}
               updateRadius={this.props.updateRadius} />
        <CustomerList customers={this.props.customers}
                      sortOrder={this.state.sortOrder}
                         origin={this.props.origin}
                         radius={this.props.radius} />
      </div>
    )
  }
})

export default ControlPanel;
