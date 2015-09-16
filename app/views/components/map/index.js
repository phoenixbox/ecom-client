import React from 'react/addons';
import Tile from './tile';
import Filters from './filters';
import _ from 'lodash';

let Map = React.createClass({
  propTypes: {
    customers: React.PropTypes.array,
    sortedCustomers: React.PropTypes.array,
    radius: React.PropTypes.number
  },

  render() {
    return (
      <div className="map row">
        <Tile customers={this.props.customers}
        sortedCustomers={this.props.sortedCustomers}
                 radius={this.props.radius} />
      </div>
    )
  }
})

export default Map;
