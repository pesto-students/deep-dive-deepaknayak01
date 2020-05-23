import React from 'react';
import './App.css';
import LineChart from './charts/line/line-chart';

import BarChart from './charts/bar/bar-chart';

import { generateLineGraphData ,generateBarGraphData} from './utils'

function App()  {
  return (
    <div className="App">
      { <LineChart data={generateLineGraphData()}  height= {600} width ={400}  margin= {{ top: 30, right: 10, bottom: 20, left: 50} }/>
      }
      <BarChart data={generateBarGraphData()} color={'green'} margin = {{top: 20, right: 10, bottom: 20, left: 50}} width={600} height={600} scale={30} />

    </div>
  );
}

export default App;
