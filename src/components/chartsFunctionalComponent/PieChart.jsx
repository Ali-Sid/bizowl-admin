import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ chartData, chartOptions }) => {
  const [state, setState] = useState({
    chartData: [],
    chartOptions: {}
  });

  useEffect(() => {
    setState({
      chartData: chartData,
      chartOptions: chartOptions
    });
  }, [chartData, chartOptions]);

  return (
    <ReactApexChart
      options={state.chartOptions}
      series={state.chartData}
      type='pie'
      width='100%'
      height='100%'
    />
  );
};

export default PieChart;
