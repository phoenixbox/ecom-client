import React from 'react/addons';
import {MAPBOX_KEY} from '../../../config'

const INTERCOM_HQ = [53.338484, -6.2564565];

let Tile = React.createClass({

  componentDidMount() {
    L.mapbox.accessToken = MAPBOX_KEY;
    var map = L.mapbox.map('map', 'mapbox.streets').setView(INTERCOM_HQ, 16);
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
