import { select } from 'd3-selection';
import * as d3 from 'd3'
class Bar {

  create = (el, data, configuration ) => {

    
    const margin = configuration.margin
    const height = configuration.height;
    const width = configuration.width;
    const color = configuration.color

    let y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top])

    let x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    let yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", - margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y))

    let xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))

    const svg = select(el)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black")

    svg.append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    return svg;
  };

  update = (el, data, configuration = {}, chart) => {

    const container = select(el);


    console.log("in update".chart)

    // Calls the chart with the container and dataset
    if (data && chart) {

      const svgElement = (el)

      svgElement.selectAll("rect")
        .data(data)
        .enter()
        .exit().remove()

      svgElement.selectAll("text")
        .data(data)
        .enter()
        .exit().remove()

      return svgElement

    } else {
      return chart;
    }

  };

  destroy = () => { };


}

export default new Bar()