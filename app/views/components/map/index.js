import React from 'react/addons';
import Tile from './tile';
import Filters from './filters';

let Map = React.createClass({
  render() {
    // <Filters />

    return (
      <div className="map row">
        <Tile />
      </div>
    )
  }
})

export default Map;
