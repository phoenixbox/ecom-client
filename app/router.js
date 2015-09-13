import React from 'react/addons';
import Router, { Route, DefaultRoute } from 'react-router';
import App from './views/app';
import Inviter from './views/pages/inviter.js';

var routes = (
  <Route handler={App}>
    <Route name="inviter" handler={Inviter} />
    <DefaultRoute handler={Inviter} />
  </Route>
);

export default function() {
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler/>, document.getElementById('eventercom'));
  });
}
