import React from 'react/addons';
import _ from 'lodash';
import EventsStore from '../../../stores/event-store.js';
import EventsActions from '../../../actions/event-actions.js';
import Spinner from 'react-spinner';
import EventCard from './event-card.js'

let internals = {
  getStateFromStores() {
    return {
      loading: EventsStore.isLoading(),
      events: EventsStore.getEvents()
    }
  }
}

let EventList = React.createClass({
  getInitialState() {
    return internals.getStateFromStores();
  },

  componentDidMount() {
    EventsStore.addChangeListener(this._onChange)
    EventsActions.init(this.props.user);
  },

  componentWillUnmount() {
    EventsStore.removeChangeListener(this._onChange)
  },

  buildEvents() {
    let events = this.state.events;

    if (events.length) {
      let events = _.map(events, (e, i) => {
        return <li className="col-xs-6"><EventCard event={e} /></li>
      })

      return (
        <ul className="list">
          {events}
        </ul>
      )
    }
  },

  render() {
    return (
      <div className="event-list col-xs-12">
        {this.buildEvents()}
      </div>
    )
  },

  _onChange() {
    this.setState(internals.getStateFromStores());
  }
})

export default EventList
