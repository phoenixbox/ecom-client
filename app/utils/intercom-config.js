var Confidence = require('confidence');

var IntercomConfig = {
  INTERCOM_HQ: {
    latitude: 53.339374,
    longitude: -6.257495
  },
  RADIUS: 100
}

var store = new Confidence.Store(IntercomConfig);

module.exports = store;
