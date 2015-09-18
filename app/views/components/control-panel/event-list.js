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
  },

  componentWillReceiveProps(nextProps) {
    // If its receiving the user for the first time
    let nextUser = nextProps.user;
    if (_.isEmpty(this.props.user) && nextUser && nextUser.access_token) {
      EventsActions.init(nextUser);
    }
  },

  componentWillUnmount() {
    EventsStore.removeChangeListener(this._onChange)
  },

  buildEvents() {
    let events = this.state.events;

    if (events.length) {
      let eventNodes = _.map(events, (event, i) => {
        return (
          <li key={i} className="col-xs-12 col-sm-6"><EventCard {...event} /></li>
        )
      })

      return (
        <ul className="list">
          {eventNodes}
        </ul>
      )
    }
  },

  content() {
    if (this.state.loading) {
      return [
        <Spinner />,
        <div className="loading-message">Loading Events</div>
      ]
    } else {
      return this.buildEvents()
    }
  },

  render() {
    return (
      <div className="event-list col-xs-12">
        <div className="panel-section-header">Event List</div>
        <div className="panel-section-sep"></div>
        {this.content()}
      </div>
    )
  },

  _onChange() {
    this.setState(internals.getStateFromStores());
  }
})

export default EventList
