import React from 'react/addons';
import {MAPBOX_KEY} from '../../../config';
import PinColors from './pin-colors.js';
import _ from 'lodash';

const INTERCOM_HQ = {
  latitude: 53.338484,
  longitude: -6.2564565
};
const DEFAULT_ZOOM_LEVEL = 8

let Tile = React.createClass({

  propTypes: {
    customers: React.PropTypes.array
  },

  componentDidMount() {
    L.mapbox.accessToken = MAPBOX_KEY;
    this.map = L.mapbox.map('map', 'mapbox.streets')
                       .setView([INTERCOM_HQ.latitude, INTERCOM_HQ.longitude], DEFAULT_ZOOM_LEVEL);
    this.addMarker(INTERCOM_HQ.latitude, INTERCOM_HQ.longitude, PinColors.intercom)
    this.setCustomerPins(this.props.customers)
  },

  setCustomerPins(customers) {
    _.each(customers, (cust) => {
      this.addMarker(cust.latitude, cust.longitude, PinColors.customer)
    })
  },

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.customers, nextProps.customers)) {
      this.setCustomerPins(nextProps.customers);
    }
  },

  addMarker(lat, long, color) {
    L.marker([lat, long], {
        icon: L.mapbox.marker.icon({
          'marker-color': color
        }),
        draggable: false
    }).addTo(this.map);
  },

  render() {
    return (
      <div className="tile col-xs-12">
        <div id='map'></div>
      </div>
    )
  }
})

export default Tile
