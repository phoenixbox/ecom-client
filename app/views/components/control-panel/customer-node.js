import React from 'react/addons';
import classnames from 'classnames';
import _ from 'lodash'

let CustomerNode = React.createClass({
  propTypes: {
    index: React.PropTypes.number,
    name: React.PropTypes.string,
    user_id: React.PropTypes.number,
    latitude: React.PropTypes.string,
    longitude: React.PropTypes.string,
    distance: React.PropTypes.number,
    outsideRadius: React.PropTypes.bool
  },

  render() {
    let indexClasses = classnames({
      'index': true,
      'outside': this.props.outsideRadius
    })
    let lat = _.round(this.props.latitude, 4);
    let long = _.round(this.props.longitude, 4);

    return (
      <div className="customer-node">
        <div className={indexClasses}>{this.props.index+1}</div>
        <div className="col-xs-1 user-id">{`ID: ${this.props.user_id}`}</div>
        <div className="col-xs-6 col-sm-7 name">{this.props.name}</div>
        <div className="col-xs-4 location hidden-xs">
          <div className="row">
            <div className="col-xs-6 lat">{`Lat: ${lat}`}</div>
            <div className="col-xs-6 long">{`Long: ${long}`}</div>
          </div>
        </div>
        <div className="distance">{`${this.props.distance}km away`}</div>
      </div>
    )
  }
})

export default CustomerNode;
