import { select } from 'd3-selection';
import * as d3 from 'd3'
class Line {

  create = (el, data, configuration = { height: 600, width: 400, scale: 10, individualBarWidth: 40, fillColor: 'blue' }) => {

    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    const height = configuration.height - margin.top - margin.bottom;
    const width = configuration.width - margin.left - margin.right;
    const scale = configuration.scale;

    console.log(data, "conf", configuration)

    const svgElement = select(el)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
     
    // need to plot line graph
         
    return svgElement
  };

  update = (el, data, configuration = {}, chart) => {
    // const container = select(el);

    // validateContainer(container);
    // validateConfiguration(chart, configuration);
    // applyConfiguration(chart, configuration);

    // // Calls the chart with the container and dataset
    // if (data) {
    //     container.datum(data).call(chart);
    // } else {
    //     container.call(chart);
    // }

    // return chart;
  };

  destroy = () => { };


}

export default new Line()