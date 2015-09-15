// Deps
import classnames from 'classnames';
import React from 'react/addons';
import {Navigation} from 'react-router';
import _ from 'lodash';

// Components
import Spinner from 'react-spinner';
import Map from '../components/map'
import ControlPanel from '../components/control-panel'

// Flux
import FacebookStore from '../../stores/facebook-store.js';
import CustomerStore from '../../stores/customer-store.js';
import CustomerActions from '../../actions/customer-actions.js';
import SessionActions from '../../actions/session-actions.js';

let internals = {
  getStateFromStores() {
    return {
      loading: FacebookStore.isLoading(),
      customers: CustomerStore.getCustomers()
    }
  }
}

let Inviter  = React.createClass({
  mixins: [Navigation],

  propTypes: {
    user: React.PropTypes.object
  },

  getInitialState() {
    return internals.getStateFromStores();
  },

  signOut() {
    SessionActions.logout();
  },

  componentDidMount() {
    FacebookStore.addChangeListener(this._onChange)
    CustomerStore.addChangeListener(this._onChange)
  },

  componentWillUnmount() {
    FacebookStore.removeChangeListener(this._onChange)
    CustomerStore.removeChangeListener(this._onChange)
  },

  componentWillReceiveProps(nextProps) {
    // If its receiving the user for the first time
    let nextUser = nextProps.user;
    if (_.isEmpty(this.props.user) && nextUser && nextUser.access_token) {
      CustomerActions.init(nextUser);
    }
  },

  render() {
    let inviterClasses = classnames({
      "inviter col-sm-12": true,
      "spinner-visible": this.state.loading
    })

    let content = this.state.loading ? <Spinner /> : null;

    return (
      <div className={inviterClasses}>
        {content}
        <div className="row full-height">
          <div className="col-xs-5 full-height">
            <ControlPanel user={this.props.user} />
          </div>
          <div className="col-xs-7 full-height">
            <Map customers={this.state.customers} />
          </div>
        </div>
      </div>
    );
  },

  _onChange() {
    return this.setState(internals.getStateFromStores())
  }
})

export default Inviter;
