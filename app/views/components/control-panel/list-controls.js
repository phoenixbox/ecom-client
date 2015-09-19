import React from 'react/addons';
import _ from 'lodash';
import classnames from 'classnames';

let ListControls = React.createClass({
  propTypes: {
    sortBy: React.PropTypes.oneOf(['id', 'distance']),
    showAll: React.PropTypes.bool,
    sortOrder: React.PropTypes.oneOf(['asc', 'desc']),
    radius: React.PropTypes.number,
    updateControl: React.PropTypes.func
  },

  render() {
    let allClasses = classnames({ 'btn': true, 'active': this.props.showAll });
    let matchesClasses = classnames({ 'btn': true, 'active': !this.props.showAll })

    let idButtonClasses = classnames({ 'btn': true, 'active': this.props.sortBy === 'id' });
    let distanceClasses = classnames({ 'btn': true, 'active': this.props.sortBy === 'distance' })

    let ascClasses = classnames({ 'btn': true, 'active': this.props.sortOrder === 'asc' });
    let descClasses = classnames({ 'btn': true, 'active': this.props.sortOrder === 'desc' })

    return (
      <div className="list-controls col-xs-12">
        <div className="col-xs-4 show-control">
          <label>Show customers:</label>
          <div className="btn-group" role="group">
            <button className={allClasses} onClick={_.partial(this.props.updateControl, 'showAll', true)}>All</button>
            <button className={matchesClasses} onClick={_.partial(this.props.updateControl, 'showAll', false)}>{`Within ${this.props.radius}km`}</button>
          </div>
        </div>
        <div className="col-xs-4 filter-control">
          <label>Sort by:</label>
          <div className="btn-group" role="group">
            <button className={idButtonClasses} onClick={_.partial(this.props.updateControl, 'sortBy', 'id')}>ID</button>
            <button className={distanceClasses} onClick={_.partial(this.props.updateControl, 'sortBy', 'distance')}>Distance</button>
          </div>
        </div>
        <div className="col-xs-4 sort-control">
          <label>Order by:</label>
          <div className="btn-group" role="group">
            <button className={ascClasses} onClick={_.partial(this.props.updateControl, 'sortOrder', 'asc')}>Asc</button>
            <button className={descClasses} onClick={_.partial(this.props.updateControl, 'sortOrder', 'desc')}>Desc</button>
          </div>
        </div>
      </div>
    )
  }
})

export default ListControls;
