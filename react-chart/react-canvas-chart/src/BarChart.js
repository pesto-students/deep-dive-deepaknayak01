import React, {Component} from "react"
class BarChart extends Component {
  render() {
    console.log('data: ', this.props.data);
    return (
      <div></div>
    );
  }
}
BarChart.defaultProps = {
  data: [],  
  color: '#2196F3',  
  height: 300,  
  width: 700
}
export default BarChart;