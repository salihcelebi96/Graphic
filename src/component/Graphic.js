import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';


const PieChartComponent = () => {
    const { totalShot, successShot,unSuccessShot} = useSelector((state) => state.pieChart);
    
    

  const chartRef = useRef(null);

  useEffect(() => {
    const data = [
      { label: 'Successful Shots', value:(successShot / totalShot) * 100 },
      { label: 'Unsuccessful Shots', value:(unSuccessShot / totalShot) * 100 },
    ];

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const slices = svg
      .selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    const labels = svg
      .selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle') 
      .text((d) => `${d.data.label}: ${(d.data.value ).toFixed(2)}%`);

    return () => {
      // SVG temizleme
      d3.select(chartRef.current).selectAll('svg').remove();
    };
  }, [successShot, unSuccessShot]);

  return <div className='flex justify-center mb-5 h-screen bg-gray-600 items-center' ref={chartRef}></div>;
};

export default PieChartComponent;