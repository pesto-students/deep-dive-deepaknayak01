import React, { Component } from 'react';
import line from './line';

class LineChart extends Component {

  static defaultProps = {
    chart: line,
    height: 600,
    width: 400, 
    margin: { top: 30, right: 0, bottom: 30, left: 40 },
    stroke : 'red',
    fill : 'none',
    strokeWidth : 1.5
  }

  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.updateData = this.updateData.bind(this);
    this.state = { update: false }
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
    this.props.chart.destroy(this._chart);
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

  updateData() {
    console.log("click")
    // this.props.data = [5,8,9,6,5,30,9]
    console.log(this.props.data, "ljkkjk")
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.updateData}>Update data</button> */}
        <div className="line-container" ref={this.setRef} />
      </div>
    );
  }
}

export default LineChart;
