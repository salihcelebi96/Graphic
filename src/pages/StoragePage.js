import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import Download from './download';


const StoragePage = () => {
  const chartRef = useRef(null);
  const [isNull, setIsNull] = useState(false);
  const [chartNames, setChartNames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);



  const fetchDataFromLocalStorage = useCallback(() => {

    
    
    
    
   
    d3.select(chartRef.current).selectAll('svg').remove();

    let localStorageData = JSON.parse(localStorage.getItem('savedData'));

    if (!localStorageData || Object.keys(localStorageData).length === 0) {
      const chartContainer = d3
        .select(chartRef.current)
        .append('div')
        .attr('class', 'chart-container');

     

      setIsNull(true); 
      setChartNames([]); 

      return;
    }

    setIsNull(false); 

    const chartDataSlice = Object.values(localStorageData);

    
    for (let i = 0; i < chartDataSlice.length; i++) {
      const dataGroup = chartDataSlice[i];

      
      if (
        typeof dataGroup.totalShot !== 'number' ||
        typeof dataGroup.successShot !== 'number' ||
        typeof dataGroup.unSuccessShot !== 'number' ||
        isNaN(dataGroup.totalShot) ||
        isNaN(dataGroup.successShot) ||
        isNaN(dataGroup.unSuccessShot)
      ) {
        continue; 
      }

      
      const chartData = [
        { label: 'Successful Shots', value: (dataGroup.successShot / dataGroup.totalShot) * 100 },
        { label: 'Unsuccessful Shots', value: (dataGroup.unSuccessShot / dataGroup.totalShot) * 100 },
      ];

     
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
        continue; 
      }

      setChartNames((prevChartNames) => [...prevChartNames, chartName]); 

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
        .attr('fill', (d, i) => color(i))
        .on('click', (d) => {
          setSelectedChart(dataGroup); 
        });
      

      const labels = svg
        .selectAll('text')
        .data(pie(chartData))
        .enter()
        .append('text')
        .attr('transform', (d) => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .attr('class', 'text-sm')
        .text((d) => `${d.data.label}: ${d.data.value.toFixed(2)}%`);
        

      
      chartDiv
        .append('div')
        .style('text-align', 'center')
        .append('button')
        .attr('class', 'remove-button')
        .text('Remove')
        .on('click', () => {
          
          localStorageData = localStorageData.filter((group) => group.chartName !== chartName);
          localStorage.setItem('savedData', JSON.stringify(localStorageData));

          
          chartContainer.remove();

          
          setChartNames((prevChartNames) => prevChartNames.filter((name) => name !== chartName));
        });
    }
  }, [chartNames]);

  useEffect(() => {
    fetchDataFromLocalStorage();
    setChartNames([]);
  }, []);

  return (
    <div className="h-full bg-gray-600 text-white storage-page">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 lg:grid-cols-4 absolute left-3" ref={chartRef}></div>
      {selectedChart ? ( // Check if selectedChart is not null
        <div className='overlay'>
          <Download selectedChart={selectedChart} setSelectedChart={setSelectedChart} isModalOpen={isModalOpen} />
        </div>
      ) : null}
     



      <div className="absolute right-20  text-white mt-5 ">
        <Link className='hover:text-gray-400' to="/">Go to Main</Link>

      </div>

      {isNull && (
        <div className="flex justify-center text-red-500 text-4xl"> No data found</div>

      )}
      
    </div>
    

  );
};

export default StoragePage;