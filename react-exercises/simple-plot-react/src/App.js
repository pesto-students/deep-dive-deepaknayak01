import React from 'react';
import './App.css';
import LineChart from './charts/line/line-chart';

import BarChart from './charts/bar/bar-chart';

import { generateLineGraphData } from './utils'

function App()  {
  return (
    <div className="App">
      { <LineChart data={generateLineGraphData()} />
      }
      <BarChart data={[2, 4, 6, 8, 10, 14, 20, 5, 2]} fillColor={'grey'} individualBarWidth={40} width={700} height={500} scale={20} />

    </div>
  );
}

export default App;
