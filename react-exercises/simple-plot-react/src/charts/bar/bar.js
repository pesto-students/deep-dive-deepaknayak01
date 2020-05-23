import { select } from 'd3-selection';
import * as d3 from 'd3'
class Bar {

  yScale = (data, { margin, height }) => {
    return d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top])
  }
  xScale = (data, { margin, width }) => {
    return d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1)

  }


  create = (el, data, configuration, chart) => {

    const margin = configuration.margin
    const height = configuration.height;
    const width = configuration.width;
    const color = configuration.color

    const svg = select(el)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black")

    const yScale = this.yScale(data, { margin, height })
    const xScale = this.xScale(data, { margin, width })


    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(null, data.format))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", - margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y))

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(i => data[i].name).tickSizeOuter(0))

    svg.append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d.value))
      .attr("height", d => yScale(0) - yScale(d.value))
      .attr("width", xScale.bandwidth());

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
    return svg;
  };

  update = (el, data, configuration, chart) => {
    // Calls the chart with the container and dataset

    const margin = configuration.margin
    const height = configuration.height;
    const width = configuration.width;
    const color = configuration.color

    const yScale = this.yScale(data, { margin, height })
    const xScale = this.xScale(data, { margin, width })


    if (data && chart) {

      const rects = chart
        .selectAll("rect")
        .data(data);

      // enter selection
      rects
        .enter().append("rect");

      // update selection
      rects
        .transition()
        .duration(300)
        .attr("y", d => yScale(d.value))
        .attr("height", d => yScale(0) - yScale(d.value))

      // exit selection
      rects
        .exit().remove();


      // modify text
       chart
        .selectAll("text")
        .remove()
        .selectAll("line")
        .remove()
        .selectAll("g .tick")
        .remove()

        const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(null, data.format))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick").remove())
        .call(g => g.append("text")
          .attr("x", - margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(data.y))
  
      const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(i => data[i].name).tickSizeOuter(0))
  

    chart.append("g")
      .call(xAxis);

    chart.append("g")
      .call(yAxis);
      

    } else {
      return this.create(el, data, configuration, undefined)
    }
  };

  destroy = () => { };


}

export default new Bar()