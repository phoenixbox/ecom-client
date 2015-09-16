import React from 'react/addons';
import classnames from 'classnames';

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
    let stripeClasses = classnames({
      'stripe': true,
      'cancel': this.props.outsideRadius
    })

    return (
      <div className="customer-node">
        <div className={stripeClasses}></div>
        <div className="col-xs-1 index">{this.props.index+1}</div>
        <div className="col-xs-5 name">{this.props.name}</div>
        <div className="col-xs-1 user-id">{this.props.user_id}</div>
        <div className="col-xs-3 location">
          <div className="latitude">{`Lat: ${this.props.latitude}`}</div>
          <div className="longitude">{`Long: ${this.props.longitude}`}</div>
        </div>
        <div className="distance">{`${this.props.distance} km`}</div>
      </div>
    )
  }
})

export default CustomerNode;
