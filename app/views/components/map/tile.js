import React from 'react/addons';
import {MAPBOX_KEY} from '../../../config';
import PinColors from './pin-colors.js';
import _ from 'lodash';

const INTERCOM_HQ = {
  latitude: 53.338484,
  longitude: -6.2564565
};
const INTERCOM_BLUE = '#449AE6';
const DEFAULT_ZOOM_LEVEL = 8

let Tile = React.createClass({

  propTypes: {
    customers: React.PropTypes.shape({
      name: React.PropTypes.string,
      latitude: React.PropTypes.string,
      longitude: React.PropTypes.string
    }),
    sortedCustomers: React.PropTypes.shape({
      user_id: React.PropTypes.number,
      distance: React.PropTypes.number
    }),
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
    this.addMarker(INTERCOM_HQ.latitude, INTERCOM_HQ.longitude, PinColors.intercom)
    this.addCircle();
    this.setCustomerPins(this.props.customers)
  },

  setCustomerPins(customers) {
    _.each(customers, (cust) => {
      let color = PinColors.intercom;
      let sortedCust = _.find(this.props.sortedCustomers, {user_id: cust.user_id})

      if (sortedCust) {
        color = sortedCust.distance < radius ? PinColors.inside : PinColors.outside;
      }

      this.addMarker(cust.latitude, cust.longitude, color)
    }, this)
  },

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.customers, nextProps.customers)) {
      this.setCustomerPins(nextProps.customers);
    } else if (this.props.radius != nextProps.radius) {
      this.map.removeLayer(this.radiusCircle);
      this.addCircle();
      _.each(this.state.markers, (m) => {
        this.map.removeLayer(m)
      })

      this.setCustomerPins(nextProps.customers);
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
    let meters = this.props.radius * 1000;
    this.radiusCircle = L.circle( [INTERCOM_HQ.latitude, INTERCOM_HQ.longitude],
      meters,
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
    let markers = _.cloneDeep(this.state.markers)
    markers.push(marker)

    this.setState({markers: markers})
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
