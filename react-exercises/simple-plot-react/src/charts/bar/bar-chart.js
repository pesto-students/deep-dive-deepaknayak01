import React, { Component } from 'react';
import bar from './bar';

class BarChart extends Component {

  static defaultProps = {
    chart: bar,
  }

  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this._createChart();
  }

  componentDidUpdate() {
    if (!this._chart) {
      this._createChart();
    } else {
      this._updateChart();
    }
  }

  componentWillUnmount() {
    this.props.chart.destroy(this.rootNode);
  }

  _createChart() {
    this._chart = this.props.chart.create(
      this.rootNode,
      this.props.data,
      this.getChartConfig()
    );
  }

  _updateChart() {
    this.props.chart.update(
      this.rootNode,
      this.props.data,
      this.getChartConfig(),
      this._chart
    );
  }

  getChartConfig() {
    const configuration = { ...this.props };
    delete configuration['data']
    return configuration;
  }

  setRef(node) {
    this.rootNode = node;
  }

  render() {
    return (
      <div className="bar-container" ref={this.setRef} />
    );
  }
}

export default BarChart;
