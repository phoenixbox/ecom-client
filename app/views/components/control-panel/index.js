import React from 'react/addons';
import EventForm from './event-form.js';
import EventList from './event-list.js';

let ControlPanel = React.createClass({
  render() {
    return (
      <div className="control-panel row">
        <EventForm />
        <EventList user={this.props.user} />
      </div>
    )
  }
})

export default ControlPanel;
