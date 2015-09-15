var Confidence = require('confidence');

var ServerConfig = {
  api: {
    events: "/v1/events",
    customers: "/v1/customers"
  }
}

var store = new Confidence.Store(ServerConfig);

module.exports = store;
