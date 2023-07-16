import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';

const StoragePage = () => {
  const chartRef = useRef(null);
  const [chartNames, setChartNames] = useState([]);
  const [isNull, setIsNull] = useState(false);

  const fetchDataFromLocalStorage = () => {
    const localStorageData = JSON.parse(localStorage.getItem('savedData'));
    console.log(localStorageData);

    // SVG cleanup
    d3.select(chartRef.current).selectAll('svg').remove();

    if (!localStorageData) {
      const chartContainer = d3
        .select(chartRef.current)
        .append('div')
        .attr('class', 'chart-container');

      chartContainer
        .append('div')
        .attr('class', 'chart-row')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .style('font-size', '4rem')
        .style('text-align', 'center') 
        
        .text('NULL');

      setIsNull(true); // Set the isNull state to true

      return;
    }

    setIsNull(false); // Set the isNull state to false

    // Get the number of items in localStorageData
    const itemCount = Object.keys(localStorageData).length;

    // Calculate the number of rows needed for the charts
    const numRows = Math.ceil(itemCount / 2);

    // Create a separate SVG element for each chart in rows
    for (let row = 0; row < numRows; row++) {
      const chartContainer = d3
        .select(chartRef.current)
        .append('div')
        .attr('class', 'chart-container');

      // Create two charts in each row
      for (let col = 0; col < 2; col++) {
        const dataIndex = row * 2 + col;

        if (dataIndex < itemCount) {
          const dataGroup = localStorageData[dataIndex];

          // Check if the data group has valid values
          if (
            typeof dataGroup.totalShot !== 'number' ||
            typeof dataGroup.successShot !== 'number' ||
            typeof dataGroup.unSuccessShot !== 'number' ||
            isNaN(dataGroup.totalShot) ||
            isNaN(dataGroup.successShot) ||
            isNaN(dataGroup.unSuccessShot)
          ) {
            continue; // Skip this data group if it has invalid values
          }

          // Calculate the chartData for the current data group
          const chartData = [
            { label: 'Successful Shots', value: (dataGroup.successShot / dataGroup.totalShot) * 100 },
            { label: 'Unsuccessful Shots', value: (dataGroup.unSuccessShot / dataGroup.totalShot) * 100 },
          ];

          // Create an SVG element for the chart
          const width = 350;
          const height = 350;
          const radius = Math.min(width, height) / 2;

          const color = d3.scaleOrdinal(d3.schemeCategory10);

          const pie = d3.pie().value((d) => d.value);

          const arc = d3.arc().innerRadius(0).outerRadius(radius);

          const svg = chartContainer
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

          const slices = svg
            .selectAll('path')
            .data(pie(chartData))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i));

          const labels = svg
            .selectAll('text')
            .data(pie(chartData))
            .enter()
            .append('text')
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .text((d) => `${d.data.label}: ${d.data.value.toFixed(2)}%`);

          // Add chart name above the chart
          chartContainer
            .append('div')
            .attr('class', 'chart-name')
            .style('text-align', 'center')
            .style('margin-top', '0.5rem')
            .text(dataGroup.chartName);
        }
      }
    }
  };

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, []);

  return (
    <div className='h-screen bg-gray-600'>
      <div className="grid  lg:grid-cols-3  lg:grid-row-2 sm:grid-rows-1   gap-5 my-5 absolute left-3 md:grid-cols-2 sm:grid-cols-1" ref={chartRef}></div>
      <div className="mt-2 absolute top-3 right-5">
        <Link to="/">Go to Main</Link>
      </div>
      <div className="bg-gray-600">
        {chartNames.map((chartName, index) => (
          <div key={index} className="flex justify-center">
            {chartName}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default StoragePage;