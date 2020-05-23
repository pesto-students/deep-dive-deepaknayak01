import React, { Component } from 'react';
import bar from './bar';

class BarChart extends Component {

  static defaultProps = {
    chart: bar,
    height: 600, width: 400, scale: 10,
    color: 'blue',
    margin: { top: 30, right: 0, bottom: 30, left: 40 }
  }

  constructor(props) {
    super(props);
    //TODO: validate props types
    this.setRef = this.setRef.bind(this);
    this.updateData = this.updateData.bind(this);
    this.state = { update: false, data: this.props.data }
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this._chart) {
      this.createChart();
    } else {
      this.updateChart();
    }
  }

  componentWillUnmount() {
    this.props.chart.destroy(this.rootNode);
  }

  createChart() {
    this._chart = this.props.chart.create(
      this.rootNode,
      this.state.data,
      this.getChartConfig()
    );
  }

  updateChart() {
    console.log("update", this._chart)
    this.props.chart.update(
      this.rootNode,
      this.state.data,
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
    this.setState({ data: [{ "name": "5", "value": 5 }, { "name": "2", "value": 10 }, { "name": "7", "value": 20 }] })
  }

  render() {
    return (
      <div>
        <button onClick={this.updateData}>Update data</button>
        <div className="bar-container" ref={this.setRef} />
      </div>
    );
  }
}

export default BarChart;
