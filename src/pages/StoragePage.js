import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';

const StoragePage = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const localStorageData = JSON.parse(localStorage.getItem('savedData'));
      console.log(localStorageData);

      // Get the number of items in localStorageData
      const itemCount = Object.keys(localStorageData).length;

      // SVG cleanup
      d3.select(chartRef.current).selectAll('svg').remove();

      // Calculate the number of rows needed for the charts
      const numRows = Math.ceil(itemCount / 2);

      // Create a separate SVG element for each chart in rows
      for (let row = 0; row < numRows; row++) {
        const chartRow = d3
          .select(chartRef.current)
          .append('div')
          .attr('class', 'chart-row');

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

            const chartContainer = chartRow.append('div').attr('class', 'chart-container');

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
          }
        }
      }
    };

    fetchDataFromLocalStorage();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 text-sm my-5 mx-5" ref={chartRef}>
      <div>
        
      </div>
      <div>
        
      </div>
      <div className="text-right mx-1">
        <Link to="/">Go to Main</Link>
      </div>
    </div>
  );
};

export default StoragePage;
