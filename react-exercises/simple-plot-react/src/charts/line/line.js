import { select } from 'd3-selection';
import * as d3 from 'd3'
class Line {

  create = (el, data, configuration ) => {

    const margin = configuration.margin
    const stroke = configuration.stroke;
    const fill = configuration.fill;
    const strokeWidth = configuration.strokeWidth;
    const width = configuration.width
    const height = configuration.height

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([margin.left, width - margin.right])
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([height - margin.bottom, margin.top])

    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))

    const xAxis = g => g
      .attr("transform", `translate(0,${height - 20})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    
    let yAxis = g => g
      .attr("transform", `translate(30 ,0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y)
      );

    const svgElement = select(el)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black")

    svgElement.append("g")
      .call(xAxis);

    svgElement.append("g")
      .call(yAxis);
    
    svgElement.append("path")
      .attr("fill", fill)
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line(data));

    return svgElement;
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