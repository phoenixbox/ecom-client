import React from 'react/addons';
import ReactSlider from 'react-slider';

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
      step: 5,
      value: 100
    };
  },

  render() {
    let value = [this.props.min, this.props.value, this.props.max];

    return (
      <div className="col-xs-12 radius-slider">
        <ReactSlider defaultValue={100}
                      value={value}
                       min={this.props.min}
                       max={this.props.max}
                      step={this.props.step}
                  onChange={this.props.updateRadius}
                  withBars={true} >
          <span className="handle-value">{`${this.props.value} km`}</span>
        </ReactSlider>
      </div>
    )
  }
});

export default RadiusSlider;
