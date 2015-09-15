import AppDispatcher from '../dispatchers/dispatcher';
import {EventEmitter} from 'events';
import CustomerConstants from '../constants/customer-constants';
import _ from 'lodash';

let _customers = [];
let _isLoading = false;

let CustomerStore = _.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  getCustomers() {
    return _customers;
  },

  isLoading() {
    return _isLoading;
  },

  setLoading(state) {
    _isLoading = state;

    this.emitChange();
  }
});

let internals = CustomerStore.internals = {
  init(customers) {
    _customers = customers;

    CustomerStore.setLoading(false);
  }
}

CustomerStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case CustomerConstants.EVENT_INIT:
      internals.init(action.data);
      break;
    case CustomerConstants.EVENT_ERR:
      console.log('ERR: ', action.err)
      break;
    default:
      break;
  }
});

export default CustomerStore;
