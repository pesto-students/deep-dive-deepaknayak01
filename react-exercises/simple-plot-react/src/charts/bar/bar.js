import { select } from 'd3-selection';

class Bar {

  create = (el, data, configuration = { height: 600, width: 400, scale: 10, individualBarWidth: 40, fillColor: 'blue' }) => {
    
    const height = configuration.height;
    const width = configuration.width;
    const scale = configuration.scale;

    const svgElement = select(el)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black")

    svgElement.selectAll("rect")
      .data(data).enter()
      .append("rect")
      .attr("width", configuration.individualBarWidth)
      .attr("height", (datapoint) => datapoint * scale)
      .attr("fill", configuration.fillColor)
      .attr("x", (datapoint, iteration) => iteration * 45)
      .attr("y", (datapoint) => height - datapoint * scale)

    svgElement.selectAll("text")
      .data(data).enter()
      .append("text")
      .attr("x", (datapoint, i) => i * 45 + 10)
      .attr("y", (datapoint, i) => height - datapoint * scale - 10)
      .text(datapoint => datapoint)

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

export default new Bar()