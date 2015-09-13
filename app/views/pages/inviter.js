import React from 'react/addons';
import {Navigation} from 'react-router';
import Spinner from 'react-spinner';
import FacebookStore from '../../stores/facebook-store.js';
import SessionActions from '../../actions/session-actions.js';
import classnames from 'classnames';

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

  content() {
    return <p>Finished Loading</p>
  },

  render() {
    let inviterClasses = classnames({
      "inviter col-sm-12": true,
      "spinner-visible": this.state.loading
    })

    let content = this.state.loading ? <Spinner /> : this.content();

    return (
      <div className={inviterClasses}>
        {content}
        <div className="col-xs-3">Control Panel</div>
        <div className="col-xs-9">Map</div>
      </div>
    );
  },

  _onChange() {
    return this.setState(internals.getStateFromStores())
  }
})

export default Inviter;
