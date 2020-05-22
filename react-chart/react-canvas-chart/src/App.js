import React, {Component} from 'react';
import './App.css';
import LineChart from './LineChart';
// import BarChart from './BarChart';

class App extends Component {

  createData() {
    // This function creates data that doesn't look entirely random
    const data = []
    for (let x = 0; x <= 30; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    return data;
  }
  
  render() {
    return (
      <div className="App">
        <LineChart data={this.createData()} />
        {/* <BarChart data={this.createData()} /> */}
      </div>
    );
  }
}

export default App;
