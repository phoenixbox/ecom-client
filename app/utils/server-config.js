var Confidence = require('confidence');

var ServerConfig = {
  api: {
    events: "/v1/events"
  }
}

var store = new Confidence.Store(ServerConfig);

module.exports = store;
