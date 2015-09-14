import AppDispatcher from '../dispatchers/dispatcher';
import {EventEmitter} from 'events';
import EventConstants from '../constants/event-constants';
import _ from 'lodash';
import moment from 'moment';

let _eventData = [];
let _isLoading = false;

let EventStore = _.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  getEvents() {
    return _eventData;
  },

  isLoading() {
    return _isLoading;
  },

  setLoading(state) {
    _isLoading = state;

    this.emitChange();
  }
});

let internals = EventStore.internals = {
  init(events) {
    _eventData = events;

    EventStore.setLoading(false);
  }
}

EventStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case EventConstants.EVENT_INIT:
      internals.init(action.data);
      break;
    case EventConstants.EVENT_ERR:
      console.log('ERR: ', action.err)
      break;
    default:
      break;
  }
});

export default EventStore;
