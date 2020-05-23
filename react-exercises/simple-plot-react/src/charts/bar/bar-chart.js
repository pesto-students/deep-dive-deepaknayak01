import React, { Component } from 'react';
import bar from './bar';

class BarChart extends Component {

  static defaultProps = {
    chart: bar,
  }

  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.updateData = this.updateData.bind(this);
    this.state = {update:false,data:this.props.data}
    // this._chart=undefined
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
    console.log("update",this._chart)
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
  updateData(){
    this.setState({data:[5,8,9,6,5,30,9]})
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
