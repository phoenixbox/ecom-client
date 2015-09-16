// Deps
import classnames from 'classnames';
import React from 'react/addons';
import {Navigation} from 'react-router';
import _ from 'lodash';

// Components
import Spinner from 'react-spinner';
import Map from '../components/map';
import ControlPanel from '../components/control-panel';
import helpers from '../components/helpers';

// Flux
import FacebookStore from '../../stores/facebook-store.js';
import CustomerStore from '../../stores/customer-store.js';
import CustomerActions from '../../actions/customer-actions.js';
import SessionActions from '../../actions/session-actions.js';

const INTERCOM_HQ = {
  latitude: 53.339374,
  longitude: -6.257495
}
const RADIUS = 100;

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
    return _.assign({
      origin: INTERCOM_HQ,
      radius: RADIUS,
      sortOrder: 'asc'
    }, internals.getStateFromStores());
  },

  signOut() {
    SessionActions.logout();
  },

  updateRadius(val) {
    // @{val} - array - [min,val,max]
    this.setState({radius: val[1]})
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
    /*
     Fetch customers when we have a logged in session access_token
    */
    let nextUser = nextProps.user;
    if (_.isEmpty(this.props.user) && nextUser && nextUser.access_token) {
      CustomerActions.init(nextUser);
    }
  },

  componentDidUpdate(prevProps, prevState) {
    let existingCustIds = _.map(prevState.customers,(cust) => {return cust.user_id})
    let newCustIds = _.map(this.state.customers,(cust) => {return cust.user_id})
    let sameMembers = _.isEmpty(_.xor(existingCustIds, newCustIds));

    if (!sameMembers) {
      let sortedCustomers = helpers.sortByDistanceWithOrder(this.state.customers, this.state.origin, this.state.sortOrder)
      this.setState({sortedCustomers: sortedCustomers})
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
            <ControlPanel user={this.props.user}
                     customers={this.state.customers}
               sortedCustomers={this.state.sortedCustomers}
                        origin={this.state.origin}
                        radius={this.state.radius}
                        updateRadius={this.updateRadius} />
          </div>
          <div className="col-xs-7 full-height">
            <Map customers={this.state.customers}
           sortedCustomers={this.state.sortedCustomers}
                    origin={this.state.origin}
                    radius={this.state.radius} />
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
