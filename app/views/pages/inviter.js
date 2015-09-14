// Deps
import classnames from 'classnames';
import React from 'react/addons';
import {Navigation} from 'react-router';

// Components
import Spinner from 'react-spinner';
import Map from '../components/map'
import ControlPanel from '../components/control-panel'

// Flux
import FacebookStore from '../../stores/facebook-store.js';
import SessionActions from '../../actions/session-actions.js';

let internals = {
  getStateFromStores() {
    return {
      loading: FacebookStore.isLoading()
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
          <div className="col-xs-3 full-height">
            <ControlPanel user={this.props.user} />
          </div>
          <div className="col-xs-9 full-height">
            <Map />
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
