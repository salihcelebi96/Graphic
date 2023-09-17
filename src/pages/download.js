import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AiOutlineDownload } from 'react-icons/ai';

const Download = ({ selectedChart, setSelectedChart }) => {
    const chartRef = useRef(null);
    console.log(selectedChart);

    const handleDownload = () => {
       
        if (!selectedChart) {
            return;
        }

        
        const svgElement = chartRef.current.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const dataUri = 'data:image/svg+xml,' + encodeURIComponent(svgData);

        
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = 'chart.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {






        if (!selectedChart) {
            return; 
        }






        const data = [
            { label: 'Successful Shots', value: selectedChart.successShot },
            { label: 'Unsuccessful Shots', value: selectedChart.unSuccessShot },
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
            .text((d) => {
                if (d && d.data && d.data.label) {
                    return `${d.data.label}: ${d.data.value.toFixed(2)}%`;
                }
                return '';
            });

        return () => {
            // Clear the SVG
            d3.select(chartRef.current).selectAll('svg').remove();
        };
    }, [selectedChart]);

    return (
        <div className="flex justify-center relative items-center mb-5 h-[600px] w-[800px]  bg-gray-300">
            <div  ref={chartRef}>
                <span onClick={() => setSelectedChart(null)} className='text-2xl absolute top-0 cursor-pointer text-red-500 right-2'>x</span>

            </div>
            <a className='text-2xl absolute top-2 cursor-pointer text-green-800 left-2 down' onClick={handleDownload}>
                <AiOutlineDownload />
            </a>
        </div>

    );
};

export default Download;
