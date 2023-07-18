import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

const StoragePage = () => {
  const chartRef = useRef(null);
  const [isNull, setIsNull] = useState(false);
  const [chartNames, setChartNames] = useState([]);

  const fetchDataFromLocalStorage = useCallback(() => {
    // SVG cleanup
    d3.select(chartRef.current).selectAll('svg').remove();

    let localStorageData = JSON.parse(localStorage.getItem('savedData'));

    if (!localStorageData || Object.keys(localStorageData).length === 0) {
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
        .text('No data found'); // Show a message when there is no data

      setIsNull(true); // Set the isNull state to true
      setChartNames([]); // Clear chart names

      return;
    }

    setIsNull(false); // Set the isNull state to false

    const chartDataSlice = Object.values(localStorageData);

    // Create charts
    for (let i = 0; i < chartDataSlice.length; i++) {
      const dataGroup = chartDataSlice[i];

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

      const chartContainer = d3
        .select(chartRef.current)
        .append('div')
        .attr('class', 'chart-container');

      const chartDiv = chartContainer.append('div').attr('class', 'chart-div');

      const chartName = dataGroup.chartName;

      if (chartNames.includes(chartName)) {
        continue; // Skip this data group if the chart name is already displayed
      }

      setChartNames((prevChartNames) => [...prevChartNames, chartName]); // Add the chart name to the list

      chartDiv
        .append('div')
        .attr('class', 'chart-name')
        .style('text-align', 'center')
        .style('margin-top', '0.5rem')
        .text(chartName);

      const svg = chartDiv
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

      // Add Remove button
      chartDiv
        .append('div')
        .style('text-align', 'center')
        .append('button')
        .attr('class', 'remove-button')
        .text('Remove')
        .on('click', () => {
          // Remove the data group from localStorage
          localStorageData = localStorageData.filter((group) => group.chartName !== chartName);
          localStorage.setItem('savedData', JSON.stringify(localStorageData));

          // Remove the chart from the DOM
          chartContainer.remove();

          // Update the chart names list
          setChartNames((prevChartNames) => prevChartNames.filter((name) => name !== chartName));
        });
    }
  }, [chartNames]);

  useEffect(() => {
    fetchDataFromLocalStorage();
    setChartNames([]);
  }, []);

  return (
    <div className="h-full bg-gray-600 text-white">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 lg:grid-cols-4 absolute left-3" ref={chartRef}></div>
      <div className="absolute right-5 text-white mt-5">
        <Link to="/">Go to Main</Link>
      </div>

      {isNull && (
        <div className="flex justify-center text-red-500 text-4xl"></div>
      )}
    </div>
  );
};

export default StoragePage;
