import React, { Component } from "react"
import * as d3 from "d3"

class Child2 extends Component {
  constructor(props) {
    super(props)
    this.svgRef = React.createRef()
  }

  componentDidMount() {
    this.renderBar();
  }

  componentDidUpdate(){
    this.renderBar()
  }
  
  renderBar() {
    const data = this.props.data2;

    const averageTipsByDay = data.reduce((acc, curr) => {
      if (!acc[curr.day]) {
        acc[curr.day] = { day: curr.day, totalTip: 0, count: 0 };
      }
      acc[curr.day].totalTip += curr.tip;
      acc[curr.day].count += 1;
      return acc;
    }, {});

    const chartData = Object.values(averageTipsByDay)
      .map(item => ({
        day: item.day,
        avgTip: (item.totalTip / item.count).toFixed(2),
      }))

    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const w = 500 - margin.left - margin.right;
    const h = 300 - margin.top - margin.bottom;

    const svg = d3.select(this.svgRef.current)
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x_scale = d3.scaleBand()
      .domain(chartData.map(d => d.day))
      .range([0, w])
      .padding(0.2);

    const y_scale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.avgTip)])
      .range([h, 0]);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y_scale));

    g.append("text")
      .attr("class", "x-label")
      .attr("x", w / 2)
      .attr("y", h+margin.bottom/2 + 10)
      .attr('style', 'font-weight:bold')
      .text("Day");

    g.append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -35) 
      .attr("x", -h / 2)
      .attr('style', 'font-weight:bold')
      .text("Average Tip");

    svg.append("text")
      .attr("x", 200)
      .attr("y", 15)
      .attr('style', 'font-weight:bold')
      .text("Average Tips by Day");

    g.selectAll(".bar")
      .data(chartData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x_scale(d.day))
      .attr("y", d => y_scale(d.avgTip))
      .attr("width", x_scale.bandwidth())
      .attr("height", d => h - y_scale(d.avgTip))
      .style("fill", "#69b3a2");
  }

  render() {
    return <svg ref={this.svgRef} />;
  }
}

export default Child2;