import React, {Component} from "react"
class LineChart extends Component {
  render() {
    console.log('data: ', this.props.data);
    return (
      <div></div>
    );
  }
}
LineChart.defaultProps = {
  data: [],  
  color: '#2196F3',  
  height: 300,  
  width: 700
}
export default React.memo(LineChart);