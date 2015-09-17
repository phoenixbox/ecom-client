import React from 'react/addons';
import Slider from 'react-slider';

let RadiusSlider = React.createClass({
  propTypes: {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    value: React.PropTypes.number,
    updateRadius: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      min: 0,
      max: 300,
      step: 5
    };
  },

  render() {
    return (
      <div className="radius-slider">
        <span className="decrement"> - </span>
        <Slider
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.props.updateRadius}>
          withBars={true}
          <span className="current-value">{`${this.props.value} km`}</span>
        </Slider>
        <span className="increment"> + </span>
      </div>
    )
  }
});

export default RadiusSlider;
