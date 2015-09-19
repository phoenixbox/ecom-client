import React from 'react/addons';
import {MAPBOX_KEY} from '../../../config';
import PinColors from './pin-colors.js';
import MapHelpers from './helpers.js';
import _ from 'lodash';

const INTERCOM_HQ = {
  latitude: 53.338484,
  longitude: -6.2564565
};
const INTERCOM_BLUE = '#449AE6';
const DEFAULT_ZOOM_LEVEL = 8

let Tile = React.createClass({

  propTypes: {
    customers: React.PropTypes.array,
    sortedCustomers: React.PropTypes.array,
    radius: React.PropTypes.number
  },

  getInitialState() {
    return {
      markers: []
    }
  },

  componentDidMount() {
    L.mapbox.accessToken = MAPBOX_KEY;
    this.map = L.mapbox.map('map', 'mapbox.streets')
                       .setView([INTERCOM_HQ.latitude, INTERCOM_HQ.longitude], DEFAULT_ZOOM_LEVEL);
    this.customerLayer = L.mapbox.featureLayer().addTo(this.map);
    this.addMarker(INTERCOM_HQ.latitude, INTERCOM_HQ.longitude, PinColors.intercom)
    this.addCircle();
    this.setCustomerPins(this.props.customers, this.props.sortedCustomers, this.props.radius)
  },

  setCustomerPins(customers, sortedCustomers, radius) {
    let geoJson = MapHelpers.buildGeoJson(customers, sortedCustomers, radius)
    this.customerLayer.setGeoJSON(geoJson);
  },

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.customers, nextProps.customers) || !_.isEqual(this.props.sortedCustomers, nextProps.sortedCustomers)) {
      this.setCustomerPins(nextProps.customers, nextProps.sortedCustomers, nextProps.radius);
    } else if (this.props.radius != nextProps.radius) {
      this.radiusCircle.setRadius(MapHelpers.kmRadius(nextProps.radius));
      this.setCustomerPins(nextProps.customers, nextProps.sortedCustomers, nextProps.radius);
    }
  },

  addCircle() {
    let circleOptions = {
      stroke:	true,
      color: INTERCOM_BLUE,
      weight: 3,
      opacity: 1,
      fill:	true,
      fillColor: INTERCOM_BLUE,
      fillOpacity: 0.5
    }
    this.radiusCircle = L.circle( [INTERCOM_HQ.latitude, INTERCOM_HQ.longitude],
      MapHelpers.kmRadius(this.props.radius),
      circleOptions
    ).addTo(this.map);
  },

  addMarker(lat, long, color) {
    let marker = L.marker([lat, long], {
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
